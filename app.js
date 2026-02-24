/* ===========================
   NexTech — app.js
   =========================== */

'use strict';

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = ['home','products','features','deals','contact'];
  const scrollY = window.scrollY + 120;
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== SEARCH =====
const searchToggle      = document.getElementById('searchToggle');
const searchBar         = document.getElementById('searchBar');
const searchInput       = document.getElementById('searchInput');
const searchResultsCount= document.getElementById('searchResultsCount');

searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput.focus();
  else { searchInput.value = ''; filterBySearch(''); }
});

searchInput.addEventListener('input', e => {
  filterBySearch(e.target.value.trim().toLowerCase());
});

function filterBySearch(query) {
  const cards = document.querySelectorAll('.product-card');
  let count = 0;
  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cat  = card.dataset.category.toLowerCase();
    const match = !query || name.includes(query) || cat.includes(query);
    card.style.display = match ? '' : 'none';
    if (match) count++;
  });
  searchResultsCount.textContent = query ? `${count} result${count !== 1 ? 's' : ''} found` : '';
}

// ===== CART STATE =====
const cart = {};

function getProductData(btn) {
  const card = btn.closest('.product-card') || btn.closest('[data-id]');
  return {
    id:    card.dataset.id,
    name:  card.dataset.name,
    price: parseInt(card.dataset.price),
    img:   card.dataset.img
  };
}

// ===== ADD TO CART =====
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const p = getProductData(btn);
    if (cart[p.id]) {
      cart[p.id].qty++;
    } else {
      cart[p.id] = { ...p, qty: 1 };
    }
    renderCart();
    animateCartBtn(btn);
    showToast(`✔ ${p.name} added to cart`);
  });
});

function animateCartBtn(btn) {
  btn.style.transform = 'scale(0.85)';
  setTimeout(() => btn.style.transform = '', 200);
}

// ===== RENDER CART =====
const cartItems  = document.getElementById('cartItems');
const cartEmpty  = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartBadge  = document.getElementById('cartBadge');
const cartTotalEl= document.getElementById('cartTotal');

function renderCart() {
  const items = Object.values(cart);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  // badge
  cartBadge.textContent = count;
  cartBadge.classList.toggle('visible', count > 0);

  // empty/footer
  cartEmpty.style.display  = items.length ? 'none'  : 'block';
  cartFooter.style.display = items.length ? 'block' : 'none';

  // items
  const existing = cartItems.querySelectorAll('.cart-item');
  existing.forEach(el => el.remove());

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.dataset.id = item.id;
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>$${(item.price * item.qty).toLocaleString()}</span>
        <div class="cart-item-controls">
          <button class="qty-btn minus" aria-label="Decrease quantity">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn plus" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-item-remove" aria-label="Remove item">✕</button>`;
    el.querySelector('.minus').addEventListener('click', () => changeQty(item.id, -1));
    el.querySelector('.plus').addEventListener('click',  () => changeQty(item.id,  1));
    el.querySelector('.cart-item-remove').addEventListener('click', () => removeItem(item.id));
    cartItems.appendChild(el);
  });

  cartTotalEl.textContent = `$${total.toLocaleString()}`;
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}
function removeItem(id) {
  delete cart[id];
  renderCart();
  showToast('Item removed from cart');
}

// ===== CART SIDEBAR TOGGLE =====
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle  = document.getElementById('cartToggle');
const cartClose   = document.getElementById('cartClose');
const overlay     = document.getElementById('overlay');

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click',  closeCart);
overlay.addEventListener('click',    closeCart);

function openCart()  { cartSidebar.classList.add('open'); overlay.classList.add('active'); }
function closeCart() { cartSidebar.classList.remove('open'); overlay.classList.remove('active'); }

document.querySelector('.btn-checkout').addEventListener('click', () => {
  showToast('🎉 Proceeding to checkout (demo mode)');
  closeCart();
});

// ===== FILTER PILLS =====
const pills = document.querySelectorAll('.pill');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      if (show) {
        card.style.display = '';
        card.style.animationDelay = (i * 0.06) + 's';
      } else {
        card.style.display = 'none';
      }
    });
    // clear search
    searchInput.value = '';
    searchResultsCount.textContent = '';
  });
});

// ===== PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${4 + Math.random()*6}s;
      --delay:${Math.random()*4}s;
      background:${Math.random() > 0.5 ? '#06d6f0' : '#a855f7'};
    `;
    container.appendChild(p);
  }
})();

// ===== COUNTDOWN TIMER =====
(function startCountdown() {
  const end = Date.now() + (8 * 3600 + 24 * 60) * 1000;
  const hEl = document.getElementById('cdHours');
  const mEl = document.getElementById('cdMins');
  const sEl = document.getElementById('cdSecs');
  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
    if (diff > 0) setTimeout(tick, 1000);
  }
  tick();
})();

// ===== FOOTER TIME =====
(function updateFooterTime() {
  const el = document.getElementById('footerTime');
  function update() {
    const now = new Date();
    el.textContent = '// ' + now.toUTCString();
  }
  update();
  setInterval(update, 1000);
})();

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');
const formMsg        = document.getElementById('formMsg');
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = document.getElementById('emailInput').value.trim();
  if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    formMsg.className = 'form-msg error';
    formMsg.textContent = 'Please enter a valid email address.';
    return;
  }
  formMsg.className = 'form-msg success';
  formMsg.textContent = '✔ You\'re subscribed! Get ready for exclusive deals.';
  newsletterForm.reset();
  setTimeout(() => formMsg.textContent = '', 5000);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const contactMsg  = document.getElementById('contactMsg');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactMsg.className = 'form-msg success';
  contactMsg.textContent = '✔ Message sent! We\'ll get back to you within 24 hours.';
  contactForm.reset();
  setTimeout(() => contactMsg.textContent = '', 6000);
});

// ===== TOAST =====
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

// ===== INTERSECTION OBSERVER (Animate on scroll) =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.feature-card, .testimonial-card, .product-card, .contact-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Stagger product cards
document.querySelectorAll('.product-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.07) + 's';
});
