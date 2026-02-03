/* ================================
   PROJECT SHOW MORE + HIT TAG UX
================================ */

/* Select all project cards */
const projectCards = document.querySelectorAll(".project-card");

/* Create arrays */
let hitProjects = [];
let normalProjects = [];

/* Separate projects by tag */
projectCards.forEach((card) => {
  const tag = card.dataset.tag;

  if (tag === "hit") {
    hitProjects.push(card);
    card.classList.add("hit-project");
  } else {
    normalProjects.push(card);
    card.classList.add("hidden-project");
  }
});

/* ================================
   SHOW ONLY HIT PROJECTS INITIALLY
================================ */

normalProjects.forEach((card) => {
  card.style.display = "none";
});

/* ================================
   CREATE SHOW MORE BUTTON
================================ */

const projectsSection = document.querySelector(".projects");

const showMoreBtn = document.createElement("button");
showMoreBtn.innerText = "Show More Projects ↓";
showMoreBtn.classList.add("show-more-btn");

projectsSection.appendChild(showMoreBtn);

/* ================================
   TOGGLE SHOW MORE / LESS
================================ */

let expanded = false;

showMoreBtn.addEventListener("click", () => {
  expanded = !expanded;

  if (expanded) {
    /* Show all normal projects */
    normalProjects.forEach((card) => {
      card.style.display = "flex";
      card.style.opacity = 0;
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      }, 100);
    });

    showMoreBtn.innerText = "Show Less ↑";
  } else {
    /* Hide normal projects again */
    normalProjects.forEach((card) => {
      card.style.display = "none";
    });

    showMoreBtn.innerText = "Show More Projects ↓";

    /* Scroll back to top of projects section */
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }
});

/* ================================
   HIT TAG LABEL UI
================================ */

hitProjects.forEach((card) => {
  const badge = document.createElement("span");
  badge.innerText = "🔥 HIT";
  badge.classList.add("hit-badge");

  card.prepend(badge);
});

/* ================================
   SCROLL REVEAL ANIMATION
================================ */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

projectCards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  observer.observe(card);
});

/* ================================
   FAVICON DARK/LIGHT MODE FIX
================================ */

function updateFavicon() {
  const favicon = document.getElementById("favicon");
  const isDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  favicon.href = isDarkMode
    ? "images/UnityDark.ico"
    : "images/UnityLight.ico";
}

updateFavicon();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateFavicon);
