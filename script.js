document.addEventListener('DOMContentLoaded', () => {
  // SLIDESHOW HERO FOTO AUTOMATIS
  const heroSlides = document.querySelectorAll('.hero-slide');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSlides.length > 1 && !prefersReducedMotion) {
    let currentSlide = 0;
    const SLIDE_DURATION = 5000;

    setInterval(() => {
      heroSlides[currentSlide].classList.remove('is-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('is-active');
    }, SLIDE_DURATION);
  }

  // TAHUN DINAMIS FOOTER
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // TOGGLE NAVIGASI MOBILE
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mainNav.classList.contains('open');
      mainNav.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    };

    navToggle.addEventListener('click', () => toggleMenu());

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    document.addEventListener('click', (e) => {
      const header = document.querySelector('.site-header');
      if (header && !header.contains(e.target) && mainNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // LOGIKA MODAL PORTOFOLIO
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalDesc = document.getElementById('modalDesc');

  if (projectModal && projectCards.length > 0) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const img = card.getAttribute('data-img');
        const desc = card.getAttribute('data-desc');
        const specs = card.getAttribute('data-specs');

        modalTitle.textContent = title || '';
        modalClient.textContent = client || '';
        modalSpecs.textContent = specs || '';
        modalDesc.textContent = desc || '';
        
        if (img) {
          modalImg.src = img;
          modalImg.alt = title;
          modalImg.style.display = 'block';
        } else {
          modalImg.style.display = 'none';
        }

        projectModal.showModal();
      });
    });

    // Tombol close
    modalClose.addEventListener('click', () => projectModal.close());

    // Klik di luar area modal (backdrop) untuk menutup
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        projectModal.close();
      }
    });
  }

  // HANDLER FORM KONTAK
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (formNote) {
        formNote.textContent = 'Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.';
        formNote.style.color = 'var(--blue)';
      }
      contactForm.reset();
    });
  }
});