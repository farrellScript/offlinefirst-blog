var staticCacheName = "offlinefirstblog-v1"

self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache){
			return cache.addAll([
				'/skeleton',
				'/assets/main.js',
				'/assets/offline.js'
			])
		})
	)
})

self.addEventListener('activate', function(event) {
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
		return Promise.all(
		  cacheNames.filter(function(cacheName) {
			return cacheName.startsWith('offlinefirstblog-') &&
				   cacheName != staticCacheName;
		  }).map(function(cacheName) {
			return caches.delete(cacheName);
		  })
		);
	  })
	);
});

self.addEventListener('fetch',function(event){
	var requestUrl = new URL(event.request.url);
	console.log('path',requestUrl.pathname)
	if (requestUrl.origin === location.origin){
        if(requestUrl.pathname == "/"){
            console.log('in top level nav')
						event.respondWith(caches.match('/skeleton'))
						return
        }
		if(requestUrl.pathname.match('/news/(.?)')){
            console.log('product page')
						event.respondWith(caches.match('/skeleton'))
						return
		}
	}
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
	)
})