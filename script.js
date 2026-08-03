// script.js: autodetección de logo y fondo + animación de partículas

// --- Configuración de búsqueda de archivos (añade más variantes si quieres) ---
const possibleLogos = [
  'assets/LogoWeb@2x.png',
  'assets/LogoWeb.png',
  'assets/logo.png',
  'assets/LogoWeb.PNG',
  'assets/LogoWeb.jpg',
  'LogoWeb.png',
  'logo.png'
];

const possibleBackgrounds = [
  'assets/Fondoweb.jpg',
  'assets/fondoweb.jpg',
  'assets/Fondoweb.PNG',
  'assets/hero.jpg',
  'assets/Hero.jpg',
  'Fondoweb.jpg',
  'hero.jpg'
];

// Devuelve una promesa que resuelve true si la imagen carga
function imgExists(url, timeout = 5000) {
  return new Promise((resolve) => {
    const img = new Image();
    let done = false;
    img.onload = () => { if (!done) { done = true; resolve(true); } };
    img.onerror = () => { if (!done) { done = true; resolve(false); } };
    // timeout en caso de que quede colgado
    setTimeout(() => { if (!done) { done = true; resolve(false); } }, timeout);
    img.src = url;
  });
}

// Busca la primera ruta que exista en la lista
async function findFirstExisting(list) {
  for (const p of list) {
    // evita consultar rutas vacías
    try {
      const ok = await imgExists(p);
      if (ok) return p;
    } catch (e) {
      // ignorar errores y seguir probando
    }
  }
  return null;
}

// Aplica logo y fondo encontrados
async function applyAssets() {
  const logoEl = document.getElementById('site-logo');
  const hero = document.getElementById('hero-section');

  const foundLogo = await findFirstExisting(possibleLogos);
  if (foundLogo) {
    logoEl.src = foundLogo;
    // si hay versión 2x con "@2x" en la misma ruta, puedes añadir srcset dinámicamente
    if (foundLogo.endsWith('@2x.png')) {
      // si encontramos la 2x, intenta encontrar la 1x (remover @2x)
      const oneX = foundLogo.replace('@2x.png', '.png');
      const okOne = await imgExists(oneX);
      if (okOne) logoEl.srcset = `${foundLogo} 2x, ${oneX} 1x`;
      else logoEl.srcset = `${foundLogo} 2x`;
    } else {
      // intenta ver si existe una @2x correspondiente
      const hi = foundLogo.replace(/(\.\w+)$/, '@2x$1');
      const okHi = await imgExists(hi);
      if (okHi) logoEl.srcset = `${hi} 2x, ${foundLogo} 1x`;
    }
  } else {
    console.warn('No se encontró logo en las rutas probadas.');
  }

  const foundBg = await findFirstExisting(possibleBackgrounds);
  if (foundBg) {
    // aplicamos como fondo CSS para que cover funcione bien
    hero.style.backgroundImage = `url("${foundBg}")`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center right';
  } else {
    console.warn('No se encontró fondo en las rutas probadas.');
  }
}

// ---------- Partículas (código similar al que tenías) ----------
const config = {
  particleCount: 36,
  maxRadius: 110,
  minRadius: 20,
  maxSpeed: 0.35,
  blur: 8,
  color: '255,255,255',
  opacity: 0.08,
  reduceOnMobileWidth: 700,
};

(function particlesAndStart() {
  const canvas = document.getElementById('bg-canvas');
  const hero = document.getElementById('hero-section');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth = hero.offsetWidth;
    h = canvas.clientHeight = hero.offsetHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function initParticles() {
    particles = [];
    let count = config.particleCount;
    if (window.innerWidth < config.reduceOnMobileWidth) count = Math.max(6, Math.floor(count * 0.45));
    for (let i = 0; i < count; i++){
      const radius = rand(config.minRadius, config.maxRadius);
      particles.push({
        x: rand(-radius, w + radius),
        y: rand(-radius, h + radius),
        r: radius,
        vx: rand(-config.maxSpeed, config.maxSpeed),
        vy: rand(-config.maxSpeed * 0.6, config.maxSpeed * 0.6),
        phase: rand(0, Math.PI*2),
        phaseSpeed: rand(0.002, 0.01),
        alpha: rand(config.opacity * 0.6, config.opacity * 1.6)
      });
    }
  }

  function drawParticle(p) {
    const grad = ctx.createRadialGradient(p.x, p.y, p.r*0.08, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(${config.color}, ${p.alpha})`);
    grad.addColorStop(0.5, `rgba(${config.color}, ${p.alpha * 0.45})`);
    grad.addColorStop(1, `rgba(${config.color}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(60, now - last);
    last = now;

    ctx.clearRect(0, 0, w, h);
    ctx.filter = `blur(${config.blur}px)`;

    for (let p of particles){
      p.phase += p.phaseSpeed * (dt/16);
      p.x += p.vx * (dt/16) + Math.sin(p.phase) * 0.15;
      p.y += p.vy * (dt/16) + Math.cos(p.phase) * 0.12;

      if (p.x < -p.r) p.x = w + p.r;
      if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      if (p.y > h + p.r) p.y = -p.r;

      drawParticle(p);
    }

    ctx.filter = 'none';
    requestAnimationFrame(frame);
  }

  function start() {
    resize();
    initParticles();
    last = performance.now();
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });

  if (window.innerWidth < 420) {
    canvas.style.display = 'none';
  } else {
    start();
  }
})();

// Llamamos a applyAssets para detectar y aplicar logo/fondo
applyAssets();