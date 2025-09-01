/**
 * Neumorphic Digit-Bar Clock
 *
 * Config:
 * - BAR_COUNT: 6 (HH:MM:SS) or 5 (HH:MM)
 */

const BAR_COUNT = 6; 
const bars = document.querySelectorAll(".digit-bar");

bars.forEach(bar => {
  // add digit labels
  for (let i = 0; i < 10; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    bar.appendChild(span);
  }

  // add knob
  const knob = document.createElement("div");
  knob.className = "knob";
  knob.textContent = "0";
  bar.appendChild(knob);
});

/**
 * Position knob at correct digit
 */
function setDigit(bar, digit) {
  const knob = bar.querySelector(".knob");
  const y = digit * parseInt(getComputedStyle(document.documentElement).getPropertyValue("--digit-height"));
  knob.textContent = digit;
  knob.style.transform = `translate(-50%, ${y}px)`;
}

/**
 * Get current time digits as array
 */
function getTimeDigits() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  return (BAR_COUNT === 6 ? h + m + s : h + m).split("").map(Number);
}

/**
 * Update all bars
 */
function updateClock(digits) {
  bars.forEach((bar, i) => {
    if (digits[i] !== undefined) {
      setDigit(bar, digits[i]);
    }
  });
}

/* Drift-free timer */
function tick() {
  updateClock(getTimeDigits());
}
setInterval(tick, 1000);
tick();