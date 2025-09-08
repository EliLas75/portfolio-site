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

// ========== GALERIE LIGHTBOX AVANCÉE ==========
class ProjectGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.modal = null;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.createModal();
    this.bindEvents();
  }
  
  createModal() {
    // Créer le modal lightbox
    this.modal = document.createElement('div');
    this.modal.className = 'lightbox-modal';
    this.modal.innerHTML = `
      <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="">
        
        <!-- Boutons de navigation flottants -->
        <button class="lightbox-nav prev" aria-label="Image précédente">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="lightbox-nav next" aria-label="Image suivante">
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <!-- Contrôles en bas -->
        <div class="lightbox-controls">
          <div class="lightbox-info">
            <div class="lightbox-counter">Image 1 sur 1</div>
            <div class="lightbox-caption">Description de l'image</div>
          </div>
          
          <div class="lightbox-buttons">
            <button class="lightbox-btn nav-btn" id="prevBtn">
              <i class="fas fa-chevron-left"></i> Précédent
            </button>
            <button class="lightbox-btn nav-btn" id="nextBtn">
              Suivant <i class="fas fa-chevron-right"></i>
            </button>
            <button class="lightbox-btn close-btn" id="closeBtn">
              <i class="fas fa-times"></i> Fermer
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    
    // Bind des boutons du modal
    this.bindModalEvents();
  }
  
  bindModalEvents() {
    const prevBtn = this.modal.querySelector('#prevBtn');
    const nextBtn = this.modal.querySelector('#nextBtn');
    const closeBtn = this.modal.querySelector('#closeBtn');
    const prevNav = this.modal.querySelector('.lightbox-nav.prev');
    const nextNav = this.modal.querySelector('.lightbox-nav.next');
    
    prevBtn.addEventListener('click', () => this.previous());
    nextBtn.addEventListener('click', () => this.next());
    closeBtn.addEventListener('click', () => this.close());
    prevNav.addEventListener('click', () => this.previous());
    nextNav.addEventListener('click', () => this.next());
    
    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Navigation avec flèches
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        this.previous();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
    
    // Fermer en cliquant sur le fond
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }
  
  open(images, startIndex = 0) {
    this.images = images;
    this.currentIndex = startIndex;
    this.isOpen = true;
    
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    this.updateDisplay();
    this.updateNavigation();
  }
  
  close() {
    this.isOpen = false;
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.updateDisplay();
      this.updateNavigation();
    }
  }
  
  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateDisplay();
      this.updateNavigation();
    }
  }
  
  updateDisplay() {
    const img = this.modal.querySelector('.lightbox-img');
    const counter = this.modal.querySelector('.lightbox-counter');
    const caption = this.modal.querySelector('.lightbox-caption');
    
    if (this.images[this.currentIndex]) {
      img.src = this.images[this.currentIndex].src;
      img.alt = this.images[this.currentIndex].alt;
      counter.textContent = `Image ${this.currentIndex + 1} sur ${this.images.length}`;
      caption.textContent = this.images[this.currentIndex].title || this.images[this.currentIndex].alt;
    }
  }
  
  updateNavigation() {
    const prevBtn = this.modal.querySelector('#prevBtn');
    const nextBtn = this.modal.querySelector('#nextBtn');
    const prevNav = this.modal.querySelector('.lightbox-nav.prev');
    const nextNav = this.modal.querySelector('.lightbox-nav.next');
    
    // Désactiver/activer les boutons selon la position
    prevBtn.disabled = this.currentIndex === 0;
    nextBtn.disabled = this.currentIndex === this.images.length - 1;
    prevNav.disabled = this.currentIndex === 0;
    nextNav.disabled = this.currentIndex === this.images.length - 1;
    
    // Mettre à jour les styles
    [prevBtn, prevNav].forEach(btn => {
      if (btn.disabled) {
        btn.style.opacity = '0.3';
      } else {
        btn.style.opacity = '1';
      }
    });
    
    [nextBtn, nextNav].forEach(btn => {
      if (btn.disabled) {
        btn.style.opacity = '0.3';
      } else {
        btn.style.opacity = '1';
      }
    });
  }
}

// Initialiser la galerie
let projectGallery;

document.addEventListener('DOMContentLoaded', function() {
  projectGallery = new ProjectGallery();
  
  // Initialiser les galeries existantes
  initProjectGalleries();
  
  // Initialiser les images cliquables des fonctionnalités
  initClickableFeatureImages();
});

// Fonction pour initialiser les galeries de projets
function initProjectGalleries() {
  // Chercher toutes les galeries de projets
  const galleries = document.querySelectorAll('.project-gallery');
  
  galleries.forEach(gallery => {
    const items = gallery.querySelectorAll('.gallery-item');
    
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        const images = Array.from(items).map(img => ({
          src: img.querySelector('img').src,
          alt: img.querySelector('img').alt,
          title: img.querySelector('.gallery-item-title')?.textContent || ''
        }));
        
        projectGallery.open(images, index);
      });
    });
  });
}

// Fonction pour initialiser les images cliquables des fonctionnalités
function initClickableFeatureImages() {
  const clickableImages = document.querySelectorAll('.clickable-image');
  
  clickableImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      const imageData = {
        src: img.src,
        alt: img.alt,
        title: img.getAttribute('data-title') || img.alt
      };
      
      // Ouvrir le lightbox avec une seule image
      projectGallery.open([imageData], 0);
    });
  });
}

// Fonction utilitaire pour créer une galerie
function createProjectGallery(containerId, images) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  images.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="gallery-item-overlay">
        <div class="gallery-item-title">${image.title}</div>
        <div class="gallery-item-desc">${image.description || ''}</div>
      </div>
    `;
    
    item.addEventListener('click', () => {
      projectGallery.open(images, index);
    });
    
    container.appendChild(item);
  });
}

