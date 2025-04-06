// Toggle credit card details
function toggleCardDetails() {
  const checkbox = document.getElementById('creditOption');
  const cardDetails = document.getElementById('cardDetails');
  cardDetails.style.display = checkbox.checked ? 'block' : 'none';
}


document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  // 🎵 Music Autoplay on Scroll
  const music = document.getElementById("bgMusic");

  function enableMusic() {
    music.volume = 0.5;
    music.play().catch(e => console.warn("Autoplay failed:", e));

    document.removeEventListener("click", enableMusic);
    window.removeEventListener("scroll", enableMusic);
    window.removeEventListener("touchstart", enableMusic);
  }

  // Play music on first click
  document.addEventListener("click", enableMusic);
  window.addEventListener("scroll", enableMusic);
  window.addEventListener("touchstart", enableMusic);

  questions.forEach(q => {
    q.addEventListener("click", () => {
      q.classList.toggle("active");

      questions.forEach(other => {
        if (other !== q) {
          other.classList.remove("active");
          other.nextElementSibling.style.display = "none";
        }
      });

      const answer = q.nextElementSibling;
      answer.style.display = q.classList.contains("active") ? "block" : "none";
    });
  });

  // SLIDESHOW LOGIC
  let slideIndex = 0;
  showSlides();

  function plusSlides(n) {
    showSlides(slideIndex += n, true);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n - 1, true);
  }

  function showSlides(n = slideIndex, manual = false) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");

    if (!manual) {
      slideIndex++;
      setTimeout(() => showSlides(slideIndex), 5000);
    }
  }

  // Attach to global scope
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
});
