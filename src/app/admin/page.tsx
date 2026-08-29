"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Loader2,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  AlertCircle,
  Download,
  Search,
  Trash2,
  Mail,
  Users,
} from "lucide-react";
import * as XLSX from "xlsx";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ContactRecord {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  subject?: string;
  createdAt: string;
}

interface NewsletterSubscriber {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  subscribedAt: string;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmedPassword }),
      });
      const data = await res.json();

      if (data.success) {
        onLogin(data.data.adminKey || "Monk@1234");
      } else {
        setError(data.message || "Invalid password.");
      }
    } catch (err: any) {
      setError("Connection failed: " + (err?.message || "Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-gray-100">
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-md">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-7 9a7 7 0 1 1 14 0H5zm7 3a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            ADMIN LOGIN
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Monk Podcast Studio
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            id="admin-login-btn"
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl text-xs tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>VERIFYING...</span>
              </>
            ) : (
              "ENTER"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────
function DeleteModal({
  email,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-base font-bold text-slate-900 text-center mb-2">
          Delete Subscriber
        </h3>
        <p className="text-sm text-slate-500 text-center mb-1">
          Are you sure you want to delete this subscriber?
        </p>
        <p className="text-sm font-semibold text-slate-900 text-center mb-6 break-all">
          {email}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({
  adminKey,
  onLogout,
}: {
  adminKey: string;
  onLogout: () => void;
}) {
  // Tab state
  const [activeTab, setActiveTab] = useState<"contacts" | "newsletter">(
    "contacts"
  );

  // Contact Inquiries state
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState(true);
  const [isContactsExporting, setIsContactsExporting] = useState(false);
  const [contactsError, setContactsError] = useState("");

  // Newsletter state
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const [isNewsletterExporting, setIsNewsletterExporting] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<NewsletterSubscriber | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Contact Inquiries ────────────────────────────────────────────────────
  const fetchContacts = useCallback(async () => {
    setIsContactsLoading(true);
    setContactsError("");
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data || []);
      } else {
        setContactsError("Failed to load contact inquiries.");
      }
    } catch {
      setContactsError("Connection failed. Please try again.");
    } finally {
      setIsContactsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ─── Newsletter Subscribers ───────────────────────────────────────────────
  const fetchSubscribers = useCallback(async () => {
    setIsNewsletterLoading(true);
    setNewsletterError("");
    try {
      const res = await fetch("/api/newsletter", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.data || []);
      } else {
        setNewsletterError("Failed to load newsletter subscribers.");
      }
    } catch {
      setNewsletterError("Connection failed. Please try again.");
    } finally {
      setIsNewsletterLoading(false);
    }
  }, [adminKey]);

  // Fetch newsletter data when tab is selected
  useEffect(() => {
    if (activeTab === "newsletter" && subscribers.length === 0 && !isNewsletterLoading) {
      fetchSubscribers();
    }
  }, [activeTab]);

  // ─── Delete Subscriber ────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/newsletter/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) =>
          prev.filter((s) => s._id !== deleteTarget._id)
        );
        setDeleteTarget(null);
      } else {
        alert(data.message || "Failed to delete subscriber.");
      }
    } catch {
      alert("Connection failed. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // ─── Date Formatting ─────────────────────────────────────────────────────
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const formatExcelDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const datePart = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const timePart = d
        .toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
      return `${datePart}, ${timePart}`;
    } catch {
      return dateStr;
    }
  };

  // ─── Excel Exports ────────────────────────────────────────────────────────
  const handleExportContactsExcel = async () => {
    if (!adminKey || isContactsExporting) return;
    setIsContactsExporting(true);
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const allContacts: ContactRecord[] = data.data;
        const excelRows = allContacts.map((c, idx) => ({
          "S.No": idx + 1,
          Name: c.name || "—",
          "Contact Number": c.phone || "—",
          "Email Address": c.email || "—",
          Message: c.message || "No message provided",
          "Submitted Date": formatExcelDate(c.createdAt),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelRows);
        worksheet["!cols"] = [
          { wch: 8 },
          { wch: 22 },
          { wch: 18 },
          { wch: 28 },
          { wch: 45 },
          { wch: 24 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Inquiries");
        XLSX.writeFile(workbook, "monk-contact-inquiries.xlsx");
      }
    } catch (err) {
      console.error("Export Contacts Excel error:", err);
    } finally {
      setIsContactsExporting(false);
    }
  };

  const handleExportNewsletterExcel = async () => {
    if (!adminKey || isNewsletterExporting) return;
    setIsNewsletterExporting(true);
    try {
      const res = await fetch("/api/newsletter", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const allSubs: NewsletterSubscriber[] = data.data;
        const excelRows = allSubs.map((s, idx) => ({
          "S.No": idx + 1,
          "Email Address": s.email || "—",
          Status: s.status === "active" ? "Active" : "Unsubscribed",
          "Subscribed Date": formatExcelDate(s.subscribedAt),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelRows);
        worksheet["!cols"] = [
          { wch: 8 },
          { wch: 32 },
          { wch: 16 },
          { wch: 24 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Newsletter Subscribers");
        XLSX.writeFile(workbook, "newsletter-subscribers.xlsx");
      }
    } catch (err) {
      console.error("Export Newsletter Excel error:", err);
    } finally {
      setIsNewsletterExporting(false);
    }
  };

  // ─── Filtered Subscribers (search) ───────────────────────────────────────
  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          email={deleteTarget.email}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}

      {/* Top Bar / Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Monk Podcast Studio — Contact &amp; Newsletter
            </p>
          </div>
          <button
            onClick={onLogout}
            id="admin-logout-btn"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── CONTACT INQUIRIES TAB ── */}
        {activeTab === "contacts" && (
          <>
            {/* Title + Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Contact Inquiries
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isContactsLoading
                    ? "Loading..."
                    : `${contacts.length} total submission${contacts.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  onClick={fetchContacts}
                  disabled={isContactsLoading || isContactsExporting}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isContactsLoading ? "animate-spin" : ""}`}
                  />
                  Refresh Data
                </button>
                <button
                  onClick={handleExportContactsExcel}
                  disabled={isContactsLoading || isContactsExporting}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                  id="admin-export-excel-btn"
                >
                  {isContactsExporting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  Export Excel
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-slate-200/60 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("contacts")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-white text-slate-900 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Inquiries
              </button>
              <button
                onClick={() => setActiveTab("newsletter")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all text-slate-500 hover:text-slate-700 hover:bg-white/60"
              >
                <Users className="w-3.5 h-3.5" />
                Newsletter Subscribers
              </button>
            </div>

            {/* Contacts Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {isContactsLoading ? (
                <div className="flex items-center justify-center py-24 gap-3 text-slate-500 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                  <span>Loading contact submissions...</span>
                </div>
              ) : contactsError ? (
                <div className="flex items-center justify-center py-20 gap-2 text-red-500 text-sm font-medium">
                  <AlertCircle className="w-5 h-5" />
                  <span>{contactsError}</span>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm">
                  No contact inquiries submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">S.No</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {contacts.map((c, idx) => (
                        <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 text-xs font-semibold text-slate-400">{idx + 1}</td>
                          <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{c.name}</td>
                          <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{c.phone || "—"}</td>
                          <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                            <a href={`mailto:${c.email}`} className="hover:underline hover:text-slate-900">
                              {c.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={c.message || ""}>
                            {c.message || "—"}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── NEWSLETTER SUBSCRIBERS TAB ── */}
        {activeTab === "newsletter" && (
          <>
            {/* Title + Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Newsletter Subscribers
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isNewsletterLoading
                    ? "Loading..."
                    : `${subscribers.length} total subscriber${subscribers.length !== 1 ? "s" : ""}`}
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  onClick={fetchSubscribers}
                  disabled={isNewsletterLoading || isNewsletterExporting}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isNewsletterLoading ? "animate-spin" : ""}`}
                  />
                  Refresh Data
                </button>
                <button
                  onClick={handleExportNewsletterExcel}
                  disabled={isNewsletterLoading || isNewsletterExporting}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                  id="admin-export-newsletter-btn"
                >
                  {isNewsletterExporting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  Export Excel
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-slate-200/60 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("contacts")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all text-slate-500 hover:text-slate-700 hover:bg-white/60"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Inquiries
              </button>
              <button
                onClick={() => setActiveTab("newsletter")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-white text-slate-900 shadow-sm"
              >
                <Users className="w-3.5 h-3.5" />
                Newsletter Subscribers
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-sm"
                />
              </div>
            </div>

            {/* Newsletter Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {isNewsletterLoading ? (
                <div className="flex items-center justify-center py-24 gap-3 text-slate-500 text-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                  <span>Loading newsletter subscribers...</span>
                </div>
              ) : newsletterError ? (
                <div className="flex items-center justify-center py-20 gap-2 text-red-500 text-sm font-medium">
                  <AlertCircle className="w-5 h-5" />
                  <span>{newsletterError}</span>
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm">
                  No newsletter subscribers yet.
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm">
                  No subscribers match &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">S.No</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Subscribed Date</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubscribers.map((s, idx) => (
                        <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 text-xs font-semibold text-slate-400">{idx + 1}</td>
                          <td className="px-6 py-4 text-slate-700 font-medium whitespace-nowrap">
                            <a href={`mailto:${s.email}`} className="hover:underline hover:text-slate-900">
                              {s.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                s.status === "active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {s.status === "active" ? "Active" : "Unsubscribed"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                            {formatDate(s.subscribedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => setDeleteTarget(s)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey =
      typeof window !== "undefined"
        ? sessionStorage.getItem("monk_admin_key")
        : null;
    if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  const handleLogin = (key: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("monk_admin_key", key);
    }
    setAdminKey(key);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("monk_admin_key");
    }
    setAdminKey(null);
  };

  if (!adminKey) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />;
}
