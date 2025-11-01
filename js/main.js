// Modern Portfolio JavaScript

// Add smooth scrolling functionality
function initSmoothScrolling() {
  // Add smooth scrolling for all navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
          document.body.style.overflow = '';
          const hamburgerIcon = document.querySelector('.hamburger-icon');
          if (hamburgerIcon) hamburgerIcon.classList.remove('open');
        }
      }
    });
  });
}

// Add insights loading functionality
function initInsightsLoading() {
  const loadMoreBtn = document.getElementById('load-more-insights');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      // Simulate loading more insights
      this.textContent = 'Loading...';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = 'More insights coming soon!';
        setTimeout(() => {
          this.textContent = 'Load More Insights';
          this.disabled = false;
        }, 2000);
      }, 1000);
    });
  }
}

// Add click analytics and user feedback
function addButtonFeedback() {
  const buttons = document.querySelectorAll('button, .btn, a[role="button"]');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

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

document.addEventListener('DOMContentLoaded', function () {
  initSmoothScrolling();
  initAnimations();
  initParallax();
  addButtonFeedback();

  // Fix all navigation functionality
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  console.log('Navigation elements found:', {
    mobileMenuButton: !!mobileMenuButton,
    menuToggle: !!menuToggle,
    mobileMenu: !!mobileMenu,
    hamburgerIcon: !!hamburgerIcon
  });

  // Enhanced mobile menu toggle
  const toggleMobileMenu = () => {
    if (mobileMenu) {
      const isHidden = mobileMenu.classList.contains('hidden');

      if (isHidden) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (hamburgerIcon) hamburgerIcon.classList.add('open');
      } else {
        // Hide menu
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        document.body.style.overflow = '';
        if (hamburgerIcon) hamburgerIcon.classList.remove('open');
      }
    }
  };

  // Add click listeners to mobile menu button
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Enhanced smooth scrolling for all navigation links
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }

      // Smooth scroll to target
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Apply click handlers to all navigation links
  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', handleNavClick);
    link.style.cursor = 'pointer';
    link.style.pointerEvents = 'auto';
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton?.contains(e.target) && !menuToggle?.contains(e.target)) {
        toggleMobileMenu();
      }
    }
  });

  // Enhanced scroll effects for navbar
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Change navbar background on scroll
    if (navbar) {
      if (scrollTop > 100) {
        navbar.classList.add('bg-neutral-950/95');
        navbar.classList.remove('bg-neutral-950/90');
      } else {
        navbar.classList.add('bg-neutral-950/90');
        navbar.classList.remove('bg-neutral-950/95');
      }
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = scrollTop + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        [...navLinks, ...mobileNavLinks].forEach(link => {
          link.classList.remove('text-primary-400');
        });

        // Add active class to current section links
        const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
        activeLinks.forEach(link => {
          link.classList.add('text-primary-400');
        });
      }
    });

    lastScrollTop = scrollTop;
  });

  // Enhanced mobile interactions
  const addTouchFeedback = (element) => {
    element.addEventListener('touchstart', function () {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });

    element.addEventListener('touchend', function () {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
  };

  // Apply touch feedback to interactive elements
  document.querySelectorAll('.filter-btn, .action-btn, .project-card, .nav-link, .mobile-nav-link').forEach(addTouchFeedback);

  // Improve viewport handling for mobile
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  }

  // Optimize images for mobile
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  });

  // Add mobile-specific classes based on screen size
  const updateMobileClasses = () => {
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile-view', isMobile);
  };

  updateMobileClasses();
  window.addEventListener('resize', updateMobileClasses);

  // Enhanced mobile-optimized chatbot functionality
  const botpressBtn = document.getElementById('botpress-toggle-btn');
  const botpressIframe = document.getElementById('botpress-chatbot-iframe');
  let botpressOpen = false;

  if (botpressBtn && botpressIframe) {
    botpressBtn.onclick = function () {
      botpressOpen = !botpressOpen;

      if (botpressOpen) {
        botpressIframe.style.visibility = 'visible';
        botpressIframe.style.opacity = '1';
        botpressIframe.style.pointerEvents = 'auto';
        botpressBtn.innerText = '✖';
        botpressBtn.setAttribute('aria-label', 'Close chat');
        botpressBtn.style.transform = 'scale(1.1)';

        // Prevent background scroll on mobile when chat is open
        if (window.innerWidth <= 768) {
          document.body.style.overflow = 'hidden';
        }
      } else {
        botpressIframe.style.visibility = 'hidden';
        botpressIframe.style.opacity = '0';
        botpressIframe.style.pointerEvents = 'none';
        botpressBtn.innerText = '💬';
        botpressBtn.setAttribute('aria-label', 'Open chat');
        botpressBtn.style.transform = 'scale(1)';

        // Restore scroll on mobile
        document.body.style.overflow = '';
      }
    };

    // Close chatbot when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (botpressOpen && window.innerWidth <= 768) {
        const container = document.getElementById('botpress-chatbot-container');
        if (container && !container.contains(e.target)) {
          botpressBtn.click();
        }
      }
    });

    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', function () {
      if (botpressOpen && window.innerWidth <= 768) {
        setTimeout(() => {
          // Adjust iframe size after orientation change
          const iframe = document.getElementById('botpress-chatbot-iframe');
          if (iframe) iframe.style.height = 'calc(100vh - 80px)';
        }, 500);
      }
    });

    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      botpressBtn.addEventListener('click', () => {
        navigator.vibrate(50);
      });
    }
  } else {
    // Chatbot UI not present on this page
    // console.debug('Chatbot elements not found');
  }
});
// Project Filter Functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.tech-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length === 0 || projectItems.length === 0) {
    return; // Exit if elements not found
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-primary-500', 'text-white');
        btn.classList.add('bg-neutral-800', 'text-gray-300');
      });
      this.classList.remove('bg-neutral-800', 'text-gray-300');
      this.classList.add('active', 'bg-primary-500', 'text-white');
      
      // Filter projects
      projectItems.forEach(project => {
        const projectCategories = project.getAttribute('data-category') || '';
        
        if (category === 'all') {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
          }, 10);
        } else if (projectCategories.includes(category)) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
          }, 10);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'scale(0.9)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize project filters when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectFilters);
} else {
  initProjectFilters();
}
