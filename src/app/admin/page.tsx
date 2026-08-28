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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        fontFamily: "'Montserrat', sans-serif",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "48px 40px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid #e8e8e8",
        }}
      >
        {/* Logo / Title */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "#0d141a",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-7 9a7 7 0 1 1 14 0H5zm7 3a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3z" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#0d141a",
              margin: "0 0 6px",
              letterSpacing: "-0.3px",
            }}
          >
            ADMIN LOGIN
          </h1>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            Monk Podcast Studio
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0d141a",
                marginBottom: "8px",
              }}
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
              style={{
                width: "100%",
                padding: "13px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#0d141a",
                outline: "none",
                background: "#fafafa",
                boxSizing: "border-box",
                fontFamily: "'Montserrat', sans-serif",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#0d141a",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "#0d141a",
                  outline: "none",
                  background: "#fafafa",
                  boxSizing: "border-box",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "10px 14px",
              }}
            >
              <AlertCircle size={14} style={{ color: "#ef4444", flexShrink: 0 }} />
              <p style={{ fontSize: "13px", color: "#dc2626", margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            id="admin-login-btn"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0d141a",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontFamily: "'Montserrat', sans-serif",
              marginTop: "4px",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Verifying...
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
function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0d141a",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "between",
          minHeight: "64px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
        className="justify-between"
      >
        <div>
          <h1 style={{ color: "#ffffff", fontSize: "16px", fontWeight: 700, margin: 0 }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
            Monk Podcast Studio
          </p>
        </div>
        <button
          onClick={onLogout}
          id="admin-logout-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#d1d5db",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#0d141a",
                margin: "0 0 4px",
              }}
            >
              Contact Inquiries
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
              {isLoading
                ? "Loading..."
                : `${contacts.length} total submission${contacts.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={fetchContacts}
            disabled={isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#374151",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Table Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px",
                gap: "12px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              <Loader2 size={20} className="animate-spin" />
              Loading inquiries...
            </div>
          ) : error ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px",
                gap: "10px",
                color: "#ef4444",
                fontSize: "14px",
              }}
            >
              <AlertCircle size={18} />
              {error}
            </div>
          ) : contacts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              No contact inquiries yet. Submissions from the Contact page will appear here.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                    {["S.No", "Name", "Contact Number", "Email Address", "Message", "Submitted Date"].map(
                      (col) => (
                        <th
                          key={col}
                          style={{
                            padding: "14px 16px",
                            textAlign: "left",
                            fontWeight: 600,
                            color: "#6b7280",
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, idx) => (
                    <tr
                      key={c._id}
                      style={{
                        borderBottom: idx < contacts.length - 1 ? "1px solid #f3f4f6" : "none",
                        background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#9ca3af",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                      >
                        {idx + 1}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#0d141a",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.name}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#374151",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.phone || "—"}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#374151",
                        }}
                      >
                        <a
                          href={`mailto:${c.email}`}
                          style={{ color: "#374151", textDecoration: "none" }}
                        >
                          {c.email}
                        </a>
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#6b7280",
                          maxWidth: "260px",
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "240px",
                          }}
                          title={c.message || ""}
                        >
                          {c.message || "—"}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#6b7280",
                          whiteSpace: "nowrap",
                          fontSize: "12px",
                        }}
                      >
                        {formatDate(c.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = typeof window !== "undefined" ? sessionStorage.getItem("monk_admin_key") : null;
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
