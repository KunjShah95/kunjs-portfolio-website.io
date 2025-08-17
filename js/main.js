// Modern Portfolio JavaScript

function initAnimations() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

  // Text reveal animation for hero title
  const textRevealElement = document.querySelector('.text-reveal');
  if (textRevealElement) {
    const text = textRevealElement.textContent;
    textRevealElement.innerHTML = ''; // Clear the original text
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.innerHTML = '&nbsp;'; // Use non-breaking space for spaces
      } else {
        span.textContent = char;
      }
      span.style.animationDelay = `${index * 0.05}s`;
      textRevealElement.appendChild(span);
    });
  }

  // Typing animation for hero section
  const typingElements = document.querySelectorAll('.typing-text');
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
  });
}

function initPageTransitions() {
  barba.init({
    transitions: [{
      name: 'slide-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          x: '-100%',
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          x: '100%',
          opacity: 0,
          duration: 0.5
        });
      }
<<<<<<< feature/eye-catchy-hero
    }
  }

  // Utility functions
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Skills animation
  function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const percentage = skillBar.getAttribute('data-percentage');
          const progressBar = skillBar.querySelector('.progress');

          if (progressBar) {
            progressBar.style.width = percentage + '%';
          }
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillsObserver.observe(bar));
  }

  // Counter animation for stats
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Initialize additional animations
  document.addEventListener('DOMContentLoaded', function () {
    initSkillsAnimation();
    initCounterAnimation();
    initSwiper();
    }]
  });

  barba.hooks.after(() => {
    initAnimations();
  });
}

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

  // Form submission with validation and animation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      // Form submission animation and success message
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';

      // Simulate form submission (in a real scenario, you would send data to a server)
      setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = '<svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Sent Successfully!';

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }, 3000);
      }, 2000);
    });
  }

  // Custom cursor effect (optional)
  const createCustomCursor = () => {
    const cursor = document.createElement('div');
    const cursorBorder = document.createElement('div');

    cursor.classList.add('custom-cursor');
    cursorBorder.classList.add('cursor-border');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorBorder);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      cursorBorder.style.left = `${e.clientX}px`;
      cursorBorder.style.top = `${e.clientY}px`;
    });

    // Add hover effects for interactive elements
    document.querySelectorAll('a, button, .filter-btn, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorBorder.classList.add('border-hover');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorBorder.classList.remove('border-hover');
      });
    });
  };

  // Only enable custom cursor on desktop
  if (window.innerWidth > 768) {
    createCustomCursor();
  }

  // Add CSS to handle the 3D flipping effect for skill cards
  const addFlipStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .perspective { perspective: 1500px; }
      .preserve-3d { transform-style: preserve-3d; }
      .backface-hidden { backface-visibility: hidden; }
      .rotate-y-180 { transform: rotateY(180deg); }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: rgba(0, 219, 222, 0.5);
        mix-blend-mode: exclusion;
      }

      .border-hover {
        transform: translate(-50%, -50%) scale(1.2);
        border-color: rgba(0, 219, 222, 0.5);
      }
    `;
    document.head.appendChild(style);
  };

  addFlipStyles();

  // Intersection Observer for revealing elements on scroll
  const setupIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(element);
    });
  };

  setupIntersectionObserver();

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Enable custom animations
  const customAnimations = () => {
    // Animate hero background elements
    document.querySelectorAll('.animated-bg-element').forEach(el => {
      el.classList.add('animate-float');
    });
  };

  customAnimations();
});

function initSwiper() {
  const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// Preloader animation
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('preloader-hidden');

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }
document.addEventListener('DOMContentLoaded', function () {
  initAnimations();
  initPageTransitions();
  initParallax();
  initSwiper();
});
