
const body = document.body;

// Day and night theme
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const isDay = body.classList.toggle("day");

  themeToggle.textContent = isDay ? "🌙 Night mode" : "☀️ Day mode";
  document.querySelector('meta[name="theme-color"]')
    .setAttribute("content", isDay ? "#fff5ed" : "#17152f");
});

// Pip's greetings
const helloMessage = document.getElementById("helloMessage");
const pipSpeech = document.getElementById("pipSpeech");
const pip = document.getElementById("pip");

document.getElementById("helloButton").addEventListener("click", () => {
  helloMessage.textContent = "Pip says: You look like someone who deserves a little magic! ♡";
  pipSpeech.textContent = "Oh! A visitor! ✨";
});

const pipGreetings = [
  "Hehe! That tickles!",
  "I found a star in my pocket!",
  "Have you had enough rest today?",
  "You are made of stardust!",
  "Shhh... the clouds are sleeping."
];

pip.addEventListener("click", () => {
  pipSpeech.textContent =
    pipGreetings[Math.floor(Math.random() * pipGreetings.length)];

  pip.style.animation = "none";
  void pip.offsetWidth;
  pip.style.animation = "";
});

// The three dream inventions
const projectDetails = {
  lullaby: "🎵 Lullaby Box: Imagine a tiny music box that plays a gentle bedtime tune. This invention is a musical concept from Pip's imagination.",
  lamp: "🏮 Moonlight Lamp: A pretend lantern that lights the way through imaginary midnight adventures.",
  stories: "📖 Cloud Stories: A magical storybook full of adventures that change with every visit."
};

const projectMessage = document.getElementById("projectMessage");

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    projectMessage.textContent = projectDetails[button.dataset.project];
  });
});

// Guestbook interaction
const dreamForm = document.getElementById("dreamForm");
const dreamInput = document.getElementById("dreamInput");
const dreamMessage = document.getElementById("dreamMessage");

dreamForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dream = dreamInput.value.trim();
  if (!dream) {
    dreamMessage.textContent = "Pip needs a little dream first! ✨";
    return;
  }

  // Use textContent, not innerHTML, for user-provided text.
  dreamMessage.textContent =
    `Pip tucked "${dream}" into a little dream cloud. Thank you! ☁️`;

  dreamForm.reset();
});

// Hidden Easter egg: click the moon or press M three times.
const secret = document.getElementById("secret");
const closeSecret = document.getElementById("closeSecret");
const secretDone = document.getElementById("secretDone");
const moon = document.querySelector(".moon");

let moonClicks = 0;
let lastMTime = 0;

function openSecret() {
  secret.hidden = false;
  closeSecret.focus();
}

function hideSecret() {
  secret.hidden = true;
  moonClicks = 0;
}

moon.style.cursor = "pointer";
moon.setAttribute("role", "button");
moon.setAttribute("tabindex", "0");
moon.setAttribute("aria-label", "Reveal Pip's secret");

moon.addEventListener("click", openSecret);
moon.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openSecret();
  }
});

closeSecret.addEventListener("click", hideSecret);
secretDone.addEventListener("click", hideSecret);

secret.addEventListener("click", (event) => {
  if (event.target === secret) hideSecret();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !secret.hidden) {
    hideSecret();
  }

  if (event.key.toLowerCase() === "m" && !event.repeat) {
    const now = Date.now();
    moonClicks = now - lastMTime < 1500 ? moonClicks + 1 : 1;
    lastMTime = now;

    if (moonClicks >= 3) openSecret();
  }
});
