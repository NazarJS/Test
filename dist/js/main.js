function initMemberSlider(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const track = slider.querySelector('.member-slider__track');
  const slides = slider.querySelectorAll('.member-slider__item');
  const prevBtn = slider.querySelector('.pagination__button--prev');
  const nextBtn = slider.querySelector('.pagination__button--next');
  const currentNum = slider.querySelector('.pagination__number--current');
  const totalNum = slider.querySelector('.pagination__number--total');

  let slideIndex = 0;
  let slidesPerView = 1;
  const gap = 30;
  const totalSlides = slides.length;

  if (totalNum) totalNum.textContent = ` / ${totalSlides}`;

  function updateSlidesPerView() {
    slidesPerView = window.innerWidth < 768 ? 1 : 3;
  }

  function updateSlider() {
    console.log(slideIndex)
    if (!slides.length) return;

    const slideWidth = slides[0].offsetWidth;
    const step = slideWidth + gap;
    const maxIndex = totalSlides - slidesPerView;

    // Круговая прокрутка
    
    if (slideIndex > maxIndex) slideIndex = 0;
  
    if (slideIndex < 0) slideIndex = maxIndex >= 0 ? maxIndex : 0;

    const moveX = step * slideIndex;
    track.style.transform = `translateX(${-moveX}px)`;
    track.style.transition = 'transform 0.4s ease';

    if (currentNum) {
      const visibleNumber = slidesPerView > 1
        ? Math.min(slideIndex + slidesPerView, totalSlides)
        : slideIndex + 1;
      currentNum.textContent = visibleNumber;
    }
  }

  function nextSlide() {
    slideIndex++;
    updateSlider();
  }

  function prevSlide() {
    slideIndex--;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    console.log(slideIndex)
    nextSlide();
    resetAutoplay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  let autoplay;

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
      slideIndex++;
      updateSlider();
    }, 4000);
  }

  window.addEventListener('resize', () => {
    updateSlidesPerView();
    updateSlider();
  });

  // Инициализация
  updateSlidesPerView();
  updateSlider();
  resetAutoplay();
}

// Инициализация слайдера после загрузки
window.addEventListener('DOMContentLoaded', () => {
  initMemberSlider('.member-slider');
});







document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.steps__grid');
    const slides = document.querySelectorAll('.steps__grid .slide');
    const prevBtn = document.querySelector('.pagination__button--prev');
    const nextBtn = document.querySelector('.pagination__button--next');
    const dotsContainer = document.querySelector('.pagination__counter');
    const gap = 20; // отступ между слайдами
    let currentIndex = 0;

    // Создание точек пагинации динамически
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('pagination__dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.pagination__dot');

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth; // ширина одного слайда
        slider.style.transform = `translateX(-${(slideWidth + gap) * currentIndex}px)`; // добавлен gap
        slider.style.transition = 'transform 0.4s ease';

        // Обновляем активную точку
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

        // Дезактивация кнопок при достижении конца/начала
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Обновление слайдера при ресайзе окна
    window.addEventListener('resize', updateSlider);

    // Инициализация
    updateSlider();
});


