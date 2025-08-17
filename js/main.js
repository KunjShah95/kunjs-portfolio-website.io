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

document.addEventListener('DOMContentLoaded', function () {
  initAnimations();
  initPageTransitions();
  initParallax();
  initSwiper();
});