
document.addEventListener("DOMContentLoaded", () => {

  const shootSound = new Audio("revolverSOUND.mp3");
  shootSound.volume = 0.03;

  document.addEventListener("click", e => {
    const texts = ["BANG!", "POW!"];
    const bang = document.createElement("div");
    bang.className = "western-bang";
    bang.textContent = texts[Math.floor(Math.random() * texts.length)];
    bang.style.left = e.pageX + "px";
    bang.style.top  = e.pageY + "px";
    document.body.appendChild(bang);

    // Hang lejátszása
    shootSound.currentTime = 0;
    shootSound.play().catch(() => {});

    setTimeout(() => bang.remove(), 700);
  });
});