const CACHE = ["/", "/login", "/register", "/style", "/error", "/offline"];
const cacheName = "book store caches";
self.addEventListener("install", event => {
  console.log("Trying to install service worker and cache site assets");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(CACHE);
    }),
  );
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          console.log(event.request.url);
          return response;
        }
        console.log("getting request for ", event.request.url);
        return fetch(event.request).then(response => {
          if (response.status === 404) {
            return caches.match("/error");
          }
          return caches.open(cacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(err => {
        if (
          event.request.url == "http://localhost:5000/loginForm" ||
          event.request.url == "http://localhost:5000/registerForm"
        ) {
          return caches.match("/offline");
        } else {
          return caches.match("/error");
        }
      }),
  );
});
self.addEventListener("activate", event => {
  console.log("service worker b-activate");
});
