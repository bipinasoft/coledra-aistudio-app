import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Send, User, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Coledra Systems AI Consultant online. Inquire regarding Agentic AI swarms, Oracle Cloud Infrastructure, SAP S/4HANA migrations, or Zero-Trust IAM architectures.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Agentic AI Swarm architecture',
    'Oracle EBS to OCI Migration',
    'SAP S/4HANA & BTP services',
    'Contact routing & telephone'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: updatedMessages.slice(-6)
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'model', 
            text: 'Direct transmission: Contact Coledra principal architects at info.coledra@gmail.com or call +91 9938770010.' 
          }
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: 'Coledra Solutions specializes in Agentic AI, Oracle Cloud Consulting, SAP, and Zero-Trust Cybersecurity. Transmit specifications to info.coledra@gmail.com.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-[#101116] border border-white/[0.14] text-[#F7F8F8] shadow-2xl transition-all hover:bg-white hover:text-black hover:border-white"
          aria-label="Open Consultant"
        >
          <Terminal className="h-4 w-4" />
        </button>
      )}

      {isOpen && (
        <div className="relative flex h-[480px] w-[340px] sm:w-[380px] flex-col rounded-xl border border-white/[0.12] bg-[#101116] shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0B0C10] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#16171E] border border-white/[0.08] text-white font-mono text-xs">
                C
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F7F8F8] font-mono">
                  Coledra Consultant
                </div>
                <div className="text-[10px] text-[#626670] font-mono">
                  Model: Gemini 2.5 Architecture
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-[4px] p-1 text-[#8A8F98] hover:text-white"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex gap-1 overflow-x-auto border-b border-white/[0.06] bg-[#08090C] p-2 scrollbar-none font-mono text-[10px]">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(qp)}
                disabled={loading}
                className="whitespace-nowrap rounded-[4px] bg-[#14151B] px-2 py-1 text-[#8A8F98] hover:text-white border border-white/[0.06] transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-[#14151B] text-[#8A8F98] border border-white/[0.06] text-[10px]">
                    C
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-[6px] px-3 py-2 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-sans font-medium'
                      : 'bg-[#14151B] text-[#A1A6B3] border border-white/[0.06] font-sans'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-white/[0.08] text-white text-[10px]">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#8A8F98] font-mono pl-1">
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Evaluating telemetry...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-white/[0.08] bg-[#0B0C10] p-2.5"
          >
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Query specifications..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 rounded-[5px] border border-white/[0.08] bg-[#14151B] px-3 py-1.5 text-xs text-[#F7F8F8] placeholder-[#626670] focus:border-white/30 focus:outline-none font-mono"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-white text-black hover:bg-[#E5E6E8] disabled:opacity-30"
                aria-label="Send"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
};
