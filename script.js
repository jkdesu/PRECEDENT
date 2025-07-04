// Optional interactivity: Print / Save as PDF button
document.addEventListener("DOMContentLoaded", () => {
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
});
