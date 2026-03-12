// Adhan Service Worker
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Listen for scheduled adhan messages
self.addEventListener('message', e => {
  if(e.data?.type === 'SCHEDULE_ADHAN') {
    const { prayers, adhanUrl, city } = e.data;
    prayers.forEach(p => {
      const delay = p.timestamp - Date.now();
      if(delay > 0 && delay < 24*60*60*1000) {
        setTimeout(() => {
          self.registration.showNotification('🕌 ' + p.name, {
            body: 'حان وقت صلاة ' + p.name + ' — ' + city,
            icon: '/Images/faviconLogo.jpg',
            badge: '/Images/faviconLogo.jpg',
            tag: 'adhan_' + p.key,
            requireInteraction: true,
            vibrate: [200, 100, 200, 100, 200],
            actions: [
              { action: 'open', title: 'فتح التطبيق' },
              { action: 'dismiss', title: 'إغلاق' }
            ]
          });
          // Also broadcast to open tabs to play adhan audio
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({ type: 'PLAY_ADHAN', prayer: p.name, adhanUrl });
            });
          });
        }, delay);
      }
      // 5-minute warning
      const warn = p.timestamp - Date.now() - 5*60*1000;
      if(warn > 0) {
        setTimeout(() => {
          self.registration.showNotification('⏰ تنبيه الصلاة', {
            body: 'سيحين وقت صلاة ' + p.name + ' بعد 5 دقائق',
            icon: '/Images/faviconLogo.jpg',
            tag: 'warn_' + p.key,
            vibrate: [100, 50, 100],
          });
        }, warn);
      }
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if(e.action === 'open' || !e.action) {
    e.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        if(clients.length > 0) { clients[0].focus(); return; }
        self.clients.openWindow('/');
      })
    );
  }
});
