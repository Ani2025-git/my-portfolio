// Intro screen fade out
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.querySelector(".intro-screen");
    intro.style.opacity = "0";
    intro.style.transition = "opacity 1s ease";

    setTimeout(() => {
      intro.style.display = "none";
    }, 1000);

  }, 2000); // intro duration
});
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({
    behavior:'smooth'
  });
}

// Scroll reveal animation
window.addEventListener("scroll", reveal);

function reveal(){
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 100;

    if(elementTop < windowHeight - elementVisible){
      reveal.classList.add("active");
    }
  });
}
const textArray = [
  "Frontend Developer",
  "Creative Designer",
  "UI/UX Enthusiast"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function typeEffect(){
  currentText = textArray[index];

  if(!isDeleting){
    typingElement.textContent = currentText.slice(0, charIndex++);
    if(charIndex > currentText.length){
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentText.slice(0, charIndex--);
    if(charIndex === 0){
      isDeleting = false;
      index = (index + 1) % textArray.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
