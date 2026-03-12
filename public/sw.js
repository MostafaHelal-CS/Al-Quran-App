// AL-Quran Service Worker — Robust Prayer Notifications v4
// Strategy: Store schedule in SW, check on every activate/message/fetch,
// use periodic sync where available, and fire missed notifications on wake.
const CACHE_NAME = 'alquran-v4';
const STATIC_ASSETS = ['/', '/index.html'];
const SCHEDULE_KEY = 'prayer_schedule';

// ── Install & Activate ──────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    Promise.all([
      clients.claim(),
      // Check missed prayers on SW activation (app reopen)
      checkAndFireMissedPrayers()
    ])
  );
});

// ── Cache storage helpers ───────────────────────────────────────────────────
async function getSchedule() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const resp = await cache.match(SCHEDULE_KEY);
    if(!resp) return null;
    return await resp.json();
  } catch { return null; }
}

async function setSchedule(data) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(SCHEDULE_KEY, new Response(JSON.stringify(data)));
  } catch {}
}

// ── Check and fire any missed or current prayers ────────────────────────────
async function checkAndFireMissedPrayers() {
  const sched = await getSchedule();
  if(!sched || !sched.prayers) return;
  const now = Date.now();
  const { prayers, adhanUrl, city } = sched;

  for(const p of prayers) {
    const diff = now - p.timestamp;
    // Fire if within 0-3 min window (missed while phone was asleep)
    if(diff >= 0 && diff < 3 * 60 * 1000) {
      await self.registration.showNotification('🕌 حان وقت صلاة ' + p.name, {
        body: 'الآن ' + p.time + (city ? ' — ' + city : '') + ' — حي على الصلاة',
        icon: '/Images/faviconLogo.jpg',
        badge: '/Images/faviconLogo.jpg',
        tag: 'azan_' + p.key + '_' + p.timestamp,
        requireInteraction: true,
        vibrate: [300, 100, 300, 100, 300, 100, 300],
        data: { url: '/', adhanUrl },
        actions: [
          { action: 'open', title: '📿 افتح التطبيق' },
          { action: 'dismiss', title: 'إغلاق' }
        ]
      });
      // Broadcast to open tabs to play adhan audio
      const clients = await self.clients.matchAll({ includeUncontrolled: true });
      clients.forEach(c => c.postMessage({ type: 'PLAY_ADHAN', prayer: p.name, adhanUrl }));
    }
    // Fire 5-min warning if within window
    const warn = p.timestamp - 5 * 60 * 1000;
    const warnDiff = now - warn;
    if(warnDiff >= 0 && warnDiff < 3 * 60 * 1000) {
      await self.registration.showNotification('⏰ ' + p.name + ' بعد 5 دقائق', {
        body: 'سيحين وقت صلاة ' + p.name + ' الساعة ' + p.time,
        icon: '/Images/faviconLogo.jpg',
        tag: 'warn_' + p.key + '_' + p.timestamp,
        vibrate: [200, 100, 200],
        requireInteraction: false
      });
    }
  }
}

// ── Active timers (while app is open) ──────────────────────────────────────
let activeTimers = [];

function scheduleTimers(prayers, adhanUrl, city) {
  activeTimers.forEach(t => clearTimeout(t));
  activeTimers = [];
  const now = Date.now();

  prayers.forEach(p => {
    // 5-min warning
    const warn5 = p.timestamp - now - 5 * 60 * 1000;
    if(warn5 > 0 && warn5 < 86400000) {
      activeTimers.push(setTimeout(async () => {
        await self.registration.showNotification('⏰ ' + p.name + ' بعد 5 دقائق', {
          body: 'سيحين وقت صلاة ' + p.name + ' الساعة ' + p.time,
          icon: '/Images/faviconLogo.jpg',
          tag: 'warn_' + p.key,
          vibrate: [200, 100, 200],
          requireInteraction: false
        });
      }, warn5));
    }

    // On prayer time
    const onTime = p.timestamp - now;
    if(onTime > 0 && onTime < 86400000) {
      activeTimers.push(setTimeout(async () => {
        await self.registration.showNotification('🕌 حان وقت صلاة ' + p.name, {
          body: 'الآن ' + p.time + (city ? ' — ' + city : '') + ' — حي على الصلاة',
          icon: '/Images/faviconLogo.jpg',
          badge: '/Images/faviconLogo.jpg',
          tag: 'azan_' + p.key,
          requireInteraction: true,
          vibrate: [300, 100, 300, 100, 300, 100, 300],
          data: { url: '/', adhanUrl },
          actions: [
            { action: 'open', title: '📿 افتح التطبيق' },
            { action: 'dismiss', title: 'إغلاق' }
          ]
        });
        // Broadcast to open tabs
        const cls = await self.clients.matchAll({ includeUncontrolled: true });
        cls.forEach(c => c.postMessage({ type: 'PLAY_ADHAN', prayer: p.name, adhanUrl }));
      }, onTime));
    }
  });
}

// ── Message handler ─────────────────────────────────────────────────────────
self.addEventListener('message', async e => {
  if(e.data?.type === 'SCHEDULE_ADHAN') {
    const { prayers, adhanUrl, city } = e.data;
    const sched = { prayers, adhanUrl, city, savedAt: Date.now() };
    // Persist to cache so it survives SW restart
    await setSchedule(sched);
    // Schedule active timers
    scheduleTimers(prayers, adhanUrl, city);
  }
  if(e.data?.type === 'CHECK_MISSED') {
    await checkAndFireMissedPrayers();
  }
});

// ── Fetch: network-first for API, cache-first for assets ────────────────────
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(e.request.url.includes('api.') || e.request.url.includes('alquran.cloud')) {
    // Network-first for API calls
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if(resp.ok && !e.request.url.includes('prayer_schedule')) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return resp;
    }))
  );
});

// ── Periodic Sync (fires every ~15min even when app closed on supported browsers)
self.addEventListener('periodicsync', async e => {
  if(e.tag === 'check-prayer-times') {
    e.waitUntil(checkAndFireMissedPrayers());
  }
});

// ── Push (future server push support) ──────────────────────────────────────
self.addEventListener('push', e => {
  if(!e.data) return;
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title || '🕌 وقت الصلاة', {
      body: data.body || '',
      icon: '/Images/faviconLogo.jpg',
      tag: data.tag || 'prayer',
      requireInteraction: true,
    })
  );
});

// ── Notification click ──────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if(e.action === 'dismiss') return;
  e.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
      const existing = list.find(c => c.url.includes(self.location.origin));
      if(existing) return existing.focus();
      return clients.openWindow('/');
    })
  );
});
