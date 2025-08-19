document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slide-dots span');
  
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Auto-advance slides
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  const slider = document.querySelector('.hero-slider');
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Initialize
  updateSlides();
});
// Bestsellers Slider (same functionality as hero slider)
const bestsellersSlides = document.querySelectorAll('.bestsellers-slide');
const bestsellersDotsContainer = document.querySelector('.bestsellers-dots');
const bestsellersPrevBtn = document.querySelector('.bestsellers-prev');
const bestsellersNextBtn = document.querySelector('.bestsellers-next');
let currentBestsellersSlide = 0;

// Create dots for bestsellers
bestsellersSlides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToBestsellersSlide(index));
  bestsellersDotsContainer.appendChild(dot);
});

const bestsellersDots = document.querySelectorAll('.bestsellers-dots span');

function updateBestsellersSlides() {
  bestsellersSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentBestsellersSlide);
  });
  
  bestsellersDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentBestsellersSlide);
  });
}

function goToBestsellersSlide(index) {
  currentBestsellersSlide = index;
  updateBestsellersSlides();
}

function nextBestsellersSlide() {
  currentBestsellersSlide = (currentBestsellersSlide + 1) % bestsellersSlides.length;
  updateBestsellersSlides();
}

function prevBestsellersSlide() {
  currentBestsellersSlide = (currentBestsellersSlide - 1 + bestsellersSlides.length) % bestsellersSlides.length;
  updateBestsellersSlides();
}

bestsellersNextBtn.addEventListener('click', nextBestsellersSlide);
bestsellersPrevBtn.addEventListener('click', prevBestsellersSlide);

// Auto-advance bestsellers slides
let bestsellersSlideInterval = setInterval(nextBestsellersSlide, 5000);

// Pause on hover
const bestsellersSlider = document.querySelector('.bestsellers-slider');
bestsellersSlider.addEventListener('mouseenter', () => clearInterval(bestsellersSlideInterval));
bestsellersSlider.addEventListener('mouseleave', () => {
  bestsellersSlideInterval = setInterval(nextBestsellersSlide, 5000);
});

// Initialize
updateBestsellersSlides();

// Quantity Controls Functionality
document.querySelectorAll('.quantity-btn').forEach(button => {
  button.addEventListener('click', function() {
    const input = this.parentElement.querySelector('.quantity-input');
    let value = parseInt(input.value);
    
    if (this.classList.contains('plus')) {
      value = isNaN(value) ? 1 : Math.min(value + 1, 10);
    } else if (this.classList.contains('minus')) {
      value = isNaN(value) ? 1 : Math.max(value - 1, 1);
    }
    
    input.value = value;
  });
});

// Add to Cart 
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const quantity = parseInt(productCard.querySelector('.quantity-input').value);
    const price = productCard.querySelector('.current-price').textContent;
    
    console.log(`Added ${quantity} ${productName} to cart at ${price} each`);
    alert(`Added ${quantity} ${productName} to cart!`);
  });
});
document.querySelectorAll('.productvideo').forEach(video => {
  video.muted = true; // Mute the video for autoplay
  video.playsInline = true; // Ensure it plays inline on mobile devices
  video.play().catch(error => {
    console.log('Video autoplay prevented:', error);
    const playButton = document.createElement('div');
    playButton.className = 'video-play-overlay';
    playButton.innerHTML = '▶';
    video.parentElement.appendChild(playButton);
    
    playButton.addEventListener('click', () => {
      video.play();
      playButton.style.display = 'none';
    });
  });
});