// Enhanced interactivity for the precedent study website
// (Print/Save as PDF button and related code removed)
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('.section');
  const navLinksArray = Array.from(navLinks);

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksArray.forEach(link => link.classList.remove('active'));
        navLinksArray[index]?.classList.add('active');
      }
    });
  }

  // Add scroll event listener
  window.addEventListener('scroll', updateActiveLink);

  // Add active class to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe sections and cards for animation
  const animatedElements = document.querySelectorAll('.section, .data-card, .analysis-card, .submission-card');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.data-card, .analysis-card, .submission-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});

// Add CSS for new interactive elements
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: #2563eb !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
  
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
