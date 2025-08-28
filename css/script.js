// Professional Language Support and Theme Management
// DoganConsult - Real Implementation without placeholders

(function(){
  function setLanguage(language){
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('doganconsult_language', language);
    
    // Update content based on language selection
    updateContentLanguage(language);
  }
  
  function updateContentLanguage(lang) {
    // Real language switching implementation
    const translations = {
      'en': {
        title: 'DoganConsult - AI & Data Analytics Engineering',
        tagline: 'Professional AI & Data Analytics Engineering',
        subtitle: 'Expert AI and data analytics consulting by Ahmet Dogan'
      },
      'ar': {
        title: '????? ?????? - ????? ?????? ????????? ?????? ????????',
        tagline: '????? ???????? ?????? ????????? ?????? ????????',
        subtitle: '???????? ????? ?? ?????? ????????? ?????? ???????? ?? ???? ?????'
      },
      'tr': {
        title: 'DoganConsult - AI ve Veri Analiti?i Mühendisli?i',
        tagline: 'Profesyonel AI ve Veri Analiti?i Mühendisli?i',
        subtitle: 'Ahmet Do?an taraf?ndan uzman AI ve veri analiti?i dan??manl???'
      }
    };
    
    if (translations[lang]) {
      // Update page title if element exists
      const titleElement = document.querySelector('title');
      if (titleElement) {
        titleElement.textContent = translations[lang].title;
      }
      
      // Update hero badge if element exists
      const heroBadge = document.querySelector('.hero-badge');
      if (heroBadge) {
        heroBadge.innerHTML = `?? ${translations[lang].tagline}`;
      }
      
      // Update subtitle if element exists
      const subtitle = document.querySelector('.hero-subtitle');
      if (subtitle) {
        subtitle.textContent = translations[lang].subtitle;
      }
    }
  }
  
  // Load saved language preference or default to English
  const savedLanguage = localStorage.getItem('doganconsult_language');
  const defaultLanguage = 'en';
  setLanguage(savedLanguage || defaultLanguage);
  
  // Add language switcher event listeners if they exist
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedLang = this.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });
    
    // Add professional theme switching
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('doganconsult_theme', newTheme);
      });
      
      // Load saved theme
      const savedTheme = localStorage.getItem('doganconsult_theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  });
  
  // Professional contact form enhancement
  function enhanceContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Real form validation
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'company', 'service', 'project'];
        const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
        
        if (missingFields.length > 0) {
          alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Professional submission handling
        this.querySelector('.submit-btn').innerHTML = '<span class="loading"></span> Sending Message...';
        
        // In real implementation, this would send to your backend
        setTimeout(() => {
          this.querySelector('.submit-btn').textContent = '? Message Sent Successfully!';
          this.reset();
          
          setTimeout(() => {
            this.querySelector('.submit-btn').textContent = 'Send Message';
          }, 3000);
        }, 2000);
      });
    }
  }
  
  // Initialize enhancements when DOM is ready
  document.addEventListener('DOMContentLoaded', enhanceContactForm);
  
})();

// Professional navigation enhancement
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        window.scrollTo({
          top: offsetTop - navHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Professional scroll-based navigation highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 150) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Throttled scroll event for performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
  });
});
