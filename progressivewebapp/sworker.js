importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');



// Initialize Firebase app
firebase.initializeApp({
    apiKey: "AIzaSyDwDIRX0Xzfnnq0wyjUX2EcsDBupoUA2n8",
    authDomain: "progressive-web-app-e6466.firebaseapp.com",
    databaseURL: "https://progressive-web-app-e6466-default-rtdb.firebaseio.com",
    projectId: "progressive-web-app-e6466",
    storageBucket: "progressive-web-app-e6466.appspot.com",
    messagingSenderId: "953962351852",
    appId: "1:953962351852:web:ea139c90661b6bcffb69c9",
    measurementId: "G-EY8MC668EC"
});

const messaging = firebase.messaging();

// Service worker install event
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                // Add your static assets here
                // "./", "./style.css", "./images/logo64.png", ...
            ]);
        }).catch(error => {
            console.error('Cache addAll error:', error);
        })
    );
});

// Service worker fetch event
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});


