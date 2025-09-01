// ========== PORTFOLIO JAVASCRIPT ========== 

// ========== CAROUSEL COMPÉTENCES (existant) ==========
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.skills-carousel').forEach(carousel => {
    let isDown = false;
    let startX, scrollLeft;

    carousel.addEventListener('mousedown', e => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('click', e => {
      if (isDown) e.preventDefault();
    });
  });
});

// ========== SCROLL TO TOP BUTTON ==========
document.addEventListener('DOMContentLoaded', function() {
  const scrollBtn = document.querySelector('.back-to-top') || document.getElementById('backToTop');

  if (scrollBtn) {
    // Ajouter l'événement de clic pour faire défiler vers le haut
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
  }
});

// ========== SMOOTH SCROLL ==========
document.addEventListener('DOMContentLoaded', function() {
  // Scroll fluide sur tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// ========== CONTACT FORM HANDLER (Google Forms) ==========
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;
      
      // Désactiver le bouton et montrer le loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
      
      // Le formulaire va se soumettre vers Google Forms
      // Après 2 secondes, on affiche le succès
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        submitBtn.style.backgroundColor = '#10b981';
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }
});

