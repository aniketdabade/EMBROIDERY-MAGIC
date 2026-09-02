const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".gallery-card");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.classList.toggle("hidden", !match);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

cards.forEach(card => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

document.getElementById("lightboxOrder").addEventListener("click", closeLightbox);

const form = document.getElementById("orderForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const type = data.get("type");
  const size = data.get("size") || "Not specified";
  const date = data.get("date") || "Not specified";
  const message = data.get("message");

  const text =
`Hi Embroidery Magic! ✨

I'd like to enquire about a custom order.

Name: ${name}
WhatsApp: ${phone}
Type: ${type}
Preferred size: ${size}
Needed by: ${date}

My idea:
${message}

I can share a reference image here if needed.`;

  const url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener");

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  const open = nav.style.display === "flex";
  nav.style.display = open ? "" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "72px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.padding = "22px 6vw";
  nav.style.background = "var(--paper)";
  nav.style.flexDirection = "column";
  nav.style.gap = "20px";
  nav.style.borderBottom = "1px solid var(--line)";
});
