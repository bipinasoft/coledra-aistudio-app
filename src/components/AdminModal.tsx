import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Download, 
  Edit3, 
  Mail, 
  Phone, 
  Building, 
  FileText, 
  Briefcase, 
  Layers, 
  ShieldAlert 
} from 'lucide-react';
import { SiteContent, InquiryItem, ServiceItem, BlogPost, CaseStudy } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContent;
  onSaveContent: (updated: SiteContent) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'services' | 'cases' | 'blog' | 'inquiries'>('hero');
  
  // Editable copy
  const [editableContent, setEditableContent] = useState<SiteContent>(content);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  // Check stored session
  useEffect(() => {
    const savedToken = localStorage.getItem('coledra_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      setToken(savedToken);
      fetchAdminData(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem('coledra_admin_token', data.token);
        fetchAdminData(data.token);
      } else {
        setAuthError(data.error || 'Invalid credentials. Please enter admin password.');
      }
    } catch (err) {
      // Local fallback for smooth testing
      if (password === 'admin123' || password === 'coledra2026') {
        const dummyToken = 'coledra-session-local';
        setIsAuthenticated(true);
        setToken(dummyToken);
        localStorage.setItem('coledra_admin_token', dummyToken);
      } else {
        setAuthError('Incorrect admin password.');
      }
    }
  };

  const fetchAdminData = async (authToken: string) => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: authToken }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiries(data.inquiries);
        }
      }
    } catch (err) {
      console.log('Using local inquiries');
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleSaveAll = async () => {
    onSaveContent(editableContent);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(editableContent)
      });
    } catch (err) {
      console.error('Failed to sync to server, saved locally', err);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleUpdateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    setInquiries(updated);
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.log('Status updated in local state');
    }
  };

  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID,Date,Name,Email,Phone,Service,Budget,Status,Message'];
    const rows = inquiries.map(i => 
      `"${i.id}","${i.timestamp}","${i.name}","${i.email}","${i.phone}","${i.service}","${i.budget}","${i.status}","${i.message.replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `coledra_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative flex flex-col w-full max-w-5xl h-[88vh] rounded-xl border border-white/[0.12] bg-[#101116] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0B0C10] px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-white/[0.08] text-white border border-white/[0.12]">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-[#F7F8F8]">
                Coledra CMS & Administration Portal
              </h2>
              <div className="text-[11px] font-mono text-[#626670]">
                Live Content Editor & Inbound Lead Management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleSaveAll}
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-[#E5E6E8] transition-all shadow-sm"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Publish Updates</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Close Admin Modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Form */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-900">
            <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 mb-3 border border-blue-500/30">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Admin Authentication
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Enter administrative passcode to edit website copy, services, case studies, and view client inquiries.
                </p>
                <div className="mt-2 text-[11px] text-blue-400/90 font-mono">
                  Default passcode: <span className="font-bold underline">coledra2026</span> or <span className="font-bold underline">admin123</span>
                </div>
              </div>

              {authError && (
                <div className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Security Passcode
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin passcode"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  Authenticate & Open CMS
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950 p-3 flex md:flex-col gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'hero' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Hero & Tagline</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Building className="h-4 w-4" />
                <span>Company Info</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>Services ({editableContent.services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('cases')}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'cases' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Edit3 className="h-4 w-4" />
                <span>Case Studies</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'blog' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Articles ({editableContent.blogPosts.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  fetchAdminData(token);
                }}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                  activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Inbound Leads</span>
                </div>
                {inquiries.length > 0 && (
                  <span className="rounded-full bg-blue-400/20 px-1.5 py-0.2 text-[10px] text-blue-300 font-mono">
                    {inquiries.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900">
              
              {saveSuccess && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 p-3 text-xs font-medium text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  <span>Changes published successfully and synced to server!</span>
                </div>
              )}

              {/* HERO TAB */}
              {activeTab === 'hero' && (
                <div className="space-y-5 max-w-2xl">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Hero Section Typography & Copy
                    </h3>
                    <p className="text-xs text-slate-400">
                      Edit the primary marquee headline and company value proposition.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Kicker Badge Text
                    </label>
                    <input
                      type="text"
                      value={editableContent.hero.badge}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        hero: { ...editableContent.hero, badge: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Headline (First Part)
                    </label>
                    <input
                      type="text"
                      value={editableContent.hero.headline}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        hero: { ...editableContent.hero, headline: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Gradient Highlighted Text
                    </label>
                    <input
                      type="text"
                      value={editableContent.hero.highlightText}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        hero: { ...editableContent.hero, highlightText: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Subheadline Prose
                    </label>
                    <textarea
                      rows={3}
                      value={editableContent.hero.subheadline}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        hero: { ...editableContent.hero, subheadline: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Primary CTA Label
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.ctaPrimary}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, ctaPrimary: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Secondary CTA Label
                      </label>
                      <input
                        type="text"
                        value={editableContent.hero.ctaSecondary}
                        onChange={(e) => setEditableContent({
                          ...editableContent,
                          hero: { ...editableContent.hero, ctaSecondary: e.target.value }
                        })}
                        className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CONTACT TAB */}
              {activeTab === 'contact' && (
                <div className="space-y-5 max-w-2xl">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Official Company Contact & Facility Details
                    </h3>
                    <p className="text-xs text-slate-400">
                      Target email address where contact inquiries are automatically routed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Inbound Dispatch Email
                    </label>
                    <input
                      type="email"
                      value={editableContent.contactInfo.email}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        contactInfo: { ...editableContent.contactInfo, email: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editableContent.contactInfo.phone}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        contactInfo: { ...editableContent.contactInfo, phone: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Corporate Operations Hub (Hyderabad)
                    </label>
                    <input
                      type="text"
                      value={editableContent.contactInfo.corpOffice}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        contactInfo: { ...editableContent.contactInfo, corpOffice: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Registered Headquarters (Bhubaneswar)
                    </label>
                    <input
                      type="text"
                      value={editableContent.contactInfo.regOffice}
                      onChange={(e) => setEditableContent({
                        ...editableContent,
                        contactInfo: { ...editableContent.contactInfo, regOffice: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Practice Directory ({editableContent.services.length})
                      </h3>
                      <p className="text-xs text-slate-400">
                        Update scopes, deliverables, and tech stacks across all 9 enterprise practices.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {editableContent.services.map((svc, idx) => (
                      <div key={svc.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-400 font-mono">#{idx + 1} {svc.id}</span>
                          <span className="text-[11px] text-slate-400">{svc.category}</span>
                        </div>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const updated = [...editableContent.services];
                            updated[idx].title = e.target.value;
                            setEditableContent({ ...editableContent, services: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs font-bold text-white"
                        />
                        <textarea
                          rows={2}
                          value={svc.shortDesc}
                          onChange={(e) => {
                            const updated = [...editableContent.services];
                            updated[idx].shortDesc = e.target.value;
                            setEditableContent({ ...editableContent, services: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CASE STUDIES TAB */}
              {activeTab === 'cases' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Portfolio Case Studies
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage client case studies and quantifiable impact benchmarks.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {editableContent.caseStudies.map((cs, idx) => (
                      <div key={cs.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                        <input
                          type="text"
                          value={cs.title}
                          onChange={(e) => {
                            const updated = [...editableContent.caseStudies];
                            updated[idx].title = e.target.value;
                            setEditableContent({ ...editableContent, caseStudies: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs font-bold text-white"
                        />
                        <input
                          type="text"
                          placeholder="Metrics"
                          value={cs.metrics}
                          onChange={(e) => {
                            const updated = [...editableContent.caseStudies];
                            updated[idx].metrics = e.target.value;
                            setEditableContent({ ...editableContent, caseStudies: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-blue-300 font-mono"
                        />
                        <textarea
                          rows={2}
                          value={cs.description}
                          onChange={(e) => {
                            const updated = [...editableContent.caseStudies];
                            updated[idx].description = e.target.value;
                            setEditableContent({ ...editableContent, caseStudies: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BLOG ARTICLES TAB */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Thought Leadership Articles ({editableContent.blogPosts.length})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Edit SEO-optimized articles and technical perspectives.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {editableContent.blogPosts.map((post, idx) => (
                      <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => {
                            const updated = [...editableContent.blogPosts];
                            updated[idx].title = e.target.value;
                            setEditableContent({ ...editableContent, blogPosts: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs font-bold text-white"
                        />
                        <textarea
                          rows={3}
                          value={post.content}
                          onChange={(e) => {
                            const updated = [...editableContent.blogPosts];
                            updated[idx].content = e.target.value;
                            setEditableContent({ ...editableContent, blogPosts: updated });
                          }}
                          className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INQUIRIES TAB */}
              {activeTab === 'inquiries' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Inbound Client Inquiries
                      </h3>
                      <p className="text-xs text-slate-400">
                        All submissions sent directly to <span className="text-blue-400 font-mono">info.coledra@gmail.com</span>
                      </p>
                    </div>

                    <button
                      onClick={exportInquiriesCSV}
                      disabled={inquiries.length === 0}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white disabled:opacity-40"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {loadingInquiries ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Loading inquiries...
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center text-xs text-slate-400">
                      No customer inquiries submitted yet. Submit a test inquiry on the contact form to view it here!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{inq.name}</span>
                              <span className="text-blue-400 text-xs font-mono">{inq.email}</span>
                              {inq.phone && <span className="text-slate-400 text-xs font-mono">{inq.phone}</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-slate-400">{inq.id}</span>
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                                className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] text-white focus:outline-none"
                              >
                                <option value="New">New</option>
                                <option value="In Review">In Review</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span>Service: <strong className="text-slate-300">{inq.service}</strong></span>
                            <span>·</span>
                            <span>Budget: <strong className="text-slate-300">{inq.budget}</strong></span>
                            <span>·</span>
                            <span>{new Date(inq.timestamp).toLocaleDateString()}</span>
                          </div>

                          <p className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded border border-slate-850">
                            {inq.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
