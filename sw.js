const CACHE = [
  "/",
  "/styles/style.css",
  "/images/Placeholder_book.svg",
  "/pages/404.html",
  "/pages/offline.html",
  "/login",
];
const cacheName = "tryout-v1";

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
            return caches.match("/pages/404.html");
          }
          return caches.open(cacheName).then(cache => {
            // we will add the response to request url
            //we can use the put request method
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(() => {
        console.log("youre offline");
        return caches.match("/pages/offline.html");
      }),
  );
}); //eventListener fetch
self.addEventListener("activate", event => {
  console.log("service worker b-activate");
});
