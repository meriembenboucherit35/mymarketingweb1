document.addEventListener('DOMContentLoaded', function() {
  // Cart management functions
  function addToCart(productName, productPrice, productImage, quantity) {
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
      // Update quantity if product exists
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update all cart count elements
    document.querySelectorAll('.cart-count').forEach(element => {
      element.textContent = totalItems;
    });
  }
  
  // Initialize cart count
  updateCartCount();
  
  // Hero slider functionality
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slide-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  if (slides.length > 0 && dotsContainer) {
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
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
      slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    
    // Initialize
    updateSlides();
  }

  // Bestsellers Slider
  const bestsellersSlides = document.querySelectorAll('.bestsellers-slide');
  const bestsellersDotsContainer = document.querySelector('.bestsellers-dots');
  const bestsellersPrevBtn = document.querySelector('.bestsellers-prev');
  const bestsellersNextBtn = document.querySelector('.bestsellers-next');
  
  if (bestsellersSlides.length > 0 && bestsellersDotsContainer) {
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

    if (bestsellersNextBtn) bestsellersNextBtn.addEventListener('click', nextBestsellersSlide);
    if (bestsellersPrevBtn) bestsellersPrevBtn.addEventListener('click', prevBestsellersSlide);

    // Auto-advance bestsellers slides
    let bestsellersSlideInterval = setInterval(nextBestsellersSlide, 5000);

    // Pause on hover
    const bestsellersSlider = document.querySelector('.bestsellers-slider');
    if (bestsellersSlider) {
      bestsellersSlider.addEventListener('mouseenter', () => clearInterval(bestsellersSlideInterval));
      bestsellersSlider.addEventListener('mouseleave', () => {
        bestsellersSlideInterval = setInterval(nextBestsellersSlide, 5000);
      });
    }

    // Initialize
    updateBestsellersSlides();
  }

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

  // Video autoplay handling
  document.querySelectorAll('.productvideo').forEach(video => {
    video.muted = true;
    video.playsInline = true;
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
  
  // Add to Cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Get product image or video source
      let productImage = '';
      const imgElement = productCard.querySelector('img');
      const videoElement = productCard.querySelector('video');
      
      if (imgElement) {
        productImage = imgElement.src;
      } else if (videoElement) {
        productImage = videoElement.poster || ''; // Use poster if available
      }
      
      const quantity = parseInt(productCard.querySelector('.quantity-input').value);
      
      // Show notification
      const notification = document.getElementById('cartNotification');
      if (notification) {
        notification.textContent = `${quantity} ${productName} added to cart!`;
        notification.classList.add('show');
      }
      
      // Add product to cart
      addToCart(productName, productPrice, productImage, quantity);
      
      // Hide notification after 2 seconds and redirect to cart page
      setTimeout(() => {
        if (notification) {
          notification.classList.remove('show');
        }
        
        // Redirect to cart page
        window.location.href = 'cart.html';
      }, 2000);
    });
  });
  
  // Newsletter form handling
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const messageDiv = document.getElementById('subscribeMsg');
      
      if (emailInput && messageDiv) {
        messageDiv.textContent = `Thank you for subscribing with ${emailInput.value}!`;
        emailInput.value = '';
        
        setTimeout(() => {
          messageDiv.textContent = '';
        }, 3000);
      }
    });
  }
});