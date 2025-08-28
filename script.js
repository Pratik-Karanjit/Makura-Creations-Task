// Add interactivity for decorative elements
// Example: Animate the arrow
const decorativeArrow = document.querySelector('.decorative-arrow');
if (decorativeArrow) {
  decorativeArrow.style.animation = 'bounce 2s infinite';
}

// Mobile Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  
  // Toggle mobile navigation
  hamburgerToggle.addEventListener('click', function() {
    hamburgerToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  });
  
  // Close mobile navigation
  function closeMobileNav() {
    hamburgerToggle.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Close button
  mobileNavClose.addEventListener('click', closeMobileNav);
  
  // Close when clicking overlay
  mobileNavOverlay.addEventListener('click', function(e) {
    if (e.target === mobileNavOverlay) {
      closeMobileNav();
    }
  });
  
  // Close when clicking nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      closeMobileNav();
    }
  });
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('destinationsSlider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = document.querySelectorAll('.destination-card');
  
  let currentPosition = 0;
  let cardWidth = cards[0].offsetWidth + 24; // width + gap
  let visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
  let maxPosition = (cards.length - visibleCards) * cardWidth;
  
  // Initialize slider
  updateSlider();
  
  // Next slide
  nextBtn.addEventListener('click', function() {
    if (currentPosition > -maxPosition) {
      currentPosition -= cardWidth * visibleCards;
      if (currentPosition < -maxPosition) {
        currentPosition = -maxPosition;
      }
      updateSlider();
    }
  });
  
  // Previous slide
  prevBtn.addEventListener('click', function() {
    if (currentPosition < 0) {
      currentPosition += cardWidth * visibleCards;
      if (currentPosition > 0) {
        currentPosition = 0;
      }
      updateSlider();
    }
  });
  
  // Update slider position
  function updateSlider() {
    slider.style.transform = `translateX(${currentPosition}px)`;
    
    // Update button states
    prevBtn.style.opacity = currentPosition === 0 ? 0.5 : 1;
    prevBtn.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
    
    nextBtn.style.opacity = currentPosition <= -maxPosition ? 0.5 : 1;
    nextBtn.style.cursor = currentPosition <= -maxPosition ? 'default' : 'pointer';
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    cardWidth = cards[0].offsetWidth + 24;
    visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
    maxPosition = (cards.length - visibleCards) * cardWidth;
    
    // Adjust current position if needed
    if (currentPosition < -maxPosition) {
      currentPosition = -maxPosition;
    }
    
    updateSlider();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
});