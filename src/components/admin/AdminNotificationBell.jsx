import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, ExternalLink, Trash2, Briefcase, Mail, CheckCircle2, User, AlertCircle } from "lucide-react";
import { notificationsApi } from "@/lib/api";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function AdminNotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const seenIdsRef = useRef(new Set());

  // Request native HTML5 browser notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        // We can gently request permission
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  const fetchNotifications = async (triggerNativeAlert = true) => {
    try {
      const res = await notificationsApi.getRecent();
      if (res && res.success) {
        const list = res.data || [];
        const count = res.unread_count || 0;
        setNotifications(list);
        setUnreadCount(count);

        // Check for new incoming unread notifications for native browser alert
        if (triggerNativeAlert && typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission === "granted") {
            list.forEach((n) => {
              if (!n.is_read && !seenIdsRef.current.has(n.id)) {
                seenIdsRef.current.add(n.id);
                try {
                  const notif = new Notification(n.title || "Dharamvir Info Tech Notification", {
                    body: n.message || "You have a new update in admin panel",
                    icon: "/logo.png",
                    tag: `dvit-notif-${n.id}`,
                  });
                  notif.onclick = () => {
                    window.focus();
                    if (n.link) router.push(n.link);
                    else router.push("/admin/job-applications");
                  };
                } catch (e) {
                  console.warn("Failed to trigger desktop notification:", e);
                }
              }
            });
          }
        }

        // Initialize seen IDs so we don't spam notifications already loaded on first visit
        list.forEach((n) => seenIdsRef.current.add(n.id));
      }
    } catch (err) {
      // Quiet fail on network/session interruption
    }
  };

  useEffect(() => {
    fetchNotifications(false);
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 15000); // Check every 15s

    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await notificationsApi.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.is_read) {
      await handleMarkAsRead(notif.id);
    }
    setIsOpen(false);
    if (notif.link) {
      router.push(notif.link);
    } else if (notif.type === "job_application") {
      router.push("/admin/job-applications");
    }
  };

  const requestBrowserPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          toast.success("Browser notifications enabled!");
          try {
            new Notification("Notifications Enabled", {
              body: "You will receive desktop alerts for new job applications.",
              icon: "/logo.png",
            });
          } catch (_) {}
        } else {
          toast.info("Browser notifications were blocked or dismissed.");
        }
      });
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "job_application":
        return <Briefcase className="w-4 h-4 text-accent" />;
      case "contact":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "hire_developer":
        return <User className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "";
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        aria-label="Notifications"
        title="Admin Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold text-white bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent dark:bg-accent/20">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] font-semibold text-slate-500 hover:text-accent transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Browser Notification Permission Banner if not granted */}
          {typeof window !== "undefined" &&
            "Notification" in window &&
            Notification.permission !== "granted" && (
              <div className="bg-accent/5 border-b border-accent/15 px-4 py-2 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">
                  Enable desktop alerts for new applications?
                </span>
                <button
                  onClick={requestBrowserPermission}
                  className="font-bold text-accent hover:underline ml-2 whitespace-nowrap"
                >
                  Enable
                </button>
              </div>
            )}

          {/* Notification List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-400">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  No notifications yet
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  You will be notified when applicants submit job forms.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group ${
                    !notif.is_read
                      ? "bg-accent/5 dark:bg-accent/10"
                      : "opacity-80"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {timeAgo(notif.created_at)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <button
                      onClick={(e) => handleMarkAsRead(notif.id, e)}
                      className="p-1 text-slate-400 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/job-applications");
              }}
              className="text-accent hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              View All Applications <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/admin/visitors");
              }}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-[11px]"
            >
              Visitor Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
