const canvas = document.querySelector("#signalCanvas");
const ctx = canvas.getContext("2d");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href && href.startsWith("#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);
const lightbox = document.querySelector("#photoLightbox");
const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
const lightboxCaption = lightbox ? lightbox.querySelector("figcaption") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
const lightboxItems = [...document.querySelectorAll(".lightbox-item")];

let width = 0;
let height = 0;
let particles = [];
let pointer = { x: 0, y: 0, active: false };

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.min(96, Math.floor(width * height / 18000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    size: Math.random() * 1.8 + 0.7
  }));
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(125, 247, 221, 0.62)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const target = particles[next];
      const dx = particle.x - target.x;
      const dy = particle.y - target.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 128) {
        ctx.strokeStyle = `rgba(77, 227, 255, ${0.18 - distance / 900})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    }

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 180) {
        ctx.strokeStyle = `rgba(255, 111, 174, ${0.22 - distance / 900})`;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawBackground);
}

function updateActiveNav() {
  let current = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (sections[index].offsetTop - 140 <= window.scrollY) {
      current = sections[index];
      break;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

function openLightbox(item) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption");
  if (!image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption ? caption.textContent : image.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}

lightboxItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(item);
    }
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

resizeCanvas();
updateActiveNav();
drawBackground();
