/**
 * Unique Visitor & Device Fingerprinting Tracker
 * Ensures zero duplicate rows in database while tracking every unique visitor.
 */

const STORAGE_KEY = 'dvit_visitor_id';

function getOrSetVisitorId() {
  if (typeof window === 'undefined') return null;

  try {
    let vid = localStorage.getItem(STORAGE_KEY);
    if (!vid) {
      // Check cookie
      const match = document.cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'));
      if (match) {
        vid = match[2];
      }
    }

    if (!vid) {
      // Generate durable high-entropy fingerprint
      const rnd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      vid = `dvit_usr_${Date.now().toString(36)}_${rnd}`;
      localStorage.setItem(STORAGE_KEY, vid);
      // Set 1-year cookie for cross-session durability
      document.cookie = `${STORAGE_KEY}=${vid}; path=/; max-age=31536000; SameSite=Lax`;
    }

    return vid;
  } catch (e) {
    return `dvit_anon_${Date.now()}`;
  }
}

function getDeviceInfo() {
  if (typeof window === 'undefined') return {};

  const ua = navigator.userAgent || '';
  let device_type = 'Desktop';
  if (/mobile/i.test(ua)) device_type = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) device_type = 'Tablet';

  let browser = 'Unknown';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua)) browser = 'Safari';

  let os = 'Unknown';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device_type, browser, os };
}

let lastPingPath = '';
let pingTimeout = null;

export function trackVisitorPing(pathname) {
  if (typeof window === 'undefined') return;

  const currentPath = pathname || window.location.pathname;
  if (lastPingPath === currentPath) return; // Prevent duplicate pings on same page render

  if (pingTimeout) clearTimeout(pingTimeout);

  pingTimeout = setTimeout(() => {
    lastPingPath = currentPath;
    const visitor_id = getOrSetVisitorId();
    if (!visitor_id) return;

    const device = getDeviceInfo();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    // Capture geolocation if already permitted (non-blocking)
    let lat = null;
    let lon = null;

    const sendPing = (latitude, longitude) => {
      try {
        fetch(`${apiUrl}/analytics/visitor-ping`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitor_id,
            pathname: currentPath,
            device_type: device.device_type,
            browser: device.browser,
            os: device.os,
            latitude: latitude || null,
            longitude: longitude || null,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch (err) {}
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          sendPing(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          sendPing(null, null);
        },
        { timeout: 3000, maximumAge: 600000 }
      );
    } else {
      sendPing(null, null);
    }
  }, 1000);
}

export { getOrSetVisitorId };
