
const words = [
  "Systèmes électroniques embarqués",
  "IoT & communication intelligente",
  "Analyse des données industrielles",
  "Intelligence artificielle appliquée",
  "Développement web & automatisation",
  "Robotique & systèmes autonomes"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
  if (!typing) return;
  const current = words[wordIndex];
  typing.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeEffect, 58);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 28);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, deleting ? 1200 : 300);
  }
}
typeEffect();

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function animateCounter(el) {
  const target = Number(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = "1";
    animateCounter(entry.target);
  });
}, { threshold: 0.35 });

document.querySelectorAll(".counter").forEach((el) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = (el.dataset.target || "0") + (el.dataset.suffix || "");
  } else {
    counterObserver.observe(el);
  }
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-category]");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.style.display = visible ? "" : "none";
    });
  });
});

const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(
      "Bonjour Abdou-Hayi,\n\n" +
      data.get("message") +
      "\n\nNom : " + data.get("name") +
      "\nEmail : " + data.get("email")
    );
    window.location.href = "mailto:abdouhayisaliou@gmail.com?subject=" + subject + "&body=" + body;
  });
}
