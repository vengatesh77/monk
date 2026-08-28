"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Eye, EyeOff, LogOut, RefreshCw, AlertCircle } from "lucide-react";

interface ContactRecord {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  subject?: string;
  createdAt: string;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });
      const data = await res.json();

      if (data.success) {
        onLogin(data.data.adminKey || "Monk@1234");
      } else {
        setError(data.message || "Invalid email or password.");
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
          {/* Admin Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="monkpodcast@gmail.com"
              required
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all disabled:opacity-50"
            />
          </div>

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

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({
  adminKey,
  onLogout,
}: {
  adminKey: string;
  onLogout: () => void;
}) {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data || []);
      } else {
        setError("Failed to load contact inquiries.");
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Top Bar / Header */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Monk Podcast Studio — Contact Submissions
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
        {/* Title + Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Contact Inquiries
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {isLoading
                ? "Loading..."
                : `${contacts.length} total submission${
                    contacts.length !== 1 ? "s" : ""
                  }`}
            </p>
          </div>
          <button
            onClick={fetchContacts}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>
        </div>

        {/* Submissions Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-slate-500 text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
              <span>Loading contact submissions...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20 gap-2 text-red-500 text-sm font-medium">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
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
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Contact Number
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.map((c, idx) => (
                    <tr
                      key={c._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {c.phone || "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        <a
                          href={`mailto:${c.email}`}
                          className="hover:underline hover:text-slate-900"
                        >
                          {c.email}
                        </a>
                      </td>
                      <td
                        className="px-6 py-4 text-slate-500 max-w-xs truncate"
                        title={c.message || ""}
                      >
                        {c.message || "—"}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
