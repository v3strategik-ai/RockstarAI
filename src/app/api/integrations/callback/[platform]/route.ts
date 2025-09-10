import { NextRequest, NextResponse } from 'next/server'

interface TokenResponse {
  access_token: string
  refresh_token?: string
  expires_in?: number
  token_type?: string
  scope?: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    const platform = params.platform

    // Handle OAuth errors
    if (error) {
      console.error(`OAuth error for ${platform}:`, error)
      return NextResponse.redirect(
        `${getBaseUrl()}/integrations?error=${encodeURIComponent(error)}&platform=${platform}`
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${getBaseUrl()}/integrations?error=missing_parameters&platform=${platform}`
      )
    }

    // Validate state token
    const isValidState = await validateOAuthState(state, platform)
    if (!isValidState) {
      return NextResponse.redirect(
        `${getBaseUrl()}/integrations?error=invalid_state&platform=${platform}`
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(platform, code)
    
    if (!tokenResponse) {
      return NextResponse.redirect(
        `${getBaseUrl()}/integrations?error=token_exchange_failed&platform=${platform}`
      )
    }

    // Store tokens securely
    await storeTokens(platform, tokenResponse)

    // Test the integration
    const testResult = await testIntegration(platform, tokenResponse.access_token)

    // Update integration status
    await updateIntegrationStatus(platform, 'connected', {
      connected_at: new Date().toISOString(),
      last_sync: new Date().toISOString(),
      test_result: testResult
    })

    // Redirect back to integrations page with success
    return NextResponse.redirect(
      `${getBaseUrl()}/integrations?success=true&platform=${platform}&connected=true`
    )

  } catch (error) {
    console.error(`OAuth callback error for ${params.platform}:`, error)
    return NextResponse.redirect(
      `${getBaseUrl()}/integrations?error=unexpected_error&platform=${params.platform}`
    )
  }
}

async function exchangeCodeForToken(platform: string, code: string): Promise<TokenResponse | null> {
  const tokenConfigs = {
    salesforce: {
      url: 'https://login.salesforce.com/services/oauth2/token',
      client_id: process.env.SALESFORCE_CLIENT_ID || 'apex_ai_salesforce_client',
      client_secret: process.env.SALESFORCE_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/salesforce`
    },
    microsoft365: {
      url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      client_id: process.env.MICROSOFT365_CLIENT_ID || 'apex_ai_ms365_client',
      client_secret: process.env.MICROSOFT365_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/microsoft365`
    },
    google: {
      url: 'https://oauth2.googleapis.com/token',
      client_id: process.env.GOOGLE_CLIENT_ID || 'apex_ai_google_client',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/google`
    },
    slack: {
      url: 'https://slack.com/api/oauth.v2.access',
      client_id: process.env.SLACK_CLIENT_ID || 'apex_ai_slack_client',
      client_secret: process.env.SLACK_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/slack`
    },
    zoom: {
      url: 'https://zoom.us/oauth/token',
      client_id: process.env.ZOOM_CLIENT_ID || 'apex_ai_zoom_client',
      client_secret: process.env.ZOOM_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/zoom`
    },
    jira: {
      url: 'https://auth.atlassian.com/oauth/token',
      client_id: process.env.JIRA_CLIENT_ID || 'apex_ai_jira_client',
      client_secret: process.env.JIRA_CLIENT_SECRET || 'demo_secret',
      redirect_uri: `${getBaseUrl()}/api/integrations/callback/jira`
    }
  }

  const config = tokenConfigs[platform as keyof typeof tokenConfigs]
  if (!config) {
    throw new Error(`Unsupported platform: ${platform}`)
  }

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.client_id,
        client_secret: config.client_secret,
        code,
        redirect_uri: config.redirect_uri
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Token exchange failed for ${platform}:`, errorText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`Error exchanging token for ${platform}:`, error)
    return null
  }
}

async function testIntegration(platform: string, accessToken: string): Promise<any> {
  const testEndpoints = {
    salesforce: 'https://mycompany.salesforce.com/services/data/v60.0/sobjects/',
    microsoft365: 'https://graph.microsoft.com/v1.0/me',
    google: 'https://www.googleapis.com/oauth2/v2/userinfo',
    slack: 'https://slack.com/api/auth.test',
    zoom: 'https://api.zoom.us/v2/users/me',
    jira: 'https://api.atlassian.com/oauth/token/accessible-resources'
  }

  const endpoint = testEndpoints[platform as keyof typeof testEndpoints]
  if (!endpoint) {
    return { success: false, error: 'No test endpoint configured' }
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
      return { 
        success: true, 
        data: platform === 'slack' ? data : { user_id: data.id || data.sub },
        tested_at: new Date().toISOString()
      }
    } else {
      return { 
        success: false, 
        error: `HTTP ${response.status}`, 
        tested_at: new Date().toISOString()
      }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      tested_at: new Date().toISOString()
    }
  }
}

async function validateOAuthState(state: string, platform: string): Promise<boolean> {
  // In production, validate against stored state in Redis/database
  // For demo purposes, just check basic format
  return state.includes(platform) && state.split('_').length >= 3
}

async function storeTokens(platform: string, tokens: TokenResponse): Promise<void> {
  // In production, store securely in database with encryption
  console.log(`Storing tokens for ${platform}:`, {
    has_access_token: !!tokens.access_token,
    has_refresh_token: !!tokens.refresh_token,
    expires_in: tokens.expires_in
  })
}

async function updateIntegrationStatus(platform: string, status: string, metadata: any): Promise<void> {
  // In production, update database with new status and metadata
  console.log(`Updating ${platform} status to ${status}:`, metadata)
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}