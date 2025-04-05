function toggleCardDetails() {
    const checkbox = document.getElementById('creditOption');
    const cardDetails = document.getElementById('cardDetails');
    cardDetails.style.display = checkbox.checked ? 'block' : 'none';
  }

// FAQ toggle behavior
document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");
  
    questions.forEach(q => {
      q.addEventListener("click", () => {
        q.classList.toggle("active");
  
        // Close others
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
  });
  