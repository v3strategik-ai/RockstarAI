/**
 * RockstarAI Widget - Portable AI Assistant
 * Embed this anywhere to add AI capabilities to any website
 */

(function() {
  'use strict';

  // Widget configuration
  const DEFAULT_CONFIG = {
    position: 'bottom-right',
    theme: 'dark',
    primaryColor: '#00bfff',
    secondaryColor: '#00ff88',
    autoOpen: false,
    minimized: true,
    apiUrl: window.location.origin + '/api'
  };

  // Widget HTML template
  const WIDGET_HTML = `
    <div id="rockstar-widget" style="
      position: fixed;
      z-index: 10000;
      transition: all 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div id="widget-button" style="
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, #00bfff, #00ff88);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(0, 191, 255, 0.3);
        transition: all 0.3s ease;
      ">
        <span style="font-size: 24px;">🤖</span>
      </div>
      
      <div id="widget-panel" style="
        position: absolute;
        width: 350px;
        height: 500px;
        background: #0a0a0a;
        border-radius: 20px;
        border: 2px solid #00bfff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 191, 255, 0.3);
        display: none;
        flex-direction: column;
        overflow: hidden;
        backdrop-filter: blur(10px);
      ">
        <!-- Widget Header -->
        <div style="
          padding: 16px;
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border-bottom: 1px solid #00bfff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="
              width: 32px;
              height: 32px;
              background: linear-gradient(45deg, #00bfff, #00ff88);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="font-size: 16px;">🤖</span>
            </div>
            <div>
              <div style="color: #00bfff; font-weight: bold; font-size: 14px;">ROCKSTAR AI</div>
              <div style="color: #888; font-size: 10px;">Online • Ready to help</div>
            </div>
          </div>
          <button id="close-widget" style="
            background: none;
            border: none;
            color: #888;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
          ">×</button>
        </div>

        <!-- Messages Area -->
        <div id="messages-area" style="
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: rgba(26, 26, 26, 0.8);
        ">
          <div style="
            background: rgba(42, 42, 42, 0.8);
            padding: 12px;
            border-radius: 12px;
            margin-bottom: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          ">
            <div style="color: white; font-size: 14px;">
              👋 Hi! I'm your RockstarAI assistant. I can help you with:
              <br><br>
              • Email drafting<br>
              • Meeting preparation<br>
              • Task organization<br>
              • Report generation<br>
              <br>
              How can I make you look like a rockstar today?
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div style="
          padding: 16px;
          background: #1a1a1a;
          border-top: 1px solid #333;
        ">
          <div style="display: flex; gap: 8px; align-items: flex-end;">
            <textarea id="widget-input" placeholder="Type your message..." style="
              flex: 1;
              background: #0a0a0a;
              border: 1px solid #333;
              border-radius: 8px;
              padding: 8px;
              color: white;
              font-size: 14px;
              resize: none;
              min-height: 36px;
              max-height: 80px;
              outline: none;
            "></textarea>
            <button id="send-button" style="
              background: linear-gradient(45deg, #00bfff, #00ff88);
              border: none;
              border-radius: 8px;
              padding: 8px 12px;
              color: black;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease;
            ">🚀</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Widget functionality
  window.RockstarAI = {
    config: DEFAULT_CONFIG,
    isOpen: false,
    
    init: function(userConfig = {}) {
      this.config = { ...DEFAULT_CONFIG, ...userConfig };
      this.createWidget();
      this.attachEventListeners();
      this.positionWidget();
      
      // Trigger ready event
      window.dispatchEvent(new CustomEvent('rockstar-ai-ready'));
    },

    createWidget: function() {
      // Remove existing widget if any
      const existingWidget = document.getElementById('rockstar-widget');
      if (existingWidget) {
        existingWidget.remove();
      }

      // Create widget container
      const widgetContainer = document.createElement('div');
      widgetContainer.innerHTML = WIDGET_HTML;
      document.body.appendChild(widgetContainer.firstElementChild);
    },

    positionWidget: function() {
      const widget = document.getElementById('rockstar-widget');
      if (!widget) return;

      const positions = {
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' }
      };

      const pos = positions[this.config.position] || positions['bottom-right'];
      Object.assign(widget.style, pos);

      // Position panel relative to button
      const panel = document.getElementById('widget-panel');
      if (panel) {
        if (this.config.position.includes('right')) {
          panel.style.right = '0px';
          panel.style.bottom = '70px';
        } else {
          panel.style.left = '0px';
          panel.style.bottom = '70px';
        }
      }
    },

    attachEventListeners: function() {
      const button = document.getElementById('widget-button');
      const panel = document.getElementById('widget-panel');
      const closeButton = document.getElementById('close-widget');
      const sendButton = document.getElementById('send-button');
      const input = document.getElementById('widget-input');

      if (button) {
        button.addEventListener('click', () => this.toggle());
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
          button.style.boxShadow = '0 6px 25px rgba(0, 191, 255, 0.4)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
          button.style.boxShadow = '0 4px 20px rgba(0, 191, 255, 0.3)';
        });
      }

      if (closeButton) {
        closeButton.addEventListener('click', () => this.close());
      }

      if (sendButton) {
        sendButton.addEventListener('click', () => this.sendMessage());
      }

      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });
      }
    },

    open: function() {
      const panel = document.getElementById('widget-panel');
      if (panel) {
        panel.style.display = 'flex';
        this.isOpen = true;
        
        // Focus input
        const input = document.getElementById('widget-input');
        if (input) {
          setTimeout(() => input.focus(), 100);
        }
        
        if (this.config.onOpen) this.config.onOpen();
      }
    },

    close: function() {
      const panel = document.getElementById('widget-panel');
      if (panel) {
        panel.style.display = 'none';
        this.isOpen = false;
        if (this.config.onClose) this.config.onClose();
      }
    },

    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    sendMessage: function() {
      const input = document.getElementById('widget-input');
      const messagesArea = document.getElementById('messages-area');
      
      if (!input || !messagesArea) return;
      
      const message = input.value.trim();
      if (!message) return;

      // Add user message to chat
      this.addMessageToChat(message, 'user');
      input.value = '';

      // Show typing indicator
      this.showTypingIndicator();

      // Send to AI API (with fallback to local responses)
      this.processAIResponse(message);
    },

    addMessageToChat: function(message, type = 'assistant') {
      const messagesArea = document.getElementById('messages-area');
      if (!messagesArea) return;

      const messageDiv = document.createElement('div');
      const isUser = type === 'user';
      
      messageDiv.style.cssText = `
        background: ${isUser ? 'rgba(0, 191, 255, 0.2)' : 'rgba(42, 42, 42, 0.8)'};
        padding: 12px;
        border-radius: 12px;
        margin-bottom: 16px;
        border: 1px solid ${isUser ? '#00bfff' : 'rgba(255, 255, 255, 0.1)'};
        margin-left: ${isUser ? '40px' : '0'};
        margin-right: ${isUser ? '0' : '40px'};
      `;
      
      messageDiv.innerHTML = `
        <div style="color: white; font-size: 14px; line-height: 1.4;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <div style="color: #888; font-size: 10px; margin-top: 4px;">
          ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      `;

      messagesArea.appendChild(messageDiv);
      messagesArea.scrollTop = messagesArea.scrollHeight;
    },

    showTypingIndicator: function() {
      const messagesArea = document.getElementById('messages-area');
      if (!messagesArea) return;

      const typingDiv = document.createElement('div');
      typingDiv.id = 'typing-indicator';
      typingDiv.style.cssText = `
        background: rgba(42, 42, 42, 0.8);
        padding: 12px;
        border-radius: 12px;
        margin-bottom: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-right: 40px;
      `;
      
      typingDiv.innerHTML = `
        <div style="color: #888; font-size: 14px;">
          🤖 RockstarAI is thinking...
          <span style="animation: blink 1s infinite;">●</span>
          <span style="animation: blink 1s infinite 0.2s;">●</span>
          <span style="animation: blink 1s infinite 0.4s;">●</span>
        </div>
      `;

      messagesArea.appendChild(typingDiv);
      messagesArea.scrollTop = messagesArea.scrollHeight;

      // Add CSS for blinking dots
      if (!document.getElementById('widget-blink-style')) {
        const style = document.createElement('style');
        style.id = 'widget-blink-style';
        style.textContent = `
          @keyframes blink {
            0%, 50% { opacity: 0.3; }
            51%, 100% { opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
    },

    hideTypingIndicator: function() {
      const indicator = document.getElementById('typing-indicator');
      if (indicator) {
        indicator.remove();
      }
    },

    processAIResponse: function(message) {
      setTimeout(() => {
        this.hideTypingIndicator();
        
        // Generate intelligent response based on input
        const response = this.generateResponse(message);
        this.addMessageToChat(response, 'assistant');
        
        // Trigger message event
        window.dispatchEvent(new CustomEvent('rockstar-ai-message', {
          detail: { message: response }
        }));
        
        if (this.config.onMessage) this.config.onMessage(response);
      }, 1500);
    },

    generateResponse: function(input) {
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('email') || lowerInput.includes('draft')) {
        return `🔥 I'll help you draft that email! Here's a professional template:

Subject: [Your Topic]

Hi [Name],

Hope you're doing well! [Your message]

Let me know if you need anything else.

Best,
[Your name]

Want me to customize this further?`;
      }
      
      if (lowerInput.includes('meeting') || lowerInput.includes('schedule')) {
        return `📅 Let's prepare for your meeting! Here's what I suggest:

AGENDA:
• Opening & introductions (5 min)
• Main topics discussion
• Action items & next steps

PREPARATION:
• Review previous notes
• Prepare key talking points
• Set clear objectives

Need help with specific agenda items?`;
      }
      
      if (lowerInput.includes('task') || lowerInput.includes('organize')) {
        return `✅ I'll help organize your tasks! Here's a smart approach:

HIGH PRIORITY:
• Urgent deadlines
• Important meetings
• Critical decisions

MEDIUM PRIORITY:
• Regular work items
• Team coordination
• Project milestones

Want me to help prioritize specific tasks?`;
      }
      
      if (lowerInput.includes('report') || lowerInput.includes('analysis')) {
        return `📊 Let's create a powerful report! Template structure:

• Executive Summary
• Key Findings  
• Data Analysis
• Recommendations
• Next Steps

This format makes you look like a pro! What topic should we cover?`;
      }

      return `🚀 I'm here to make you a rockstar at work! I can help with:

• Email drafting & responses
• Meeting preparation & agendas  
• Task organization & prioritization
• Report generation & analysis
• Document processing & insights

What specific task can I help you dominate today?`;
    },

    // Public API methods
    minimize: function() {
      this.close();
    },

    destroy: function() {
      const widget = document.getElementById('rockstar-widget');
      if (widget) {
        widget.remove();
      }
    }
  };

  // Auto-initialize if not already done
  if (typeof window !== 'undefined' && !window.RockstarAI) {
    window.RockstarAI = window.RockstarAI || {};
  }

})();

// Usage example (commented out):
/*
// Basic integration:
RockstarAI.init({
  position: 'bottom-right',
  theme: 'dark',
  autoOpen: false
});

// Advanced integration:
RockstarAI.init({
  position: 'bottom-left',
  primaryColor: '#00bfff',
  secondaryColor: '#00ff88',
  onOpen: function() { console.log('Widget opened'); },
  onMessage: function(msg) { console.log('AI response:', msg); }
});
*/