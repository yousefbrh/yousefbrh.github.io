const cards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filters button');

/* APPLY FILTER FUNCTION */
function applyFilter(filter) {
  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    card.style.display =
      filter === 'all' || tags.includes(filter)
        ? 'flex'
        : 'none';
  });
}

/* FILTER CLICK */
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    applyFilter(btn.dataset.filter);
  });
});

/* INITIAL FILTER ON LOAD */
const initiallyActiveBtn =
  document.querySelector('.filters button.active') ||
  document.querySelector('.filters button[data-filter="all"]');

if (initiallyActiveBtn) {
  initiallyActiveBtn.classList.add('active');
  applyFilter(initiallyActiveBtn.dataset.filter);
}

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

function updateFavicon() {
  const favicon = document.getElementById("favicon");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  favicon.href = isDarkMode ? "images/UnityDark.ico" : "images/UnityLight.ico";
}
function updateFavicon() {
  const favicon = document.getElementById("favicon");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  favicon.href = isDarkMode ? "images/UnityDark.ico" : "images/UnityLight.ico";
}

// Run on page load
updateFavicon();

// Listen for changes in color scheme
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);
