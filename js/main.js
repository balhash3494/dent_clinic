/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* Counter animation */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('ru');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.hero-stats,.achievements-grid').forEach(el => counterObs.observe(el));

/* Phone mask */
const phone = document.getElementById('phoneInput');
if (phone) {
  phone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g,'');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (val.startsWith('7')) val = val.slice(0, 11);
    else val = val.slice(0, 10);
    let fmt = '';
    if (val.length > 0) fmt = '+7';
    if (val.length > 1) fmt += ' (' + val.slice(1,4);
    if (val.length >= 4) fmt += ') ' + val.slice(4,7);
    if (val.length >= 7) fmt += '-' + val.slice(7,9);
    if (val.length >= 9) fmt += '-' + val.slice(9,11);
    e.target.value = fmt;
  });
}

/* Form submit */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-booking');
  btn.textContent = '✓ Заявка отправлена! Позвоним вам в течение 15 минут';
  btn.style.background = 'linear-gradient(135deg, #2d7a4d, #3d9a5d)';
  btn.style.color = '#fff';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Записаться на консультацию →';
    btn.style.background = '';
    btn.style.color = '';
  }, 5000);
}

/* Mobile nav */
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('#mobileNav a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});

/* Header scroll effect */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.padding = '12px 48px';
    header.style.borderBottomColor = 'rgba(200,169,110,.2)';
  } else {
    header.style.padding = '20px 48px';
    header.style.borderBottomColor = 'rgba(200,169,110,.15)';
  }
}, { passive: true });