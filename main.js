document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initAnimatedCounters();
  initNewsFilters();
  initFormValidation();
  initGalleryFilters();
  initProgressBars();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

function initMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.floor(target * progress);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

function initNewsFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function openModal(element) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const img = element.querySelector('img');

  modal.classList.add('active');
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openNewsModal(button) {
  const newsCard = button.closest('.news-card');
  const title = newsCard.querySelector('h3').textContent;
  const date = newsCard.querySelector('.news-date').textContent;
  const description = newsCard.querySelector('p:not(.news-date)').textContent;

  const newsModal = document.getElementById('newsModal');
  const newsModalContent = document.getElementById('newsModalContent');

  const fullContent = `
    <h2>${title}</h2>
    <p style="color: #F4B400; font-weight: 600; margin-bottom: 20px;">${date}</p>
    <p style="line-height: 1.8; color: #555;">${description}</p>
    <p style="line-height: 1.8; color: #555; margin-top: 15px;">
      This initiative represents our commitment to creating meaningful change in our community. We believe in working collaboratively with residents, local organizations, and government agencies to address the challenges facing our neighborhoods and build a stronger future for all.
    </p>
  `;

  newsModalContent.innerHTML = fullContent;
  newsModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
  const newsModal = document.getElementById('newsModal');
  newsModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function initFormValidation() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit(e);
  });

  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });
}

function validateField(field) {
  const fieldType = field.getAttribute('type') || field.tagName.toLowerCase();
  let isValid = true;
  let errorMsg = '';

  if (field.value.trim() === '') {
    isValid = false;
    errorMsg = 'This field is required';
  } else if (fieldType === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email';
    }
  } else if (fieldType === 'tel') {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMsg = 'Please enter a valid phone number';
    }
  }

  const errorElement = document.getElementById(field.id + 'Error');
  if (errorElement) {
    errorElement.textContent = errorMsg;
  }

  field.style.borderColor = isValid ? '#ddd' : '#dc3545';

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  let isFormValid = true;

  [nameInput, emailInput, phoneInput, messageInput].forEach(field => {
    if (!validateField(field)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) return;

  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    message: messageInput.value,
    timestamp: new Date().toISOString()
  };

  console.log('Form submitted with data:', formData);

  const successMsg = document.getElementById('successMsg');
  successMsg.style.display = 'block';

  form.style.opacity = '0.5';
  form.style.pointerEvents = 'none';

  setTimeout(() => {
    form.reset();
    form.style.opacity = '1';
    form.style.pointerEvents = 'auto';

    const errorElements = form.querySelectorAll('.error-msg');
    errorElements.forEach(el => el.textContent = '');

    const inputElements = form.querySelectorAll('input, textarea');
    inputElements.forEach(el => el.style.borderColor = '#ddd');

    successMsg.style.display = 'none';

    nameInput.focus();
  }, 3000);
}

if (document.getElementById('imageModal')) {
  document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
}

if (document.getElementById('newsModal')) {
  document.getElementById('newsModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeNewsModal();
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeNewsModal();
  }
});

// Gallery Filters
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Progress Bar Animation
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  if (progressBars.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = progress + '%';
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}
