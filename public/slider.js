const DELAY = 500;
const ANIMATION_DELAY = 3000;
let currentSlide = 1;

let slider = document.querySelector('.slider');

slider.addEventListener('click', function (event) {
    if (!event.target.classList.contains('slider__icon')) return;

    currentSlide = parseInt(event.target.getAttribute('data-id'));
    showSliderId(currentSlide);
});

initSlider();

function showSliderId(id) {
    let current = slider.querySelector('[data-slide="' + id + '"]');
    slider.querySelectorAll('.slider__slide').forEach(function (slide) {
        slide.style.opacity = 0;
        setTimeout(function () {
            slide.classList.add('hide');
        }, DELAY);
    });

    setTimeout(function () {
        current.classList.remove('hide');
        current.style.opacity = 1;
    }, DELAY);
}

function initSlider() {
    setInterval(function () {
        showSliderId(getSliderId());
    }, ANIMATION_DELAY);
}

function getSliderId() {
    currentSlide++;
    currentSlide = currentSlide % 4 === 0 ? 1 : currentSlide;
    return currentSlide;
}