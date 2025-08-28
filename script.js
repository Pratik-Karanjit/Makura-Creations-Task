const decorativeArrow = document.querySelector('.decorative-arrow');
if (decorativeArrow) {
  decorativeArrow.style.animation = 'bounce 2s infinite';
}

document.addEventListener('DOMContentLoaded', function() {
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  
  hamburgerToggle.addEventListener('click', function() {
    hamburgerToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = 'hidden';
  });
  
  function closeMobileNav() {
    hamburgerToggle.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = ''; 
  }
  
  mobileNavClose.addEventListener('click', closeMobileNav);
  
  mobileNavOverlay.addEventListener('click', function(e) {
    if (e.target === mobileNavOverlay) {
      closeMobileNav();
    }
  });
  
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      closeMobileNav();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('destinationsSlider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cards = document.querySelectorAll('.destination-card');
  
  let currentPosition = 0;
  let cardWidth = cards[0].offsetWidth + 24; // width + gap
  let visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
  let maxPosition = (cards.length - visibleCards) * cardWidth;
  
  updateSlider();
  
  nextBtn.addEventListener('click', function() {
    if (currentPosition > -maxPosition) {
      currentPosition -= cardWidth * visibleCards;
      if (currentPosition < -maxPosition) {
        currentPosition = -maxPosition;
      }
      updateSlider();
    }
  });
  
  prevBtn.addEventListener('click', function() {
    if (currentPosition < 0) {
      currentPosition += cardWidth * visibleCards;
      if (currentPosition > 0) {
        currentPosition = 0;
      }
      updateSlider();
    }
  });
  
  function updateSlider() {
    slider.style.transform = `translateX(${currentPosition}px)`;
    
    prevBtn.style.opacity = currentPosition === 0 ? 0.5 : 1;
    prevBtn.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
    
    nextBtn.style.opacity = currentPosition <= -maxPosition ? 0.5 : 1;
    nextBtn.style.cursor = currentPosition <= -maxPosition ? 'default' : 'pointer';
  }
  
  window.addEventListener('resize', function() {
    cardWidth = cards[0].offsetWidth + 24;
    visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
    maxPosition = (cards.length - visibleCards) * cardWidth;
    
    if (currentPosition < -maxPosition) {
      currentPosition = -maxPosition;
    }
    
    updateSlider();
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
});