// Animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });

    // Smooth scroll for buttons
    document.querySelectorAll('.btn-reserve, .btn-menu').forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(button.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const nav = document.querySelector('.glass-nav');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Burger menu toggle
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Parallax
    if (typeof simpleParallax !== 'undefined') {
        new simpleParallax(document.querySelectorAll('.hero, .ambiance-img img, .gallery-item img'), {
            scale: 1.1,
            delay: 0.6,
            transition: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
    }
    
// Filtrage du menu amélioré
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retire la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajoute la classe active au bouton cliqué
        button.classList.add('active');
        
        // Filtre les éléments du menu
        const filterValue = button.dataset.filter;
        
        menuItems.forEach(item => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'flex';
                item.classList.add('animate-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('animate-in');
            }
        });
        
        // Affiche les catégories pertinentes
        document.querySelectorAll('.menu-category').forEach(category => {
            const categoryItems = category.querySelectorAll('.menu-item');
            const visibleItems = Array.from(categoryItems).filter(item => 
                window.getComputedStyle(item).display !== 'none'
            );
            
            if (filterValue === 'all' || visibleItems.length > 0) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-full-menu');
  btn.addEventListener('click', () => {
    // Remplace 'assets/menu-complet.pdf' par le chemin réel de ton PDF
    window.open('assets/menu-complet.pdf', '_blank');
  });
});
// Animation des cartes de fournisseurs
const supplierCards = document.querySelectorAll('.supplier-card');
supplierCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Lightbox pour la galerie
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const caption = item.querySelector('.gallery-caption').textContent;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgSrc}" alt="${caption}">
                <p>${caption}</p>
                <button class="close-lightbox"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.classList.add('no-scroll');
        
        // Fermeture de la lightbox
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.classList.remove('no-scroll');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.classList.remove('no-scroll');
            }
        });
    });
});

// Ajout du CSS pour la lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox img {
        max-height: 80vh;
        max-width: 100%;
        border-radius: 8px;
    }
    
    .lightbox p {
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 1.2rem;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;
document.head.appendChild(lightboxStyle);
    
    // Reservation form validation
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                    
                    // Remove error class after animation
                    setTimeout(() => {
                        field.classList.remove('error');
                    }, 1000);
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.textContent = 'Réservation envoyée !';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = 'Confirmer la réservation';
                    submitButton.style.backgroundColor = '';
                }, 3000);
            } else {
                // Show error message
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // Intersection Observer for animations
    const animateOnScroll = (elements, animationClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                }
            });
        }, { threshold: 0.2 });
        
        elements.forEach(el => observer.observe(el));
    };
    
    // Animate sections
    animateOnScroll(document.querySelectorAll('section'), 'animate-in');
    
    // Animate menu items
    animateOnScroll(document.querySelectorAll('.menu-item, .gallery-item, .ambiance-item'), 'animate-in');
    
    // Hero title animation
// Animation des lignes du titre Roma Nostra
const heroTitleLines = document.querySelectorAll('.title-line');
if (heroTitleLines.length) {
  heroTitleLines.forEach((line, lineIndex) => {
    // On récupère le texte initial
    const text = line.textContent;
    line.textContent = '';

    // Pour chaque caractère, on crée un span
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `all 0.5s ease ${(lineIndex * 0.3) + (i * 0.05)}s`;
      line.appendChild(span);

      // Animation
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 700);
    });
  });
}
