// Toggle credit card details
function toggleCardDetails() {
  const checkbox = document.getElementById('creditOption');
  const cardDetails = document.getElementById('cardDetails');
  cardDetails.style.display = checkbox.checked ? 'block' : 'none';
}


document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  // 🎵 Music Autoplay on Scroll
  const audio = new Audio("/audio/Ordinary-Person.mp3");
  audio.loop = true;
  audio.volume = 0.5;

  function setupAudio() {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("✅ Music started on first click");
      }).catch(error => {
        console.warn("🚫 Auto-play was prevented:", error);
        // Optional: Show a play button or notice here
      });
    }

    // Remove listener after first trigger
    window.removeEventListener("click", setupAudio);
  }

  // Play music on first click anywhere on page
  window.addEventListener("click", setupAudio, { once: true });

  const GEMINI_API_KEY = "AIzaSyDRnyJnCxZCrxPQVpBVUsyMSMlYjW9DgMM";

  // Toggle chatbot popup
document.getElementById("chatbot-toggle").addEventListener("click", () => {
  const popup = document.getElementById("chat-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
});

// Handle sending message
document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("chat-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  // Also allow Enter key to send message
document.getElementById("chat-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission if in a form
    document.getElementById("send-btn").click(); // Trigger the send button click
  }
});

  const response = await fetch(`/api/gemini-chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  console.log("Gemini response:", data);
  
  const aiReply = data?.reply || "Sorry, I couldn’t understand.";

  if (
    data &&
    data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    data.candidates[0].content.parts[0] &&
    data.candidates[0].content.parts[0].text
  ) {
    aiReply = data.candidates[0].content.parts[0].text;
  }
  
  appendMessage("AI", aiReply);
});

function appendMessage(sender, message) {
  const chat = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

  
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
