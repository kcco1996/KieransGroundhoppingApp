const STATIC_CACHE = "groundhops-static-v2";
const TILE_CACHE = "groundhops-tiles-v2";
const IMAGE_CACHE = "groundhops-images-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./sw.js",
  "./favicon.png",

  // Core app icons
  "./assets/app-icon.png",
  "./assets/train-logo.jpg",
  "./assets/train-icon.png",
  "./assets/london-station.png",

  // Main badge assets
  "./assets/west-ham-badge-outline.jpg",
  "./assets/west-ham-badge.png",
  "./assets/gillingham-badge.png",
  "./assets/man-united-badge.png",
  "./assets/england-badge.png",
  "./assets/charlton-badge.png",
  "./assets/southend-badge.png",
  "./assets/wycombe-badge.png",
  "./assets/norwich-badge.png",
  "./assets/west-brom-badge.png",
  "./assets/southampton-badge.png",
  "./assets/derby-badge.png",
  "./assets/watford-badge.png",
  "./assets/stevenage-badge.png",
  "./assets/wimbledon-badge.png",
  "./assets/bournemouth-badge.png",
  "./assets/arsenal-badge.png",
  "./assets/fulham-badge.png",
  "./assets/forest-green-badge.png",
  "./assets/brighton-badge.png",
  "./assets/portsmouth-badge.png",
  "./assets/ipswich-badge.png",
  "./assets/cambridge-badge.png",
  "./assets/colchester-badge.png",
  "./assets/liverpool-badge.png",
  "./assets/hull-badge.png",
  "./assets/crawley-badge.png",
  "./assets/chesterfield-badge.png",
  "./assets/brentford-badge.png",
  "./assets/swindon-badge.png",
  "./assets/wolves-badge.png",
  "./assets/chelsea-badge.png",
  "./assets/leicester-badge.png",
  "./assets/man-city-badge.png",
  "./assets/aston-villa-badge.png",
  "./assets/sheffield-united-badge.png",
  "./assets/luton-badge.png",
  "./assets/tottenham-badge.png",
  "./assets/everton-badge-outline.jpg",
  "./assets/everton-badge.png",
  "./assets/reading-badge.png",
  "./assets/birmingham-badge.png",
  "./assets/qpr-badge.png",
  "./assets/peterborough-badge.png",
  "./assets/stoke-badge.png",
  "./assets/leyton-orient-badge.png",
  "./assets/newcastle-badge.png",
  "./assets/bradford-badge.png",
  "./assets/crystal-palace-badge.png",
  "./assets/lincoln-badge.png",
  "./assets/maidstone-united-badge.png",
  "./assets/chatham-town-badge.png",
  "./assets/millwall-badge.png",
  "./assets/coventry-badge.png",
  "./assets/plymouth-badge.png",
  "./assets/middlesbrough-badge.png",
  "./assets/blackpool-badge.png",
  "./assets/blackburn-badge.png",
  "./assets/sunderland-badge.png",
  "./assets/nottingham-forest-badge.png",
  "./assets/burnley-badge.png",
  "./assets/huddersfield-badge.png",
  "./assets/leeds-badge.png",
  "./assets/northampton-badge.png",
  "./assets/scunthorpe-badge.png",
  "./assets/cardiff-badge.png",
  "./assets/preston-badge.png",
  "./assets/swansea-badge.png",
  "./assets/rotherham-badge.png",
  "./assets/oxford-badge.png",
  "./assets/sheffield-wednesday-badge.png",
  "./assets/bristol-city-badge.png",
  "./assets/wigan-badge.png",
  "./assets/bromley-badge.png",
  "./assets/doncaster-badge.png",
  "./assets/bolton-badge.png",
  "./assets/yeovil-badge.png",
  "./assets/exeter-badge.png",
  "./assets/macclesfield-badge.png",
  "./assets/grimsby-badge.png",
  "./assets/burton-badge.png",
  "./assets/barnsley-badge.png",
  "./assets/stockport-badge.png",
  "./assets/shrewsbury-badge.png",
  "./assets/wrexham-badge.png",
  "./assets/bristol-rovers-badge.png",
  "./assets/bath-badge.png",
  "./assets/walsall-badge.png",
  "./assets/cheltenham-badge.png",
  "./assets/port-vale-badge.png",
  "./assets/mk-dons-badge.png",
  "./assets/mansfield-badge.png",
  "./assets/rochdale-badge.png",
  "./assets/carlisle-badge.png",
  "./assets/napoli-badge.png",
  "./assets/accrington-badge.png",
  "./assets/barrow-badge.png",
  "./assets/oldham-badge.png",
  "./assets/notts-county-badge.png",
  "./assets/harrogate-badge.png",
  "./assets/crewe-badge.png",
  "./assets/gateshead-badge.png",
  "./assets/tranmere-badge.png",
  "./assets/salford-badge.png",
  "./assets/fleetwood-badge.png",
  "./assets/morecambe-badge.png",
  "./assets/newport-badge.png",
  "./assets/barnet-badge.png",
  "./assets/york-badge.png",
  "./assets/dulwich-badge.png",
  "./assets/hartlepool-badge.png",
  "./assets/ebbsfleet-badge.png",
  "./assets/bury-badge.png",
  "./assets/kidderminster-badge.png",
  "./assets/wealdstone-badge.png",
  "./assets/eastleigh-badge.png",
  "./assets/aldershot-badge.png",
  "./assets/boston-badge.png",
  "./assets/celtic-badge.png",
  "./assets/rangers-badge.png",

  // Cross icons
  "./assets/green-cross.png",
  "./assets/orange-cross.png",
  "./assets/yellow-cross.png",
  "./assets/blue-cross.png",

  // Leaflet
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => ![STATIC_CACHE, TILE_CACHE, IMAGE_CACHE].includes(key))
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== "GET") return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  if (
    url.hostname.includes("tile.openstreetmap.org") ||
    url.hostname.match(/^[abc]\.tile\.openstreetmap\.org$/)
  ) {
    event.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res.ok) cache.put(req, res.clone());
          return res;
        } catch {
          return new Response("", { status: 504, statusText: "Offline tile unavailable" });
        }
      })
    );
    return;
  }

  if (
    req.destination === "image" ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif)$/i)
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async cache => {
        const cached = await cache.match(req);
        if (cached) return cached;

        try {
          const res = await fetch(req);
          if (res.ok) cache.put(req, res.clone());
          return res;
        } catch {
          return caches.match("./assets/app-icon.png");
        }
      })
    );
    return;
  }

  if (
    req.destination === "script" ||
    req.destination === "style" ||
    req.destination === "font"
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async cache => {
        const cached = await cache.match(req);
        const networkFetch = fetch(req)
          .then(res => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => null);

        return cached || networkFetch || Response.error();
      })
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(STATIC_CACHE).then(cache => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});