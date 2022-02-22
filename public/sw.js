const CACHE_NAME = 'SOT-v1',
	urlsToCache = [
		'tailwind.css',
		'../public/js/alertifyjs/css/alertify.css',
		'material-design-iconic-font/css/materialdesignicons.min.css',
		'avicon.svg',
		'../public/js/alpine.js',
		'../public/js/core/main.js',
		'../public/js/alertifyjs/alertify.js',
		'img/undraw_add_information_j2wg.svg',
	]

self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(() => self.skipWaiting())
			})
			.catch(err => console.log('Falló registro de cache', err))
	)
})

self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME]

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {
						if (cacheWhitelist.indexOf(cacheName) === -1) {
							return caches.delete(cacheName)
						}
					})
				)
			})
			// Le indica al SW activar el cache actual
			.then(() => self.clients.claim())
	)
})

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if (res) {
					return res
				}
				return fetch(e.request)
			})
	)
})
