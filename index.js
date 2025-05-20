function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const slideImages = document.querySelectorAll(".slide-in");
// Check for scroll
function checkSlide(e) {
  // Animate at about 50% of image showing
  slideImages.forEach((slideImage) => {
    const slideInAt =
      window.scrollY + window.innerHeight - slideImage.height / 2;
    const imageBottom = slideImage.offsetTop + slideImage.height;
    const isHalfShown = slideInAt > slideImage.offsetTop;

    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      slideImage.classList.add("active");
    } else {
      slideImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide)); // ("scroll", debounce(checkSlide, 500)) to adjust timing
