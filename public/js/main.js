document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Mobile menu toggle
  initMobileMenu();
  
  // Contact form handling
  initContactForm();
  
  // Scroll animations
  initScrollAnimations();
  
  // CV download
  document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    alert('CV download functionality would be implemented here.');
  });
  
  // Fetch profile data from API
  fetchProfileData();
});

// Theme toggle functionality
function initTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
  } else {
    document.body.setAttribute('data-theme', 'light');
  }
  
  themeSwitch.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  let isMenuOpen = false;
  
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      if (!isMenuOpen) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
          <div class="mobile-menu-container">
            <div class="mobile-menu-header">
              <div class="logo">EK</div>
              <button class="close-menu">
                <i data-feather="x"></i>
              </button>
            </div>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        `;
        
        document.body.appendChild(mobileMenu);
        feather.replace();
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
          .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            display: flex;
            justify-content: flex-end;
          }
          
          .mobile-menu-container {
            width: 80%;
            max-width: 300px;
            height: 100%;
            background-color: var(--card-bg);
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            padding: var(--space-6);
            animation: slideIn 0.3s ease forwards;
          }
          
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--space-6);
          }
          
          .close-menu {
            background: transparent;
            border: none;
            color: var(--text-color);
            cursor: pointer;
          }
          
          .mobile-menu ul {
            list-style: none;
          }
          
          .mobile-menu ul li {
            margin-bottom: var(--space-4);
          }
          
          .mobile-menu ul li a {
            color: var(--text-color);
            font-size: 1.2rem;
            font-weight: 500;
          }
        `;
        
        document.head.appendChild(style);
        
        // Close menu on click
        document.querySelector('.close-menu').addEventListener('click', closeMenu);
        document.querySelectorAll('.mobile-menu ul li a').forEach(link => {
          link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
          if (e.target === mobileMenu) {
            closeMenu();
          }
        });
        
        isMenuOpen = true;
      }
    });
    
    function closeMenu() {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.style.opacity = '0';
        setTimeout(() => {
          mobileMenu.remove();
          isMenuOpen = false;
        }, 300);
      }
    }
  }
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Here you would typically send the data to your server
      // For demo purposes, we'll just show a success message
      
      // Display success message
      contactForm.innerHTML = `
        <div class="success-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out, ${formData.name}. I'll get back to you as soon as possible!</p>
        </div>
      `;
      
      // Add success message styles
      const style = document.createElement('style');
      style.textContent = `
        .success-message {
          text-align: center;
          padding: var(--space-8) 0;
        }
        
        .success-message svg {
          color: var(--success-500);
          width: 64px;
          height: 64px;
          margin-bottom: var(--space-4);
        }
      `;
      
      document.head.appendChild(style);
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.skill-card, .timeline-content, .stat');
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    elements.forEach(element => {
      element.classList.add('animate-fade-in');
    });
  }
}

// Fetch profile data from API
function fetchProfileData() {
  fetch('/api/profile')
    .then(response => response.json())
    .then(data => {
      // You could use this data to dynamically update parts of the page
      console.log('Profile data loaded:', data);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
}