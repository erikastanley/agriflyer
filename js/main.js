/* =====================
   NAV: Scroll effect
   ===================== */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* =====================
   MOBILE MENU
   ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close when a nav link is tapped
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

/* =====================
   SCROLL REVEALS
   ===================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================
   CONTACT FORM — Web3Forms
   Free plan: 250 submissions/month
   Spam protection: honeypot field in the form HTML
   Docs: https://docs.web3forms.com
   ===================== */
const quoteForm  = document.getElementById('quote-form');
const submitBtn  = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');

if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData  = new FormData(quoteForm);
    const payload   = Object.fromEntries(formData);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        quoteForm.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Quote Request →';
        alert('Something went wrong. Please call or text directly at the number above.');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Quote Request →';
      alert('Something went wrong. Please call or text directly at the number above.');
    }
  });
}
