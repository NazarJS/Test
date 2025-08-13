// window.addEventListener("resize", function () {
//     let viewportWidth = document.documentElement.clientWidth;
//     if (viewportWidth > 1024) {
//         document.querySelector(".header__container").classList.remove("mobile-menu");
//     }
// });

// const orderSelect = document.querySelector(".main-form-order-select");
// if (orderSelect) {
//     orderSelect.addEventListener("click", function () {
//         this.classList.toggle("main-form-order-select--open");
//     });
// }

// const burger = document.getElementById("burger");
// if (burger) {
//     burger.addEventListener("click", function () {
//         document.querySelector(".header__container").classList.toggle("mobile-menu");
//         document.body.classList.toggle("no_scroll");
//     });
// }

// const rangeInput = document.querySelector(".main-form-order-range__input");
// const valueSpan = document.querySelector(".main-form-order-range__value");

// if (rangeInput && valueSpan) {
//     rangeInput.addEventListener("input", function () {
//         valueSpan.textContent = `${this.value}%`;
//     });
//     valueSpan.textContent = `${rangeInput.value}%`;
// }

// const dropdown = document.querySelector(".main-form-order-select__dropdown");
// const input = document.querySelector(".main-form-order-select__input");
// const textSpan = document.querySelector(".main-form-order-select__txt");
// const elements = document.querySelectorAll(".main-form-order__element");

// if (dropdown && input && textSpan && elements.length > 0) {
//     elements.forEach(element => {
//         element.addEventListener("click", function () {
//             const selectedText = this.textContent;
//             input.value = selectedText;
//             textSpan.textContent = selectedText;
//         });
//     });
// }
const track = document.querySelector('.member-slider__track');
const slides = document.querySelectorAll('.member-slider__item');
const prevBtn = document.querySelector('.pagination__button--prev');
const nextBtn = document.querySelector('.pagination__button--next');
const currentNum = document.querySelector('.pagination__number--current');
const totalNum = document.querySelector('.pagination__number--total');

let slideIndex = 0;
let slidesPerView;
const totalSlides = slides.length;
const gap = 30; // px gap между карточками

totalNum.textContent = ` / ${totalSlides}`;

function updateSlidesPerView() {
  slidesPerView = window.innerWidth < 768 ? 1 : 3;
}

function updateSlider() {
  if (!slides.length) return;

  const slideWidth = slides[0].offsetWidth;
  const step = slideWidth + gap;
  const maxIndex = totalSlides - slidesPerView;

  // Коррекция индекса в пределах допустимых значений
  if (slideIndex < 0) slideIndex = maxIndex >= 0 ? maxIndex : 0;
  if (slideIndex > maxIndex) slideIndex = 0;

  const moveX = step * slideIndex;
  track.style.transform = `translateX(${-moveX}px)`;

  // Для пагинации: показываем номер последнего видимого слайда (для десктопа)
  const visibleNumber = slidesPerView > 1
    ? Math.min(slideIndex + slidesPerView, totalSlides)
    : slideIndex + 1;

  currentNum.textContent = visibleNumber;
}

function nextSlide() {
  slideIndex++;
  updateSlider();
}

function prevSlide() {
  slideIndex--;
  updateSlider();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoplay();
});

prevBtn.addEventListener('click', () => {
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
  slideIndex = 0;
  updateSlider();
});

// Запускаем инициализацию после полной загрузки, чтобы размеры были корректны
window.addEventListener('load', () => {
  updateSlidesPerView();
  updateSlider();
  resetAutoplay();
});









// document.addEventListener('DOMContentLoaded', () => {
//   const grid = document.querySelector('.steps__grid');
//   const items = document.querySelectorAll('.steps-item');
//   const pagination = document.querySelector('.steps__pagination');

//   let currentIndex = 0;
//   let slidesPerView = 2;
//   let totalSlides = Math.ceil(items.length / slidesPerView);

//   function createPagination() {
//     pagination.innerHTML = '';
//     for (let i = 0; i < totalSlides; i++) {
//       const btn = document.createElement('button');
//       if (i === 0) btn.classList.add('active');
//       btn.addEventListener('click', () => {
//         currentIndex = i;
//         updateSlider();
//         updatePagination();
//       });
//       pagination.appendChild(btn);
//     }
//   }

//   function updateSlider() {
//     const style = window.getComputedStyle(items[0]);
//     const width = items[0].offsetWidth;
//     const marginRight = parseInt(style.marginRight) || 0;
//     const slideWidth = width + marginRight;

//     const moveX = slideWidth * slidesPerView * currentIndex;
//     grid.style.transform = `translateX(-${moveX}px)`;
//   }

//   function updatePagination() {
//     const dots = pagination.querySelectorAll('button');
//     dots.forEach((dot, i) => {
//       dot.classList.toggle('active', i === currentIndex);
//     });
//   }

//   function checkResize() {
//     if (window.innerWidth <= 1024) {
//       slidesPerView = 2;
//       totalSlides = Math.ceil(items.length / slidesPerView);
//       createPagination();
//       currentIndex = 0;
//       updateSlider();
//       pagination.style.display = 'flex';
//       grid.style.transition = 'transform 0.3s ease';
//     } else {
//       grid.style.transform = '';
//       grid.style.transition = '';
//       pagination.style.display = 'none';
//     }
//   }

//   window.addEventListener('resize', checkResize);

//   checkResize();
// });


