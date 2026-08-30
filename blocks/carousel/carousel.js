export default function decorate(block) {
  const slides = [...block.children];

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer;

  // Create track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  // Move slides into track
  slides.forEach((slide, index) => {
    slide.classList.add('carousel-slide');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);

    track.append(slide);
  });

  block.append(track);

  // Previous button
  const previousButton = document.createElement('button');
  previousButton.className = 'carousel-previous';
  previousButton.type = 'button';
  previousButton.setAttribute('aria-label', 'Previous slide');
  previousButton.innerHTML = '&#10094;';

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '&#10095;';

  // Dots
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  block.append(previousButton, nextButton, dots);

  function getVisibleSlides() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function getMaxIndex() {
    return Math.max(
      0,
      slides.length - getVisibleSlides(),
    );
  }

  function createDots() {
    dots.innerHTML = '';

    const maxIndex = getMaxIndex();

    for (let i = 0; i <= maxIndex; i += 1) {
      const dot = document.createElement('button');

      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to position ${i + 1}`);

      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        restartAutoplay();
      });

      dots.append(dot);
    }
  }

  function updateCarousel() {
    const visibleSlides = getVisibleSlides();

    const slideWidth = 100 / visibleSlides;

    slides.forEach((slide) => {
      slide.style.flex = `0 0 ${slideWidth}%`;
    });

    track.style.transform =
      `translateX(-${currentIndex * slideWidth}%)`;

    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle(
        'active',
        index === currentIndex,
      );
    });
  }

  function nextSlide() {
    const maxIndex = getMaxIndex();

    currentIndex += 1;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  function previousSlide() {
    const maxIndex = getMaxIndex();

    currentIndex -= 1;

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    updateCarousel();
  }

  previousButton.addEventListener('click', () => {
    previousSlide();
    restartAutoplay();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    restartAutoplay();
  });

  // Autoplay
  function startAutoplay() {
    clearInterval(autoplayTimer);

    autoplayTimer = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  block.addEventListener('mouseenter', stopAutoplay);
  block.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', () => {
    currentIndex = Math.min(
      currentIndex,
      getMaxIndex(),
    );

    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
  startAutoplay();
}
