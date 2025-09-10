import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'APEX AI - Advanced Personal Executive Assistant',
  description: 'Autonomous AI assistant that integrates with all your business platforms, learns from your behavior, and executes tasks intelligently.',
  keywords: ['AI', 'automation', 'productivity', 'executive assistant', 'workflow', 'autonomous', 'intelligent', 'business platforms'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-apex-dark text-white antialiased">
        <div className="relative min-h-screen">
          {/* Professional gradient background */}
          <div className="fixed inset-0 bg-gradient-to-br from-apex-dark via-apex-slate to-apex-gray -z-10" />
          
          {/* Subtle professional ambient elements */}
          <div className="fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-apex-blue/5 rounded-full blur-3xl animate-pulse-professional" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-apex-teal/8 rounded-full blur-3xl animate-pulse-professional" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-2/3 w-48 h-48 bg-apex-accent/3 rounded-full blur-3xl animate-pulse-professional" style={{ animationDelay: '2s' }} />
          </div>

          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}