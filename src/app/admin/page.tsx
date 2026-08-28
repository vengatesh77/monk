"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Calendar,
  Mail,
  LogOut,
  Search,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Mic,
  Briefcase,
  FolderGit2,
  MessageSquareQuote,
  Plus,
} from "lucide-react";
import { ContactRecord, BookingRecord, NewsletterRecord } from "@/types";

type Tab = "contacts" | "bookings" | "newsletter" | "podcasts" | "services" | "portfolio" | "testimonials";
type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_ICONS: Record<BookingStatus, React.ElementType> = {
  pending: Clock,
  confirmed: CheckCircle2,
  completed: CheckCircle2,
  cancelled: XCircle,
};

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterRecord[]>([]);
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(
    async (tab: Tab) => {
      if (!adminKey) return;
      setIsLoading(true);
      try {
        const endpoint =
          tab === "contacts"
            ? "/api/contact"
            : tab === "bookings"
            ? "/api/booking"
            : tab === "newsletter"
            ? "/api/newsletter"
            : tab === "podcasts"
            ? "/api/podcasts"
            : tab === "services"
            ? "/api/services"
            : tab === "portfolio"
            ? "/api/portfolio"
            : "/api/testimonials";

        const res = await fetch(endpoint, {
          headers: { "x-admin-key": adminKey },
        });
        const data = await res.json();
        if (data.success) {
          if (tab === "contacts") setContacts(data.data);
          else if (tab === "bookings") setBookings(data.data);
          else if (tab === "newsletter") setNewsletter(data.data);
          else if (tab === "podcasts") setPodcasts(data.data);
          else if (tab === "services") setServices(data.data);
          else if (tab === "portfolio") setPortfolio(data.data);
          else setTestimonials(data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [adminKey]
  );

  useEffect(() => {
    if (adminKey) {
      fetchData(activeTab);
    }
  }, [adminKey, activeTab, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminKey(data.data.adminKey);
      } else {
        setLoginError(data.message || "Invalid credentials");
      }
    } catch {
      setLoginError("Connection failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDeleteItem = async (id: string, resource: Tab) => {
    if (!adminKey || !confirm(`Are you sure you want to delete this item?`)) return;
    try {
      const endpoint =
        resource === "bookings"
          ? `/api/booking/${id}`
          : resource === "podcasts"
          ? `/api/podcasts/${id}`
          : resource === "services"
          ? `/api/services/${id}`
          : resource === "portfolio"
          ? `/api/portfolio/${id}`
          : `/api/testimonials/${id}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        fetchData(resource);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleStatusUpdate = async (id: string, status: BookingStatus) => {
    if (!adminKey) return;
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status } : b))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Login Screen
  if (!adminKey) {
    return (
      <div className="min-h-screen bg-[#0d141a] flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0d141a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 9a7 7 0 1 1 14 0H5zm7 3a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Monk Podcast Studio — Restricted Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-[#0d141a] mb-2">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="form-input"
                disabled={isLoggingIn}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-[#0d141a] mb-2">
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
                  className="form-input pr-10"
                  disabled={isLoggingIn}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-primary w-full disabled:opacity-60"
              id="admin-login-btn"
            >
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-20 pb-16">
      {/* Admin Header */}
      <div className="bg-[#0d141a] text-white py-4">
        <div className="container-custom flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-gray-400 text-xs">
              Monk Podcast Studio Management &amp; Content CMS
            </p>
          </div>
          <button
            onClick={() => setAdminKey(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            id="admin-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Contacts", count: contacts.length, icon: Users, color: "bg-blue-500" },
            { label: "Bookings", count: bookings.length, icon: Calendar, color: "bg-[#8f11a8]" },
            { label: "Subscribers", count: newsletter.length, icon: Mail, color: "bg-green-500" },
            { label: "Podcasts", count: podcasts.length, icon: Mic, color: "bg-amber-500" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0d141a]">{stat.count}</div>
                  <div className="text-[#56585e] text-xs">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs + Search */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-5 border-b border-gray-100 gap-4">
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-1.5">
              {(["contacts", "bookings", "newsletter", "podcasts", "services", "portfolio", "testimonials"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearch("");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-[#0d141a] text-white"
                      : "bg-gray-100 text-[#56585e] hover:bg-gray-200"
                  }`}
                  id={`admin-tab-${tab}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0d141a] w-40 sm:w-48"
                  id="admin-search"
                />
              </div>
              {/* Refresh */}
              <button
                onClick={() => fetchData(activeTab)}
                disabled={isLoading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-[#8f11a8]" />
              </div>
            ) : (
              <>
                {/* CONTACTS TABLE */}
                {activeTab === "contacts" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Name</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Email</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Phone</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Subject</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-[#56585e]">
                            No contact inquiries yet
                          </td>
                        </tr>
                      ) : (
                        contacts.map((c) => (
                          <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{c.name}</td>
                            <td className="px-5 py-4 text-[#56585e]">{c.email}</td>
                            <td className="px-5 py-4 text-[#56585e]">{c.phone}</td>
                            <td className="px-5 py-4 text-[#56585e] max-w-xs truncate">{c.subject}</td>
                            <td className="px-5 py-4 text-[#56585e] whitespace-nowrap">
                              {new Date(c.createdAt).toLocaleDateString("en-IN")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* BOOKINGS TABLE */}
                {activeTab === "bookings" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Customer</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Service</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Date &amp; Time</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Status</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-[#56585e]">
                            No bookings yet
                          </td>
                        </tr>
                      ) : (
                        bookings.map((b) => {
                          const StatusIcon = STATUS_ICONS[b.status as BookingStatus];
                          return (
                            <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-4">
                                <div className="font-medium text-[#0d141a]">{b.name}</div>
                                <div className="text-[#56585e] text-xs">{b.email} • {b.phone}</div>
                              </td>
                              <td className="px-5 py-4 text-[#56585e]">{b.service}</td>
                              <td className="px-5 py-4 text-[#56585e] whitespace-nowrap">
                                <div>{new Date(b.preferredDate).toLocaleDateString("en-IN")}</div>
                                <div className="text-xs">{b.preferredTime}</div>
                              </td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[b.status as BookingStatus]}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {b.status}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={b.status}
                                    onChange={(e) => handleStatusUpdate(b._id, e.target.value as BookingStatus)}
                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#0d141a]"
                                  >
                                    {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={() => handleDeleteItem(b._id, "bookings")}
                                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                                    title="Delete booking"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}

                {/* PODCASTS TABLE */}
                {activeTab === "podcasts" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Title</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Category</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Duration</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {podcasts.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-[#56585e]">
                            No podcasts in database. Create via API POST /api/podcasts
                          </td>
                        </tr>
                      ) : (
                        podcasts.map((p) => (
                          <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{p.title}</td>
                            <td className="px-5 py-4 text-[#56585e]">{p.category}</td>
                            <td className="px-5 py-4 text-[#56585e]">{p.duration}</td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => handleDeleteItem(p._id, "podcasts")}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* SERVICES TABLE */}
                {activeTab === "services" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Title</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Slug</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {services.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center py-12 text-[#56585e]">
                            No services in database. Create via API POST /api/services
                          </td>
                        </tr>
                      ) : (
                        services.map((s) => (
                          <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{s.title}</td>
                            <td className="px-5 py-4 text-[#56585e]">{s.slug}</td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => handleDeleteItem(s._id, "services")}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* PORTFOLIO TABLE */}
                {activeTab === "portfolio" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Project Title</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Category</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Client</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {portfolio.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-[#56585e]">
                            No portfolio projects in database. Create via API POST /api/portfolio
                          </td>
                        </tr>
                      ) : (
                        portfolio.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{item.title}</td>
                            <td className="px-5 py-4 text-[#56585e]">{item.category}</td>
                            <td className="px-5 py-4 text-[#56585e]">{item.clientName || "-"}</td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => handleDeleteItem(item._id, "portfolio")}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* TESTIMONIALS TABLE */}
                {activeTab === "testimonials" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Client</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Location</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Rating</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {testimonials.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-12 text-[#56585e]">
                            No testimonials in database. Create via API POST /api/testimonials
                          </td>
                        </tr>
                      ) : (
                        testimonials.map((t) => (
                          <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{t.name}</td>
                            <td className="px-5 py-4 text-[#56585e]">{t.location}</td>
                            <td className="px-5 py-4 text-[#56585e]">{t.rating} ★</td>
                            <td className="px-5 py-4">
                              <button
                                onClick={() => handleDeleteItem(t._id, "testimonials")}
                                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* NEWSLETTER TABLE */}
                {activeTab === "newsletter" && (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-5 py-3 font-semibold text-[#56585e]">#</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Name</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Contact Number</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Email</th>
                        <th className="px-5 py-3 font-semibold text-[#56585e]">Subscribed On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {newsletter.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-[#56585e]">
                            No subscribers yet
                          </td>
                        </tr>
                      ) : (
                        newsletter.map((n, idx) => (
                          <tr key={n._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 text-[#56585e]">{idx + 1}</td>
                            <td className="px-5 py-4 text-[#56585e]">{n.name || "-"}</td>
                            <td className="px-5 py-4 text-[#56585e]">{n.contactNumber || "-"}</td>
                            <td className="px-5 py-4 font-medium text-[#0d141a]">{n.email}</td>
                            <td className="px-5 py-4 text-[#56585e]">
                              {new Date(n.createdAt).toLocaleDateString("en-IN")}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
