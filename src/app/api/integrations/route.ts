import { NextRequest, NextResponse } from 'next/server'

interface IntegrationConfig {
  id: string
  name: string
  type: 'oauth2' | 'api_key' | 'webhook'
  status: 'available' | 'connected' | 'error' | 'pending'
  oauth_config?: {
    auth_url: string
    token_url: string
    client_id: string
    scopes: string[]
    redirect_uri: string
  }
  api_config?: {
    base_url: string
    auth_header: string
    endpoints: { [key: string]: string }
  }
  capabilities: string[]
  webhook_config?: {
    events: string[]
    endpoint: string
  }
}

const SUPPORTED_INTEGRATIONS: IntegrationConfig[] = [
  {
    id: 'salesforce',
    name: 'Salesforce CRM',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://login.salesforce.com/services/oauth2/authorize',
      token_url: 'https://login.salesforce.com/services/oauth2/token',
      client_id: 'apex_ai_salesforce_client',
      scopes: ['api', 'refresh_token', 'offline_access', 'full'],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/salesforce`
    },
    capabilities: [
      'Lead Management',
      'Opportunity Tracking',
      'Account Synchronization',
      'Task Automation',
      'Report Generation',
      'Data Analytics',
      'Workflow Automation'
    ]
  },
  {
    id: 'microsoft365',
    name: 'Microsoft Office 365',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      client_id: 'apex_ai_ms365_client',
      scopes: [
        'https://graph.microsoft.com/Mail.ReadWrite',
        'https://graph.microsoft.com/Calendars.ReadWrite',
        'https://graph.microsoft.com/Files.ReadWrite.All',
        'https://graph.microsoft.com/User.Read',
        'offline_access'
      ],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/microsoft365`
    },
    capabilities: [
      'Email Automation',
      'Calendar Management',
      'Document Processing',
      'Meeting Scheduling',
      'Contact Synchronization',
      'OneDrive Integration',
      'Teams Integration'
    ]
  },
  {
    id: 'google_workspace',
    name: 'Google Workspace',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_url: 'https://oauth2.googleapis.com/token',
      client_id: 'apex_ai_google_client',
      scopes: [
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/google`
    },
    capabilities: [
      'Gmail Intelligence',
      'Calendar AI',
      'Drive Document Analysis',
      'Contact Management',
      'Meeting Automation',
      'Workspace Analytics'
    ]
  },
  {
    id: 'slack',
    name: 'Slack Communications',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://slack.com/oauth/v2/authorize',
      token_url: 'https://slack.com/api/oauth.v2.access',
      client_id: 'apex_ai_slack_client',
      scopes: [
        'channels:read',
        'chat:write',
        'users:read',
        'reactions:write',
        'files:read'
      ],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/slack`
    },
    capabilities: [
      'Automated Responses',
      'Channel Monitoring',
      'Meeting Summaries',
      'Team Analytics',
      'File Intelligence',
      'Workflow Triggers'
    ]
  },
  {
    id: 'zoom',
    name: 'Zoom Video Conferencing',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://zoom.us/oauth/authorize',
      token_url: 'https://zoom.us/oauth/token',
      client_id: 'apex_ai_zoom_client',
      scopes: [
        'meeting:write',
        'meeting:read',
        'recording:read',
        'user:read'
      ],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/zoom`
    },
    capabilities: [
      'Meeting Transcription',
      'Automated Scheduling',
      'Recording Analysis',
      'Attendance Tracking',
      'Follow-up Generation',
      'Meeting Intelligence'
    ]
  },
  {
    id: 'jira',
    name: 'Jira Project Management',
    type: 'oauth2',
    status: 'available',
    oauth_config: {
      auth_url: 'https://auth.atlassian.com/authorize',
      token_url: 'https://auth.atlassian.com/oauth/token',
      client_id: 'apex_ai_jira_client',
      scopes: [
        'read:jira-work',
        'write:jira-work',
        'read:jira-user'
      ],
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/integrations/callback/jira`
    },
    capabilities: [
      'Automated Ticket Creation',
      'Sprint Planning Assistance',
      'Progress Tracking',
      'Workflow Optimization',
      'Team Performance Analytics',
      'Epic Management'
    ]
  }
]

// GET - List all available integrations
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const type = url.searchParams.get('type')

    let integrations = SUPPORTED_INTEGRATIONS

    // Filter by status if provided
    if (status) {
      integrations = integrations.filter(integration => integration.status === status)
    }

    // Filter by type if provided  
    if (type) {
      integrations = integrations.filter(integration => integration.type === type)
    }

    // Get connection status from database/storage (simulated)
    const connectionsStatus = await getConnectionsStatus()
    
    const integrationsWithStatus = integrations.map(integration => ({
      ...integration,
      status: connectionsStatus[integration.id] || integration.status,
      connected_at: connectionsStatus[`${integration.id}_connected_at`],
      last_sync: connectionsStatus[`${integration.id}_last_sync`],
      sync_status: connectionsStatus[`${integration.id}_sync_status`] || 'idle'
    }))

    return NextResponse.json({
      success: true,
      integrations: integrationsWithStatus,
      total: integrationsWithStatus.length,
      connected: integrationsWithStatus.filter(i => i.status === 'connected').length,
      available: integrationsWithStatus.filter(i => i.status === 'available').length
    })

  } catch (error) {
    console.error('Error fetching integrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch integrations' },
      { status: 500 }
    )
  }
}

// POST - Initiate OAuth flow for integration
export async function POST(request: NextRequest) {
  try {
    const { integration_id, action = 'connect' } = await request.json()

    if (!integration_id) {
      return NextResponse.json(
        { error: 'integration_id is required' },
        { status: 400 }
      )
    }

    const integration = SUPPORTED_INTEGRATIONS.find(i => i.id === integration_id)
    if (!integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    if (action === 'disconnect') {
      // Handle disconnection
      await disconnectIntegration(integration_id)
      return NextResponse.json({
        success: true,
        message: `${integration.name} has been disconnected`,
        integration_id
      })
    }

    if (integration.type === 'oauth2' && integration.oauth_config) {
      // Generate OAuth URL
      const state = generateStateToken(integration_id)
      const oauthUrl = buildOAuthURL(integration.oauth_config, state)
      
      // Store state for validation
      await storeOAuthState(state, integration_id)

      return NextResponse.json({
        success: true,
        auth_url: oauthUrl,
        integration_id,
        state,
        message: `Initiating OAuth flow for ${integration.name}`
      })
    }

    return NextResponse.json(
      { error: 'Integration type not supported for this action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error initiating integration:', error)
    return NextResponse.json(
      { error: 'Failed to initiate integration' },
      { status: 500 }
    )
  }
}

// PUT - Update integration configuration
export async function PUT(request: NextRequest) {
  try {
    const { integration_id, config, settings } = await request.json()

    if (!integration_id) {
      return NextResponse.json(
        { error: 'integration_id is required' },
        { status: 400 }
      )
    }

    const integration = SUPPORTED_INTEGRATIONS.find(i => i.id === integration_id)
    if (!integration) {
      return NextResponse.json(
        { error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Update integration configuration
    await updateIntegrationConfig(integration_id, config, settings)

    return NextResponse.json({
      success: true,
      message: `${integration.name} configuration updated successfully`,
      integration_id
    })

  } catch (error) {
    console.error('Error updating integration:', error)
    return NextResponse.json(
      { error: 'Failed to update integration' },
      { status: 500 }
    )
  }
}

// Helper Functions
async function getConnectionsStatus(): Promise<{ [key: string]: any }> {
  // In production, this would query your database
  // For now, return simulated data
  return {
    'salesforce': 'connected',
    'salesforce_connected_at': '2024-01-15T10:30:00Z',
    'salesforce_last_sync': '2024-01-16T14:22:00Z',
    'salesforce_sync_status': 'syncing',
    'microsoft365': 'available',
    'google_workspace': 'available',
    'slack': 'available',
    'zoom': 'available',
    'jira': 'available'
  }
}

function generateStateToken(integrationId: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2)
  return `${integrationId}_${timestamp}_${random}`
}

function buildOAuthURL(config: IntegrationConfig['oauth_config'], state: string): string {
  if (!config) return ''
  
  const params = new URLSearchParams({
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    scope: config.scopes.join(' '),
    state,
    response_type: 'code',
    access_type: 'offline'
  })

  return `${config.auth_url}?${params.toString()}`
}

async function storeOAuthState(state: string, integrationId: string): Promise<void> {
  // In production, store in Redis or database with expiration
  // For now, we'll use a simple in-memory store (not production ready)
  console.log(`Storing OAuth state: ${state} for integration: ${integrationId}`)
}

async function disconnectIntegration(integrationId: string): Promise<void> {
  // In production, remove tokens from database and revoke OAuth access
  console.log(`Disconnecting integration: ${integrationId}`)
}

async function updateIntegrationConfig(integrationId: string, config: any, settings: any): Promise<void> {
  // In production, update database with new configuration
  console.log(`Updating configuration for integration: ${integrationId}`, { config, settings })
}