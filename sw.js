importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/index.js',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/navigation.html',
    revision: '1'
  },
  {
    url: '/permission.js',
    revision: '1'
  },
  {
    url: '/css/app.css',
    revision: '1'
  },
  {
    url: '/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/img/icon192.png',
    revision: '1'
  },
  {
    url: '/img/icon512.png',
    revision: '1'
  },
  {
    url: '/img/logo.png',
    revision: '1'
  },
  {
    url: '/img/paral.jpg',
    revision: '1'
  },
  {
    url: '/js/api.js',
    revision: '1'
  },
  {
    url: '/js/app.js',
    revision: '1'
  },
  {
    url: '/js/db.js',
    revision: '1'
  },
  {
    url: '/js/idb.js',
    revision: '1'
  },
  {
    url: '/js/jquery-2.1.1.min.js',
    revision: '1'
  },
  {
    url: '/js/Loading.js',
    revision: '1'
  },
  {
    url: '/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/pages/main.html',
    revision: '1'
  },
  {
    url: '/js/nanti.html',
    revision: '1'
  },
  {
    url: '/js/tanding.html',
    revision: '1'
  }
]);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'footballData',
  })
);