// DOM Elements its me villan 😂
const navbar = document.querySelector('.navbar');
const menuToggleBtn = document.querySelector('.menu-toggle-btn');
const mainNav = document.querySelector('.main-nav');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelectorAll('.main-nav .nav-link');
const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');
const contactForm = document.getElementById('contact-form');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Intersection Observer for animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach((el) => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle menu function
function toggleMenu(show) {
  if (show) {
    mainNav.classList.add('active');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    mainNav.classList.remove('active');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Allow scrolling again
  }
}

// Menu toggle button click
menuToggleBtn.addEventListener('click', () => {
  const isMenuActive = mainNav.classList.contains('active');
  toggleMenu(!isMenuActive);
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 59 * 16) { // 59em
      toggleMenu(false);
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mainNav.classList.contains('active') && 
      !mainNav.contains(e.target) && 
      !menuToggleBtn.contains(e.target)) {
    toggleMenu(false);
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 59 * 16) { // 59em
    toggleMenu(false);
  }
});

// Testimonials slider
let currentSlide = 0;
const totalSlides = testimonialDots.length;

function goToSlide(slideIndex) {
  testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
  
  // Update active dot
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === slideIndex);
  });
  
  currentSlide = slideIndex;
}

// Next and previous buttons
nextBtn.addEventListener('click', () => {
  goToSlide((currentSlide + 1) % totalSlides);
});

prevBtn.addEventListener('click', () => {
  goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
});

// Dot navigation
testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

// Auto-rotate testimonials
setInterval(() => {
  goToSlide((currentSlide + 1) % totalSlides);
}, 8000);

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    phone: contactForm.phone.value,
    findUs: contactForm.findUs.value,
    message: contactForm.message.value,
    newsletter: contactForm.newsletter.checked
  };
  
  // In a real app, you would send this data to your server
  console.log('Form submitted:', formData);
  
  // Show success message
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <h3>Message Sent!</h3>
      <p>Thank you for contacting us. We'll get back to you soon.</p>
    </div>
  `;
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
  
  // Reset form
  contactForm.reset();
});

// Add toast styles
const style = document.createElement('style');
style.textContent = `
  .toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    padding: 1.6rem;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 32rem;
  }
  
  .toast-content h3 {
    margin-bottom: 0.8rem;
    color: var(--gray-dark);
  }
  
  .toast.hide {
    animation: slideOut 0.3s ease forwards;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});