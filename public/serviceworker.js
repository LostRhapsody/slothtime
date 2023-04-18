const cacheKey = "slothtimeCache_v1";
self.addEventListener("install", (event) => {

   event.waitUntil(
      caches.open(cacheKey).then((cache) => {
         // Add all the assets in the array to the 'slothtimeCache_v1'
         // `Cache` instance for later use.
         return cache.addAll([
            "static/scripts/slothtime.js",
            "static/scripts/er_app_anim.js",
            "static/scripts/er_app_utils.js",
            "static/scripts/er_app_starttheme.js",
            "static/scripts/clock.js",
            "static/styles/er_apps_styles.css",
            "static/images/sloth-icon.png",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js",
            "https://md-block.verou.me/md-block.js",
            "https://code.jquery.com/jquery-3.6.2.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css",
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css",
         ]);
      })
   );
});

self.addEventListener("fetch", async (event) => {
      // Open the cache
      event.respondWith(
         caches.open(cacheKey).then((cache) => {
            // Respond with the image from the cache or from the network
            return cache.match(event.request).then((cachedResponse) => {
               return (
                  cachedResponse ||
                  fetch(event.request.url).then((fetchedResponse) => {
                     // Add the network response to the cache for future visits.
                     // Note: we need to make a copy of the response to save it in
                     // the cache and use the original as the request response.
                     cache.put(event.request, fetchedResponse.clone());

                     // Return the network response
                     return fetchedResponse;
                  })
               );
            });
         })
      );
});
