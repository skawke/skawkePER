// Копирование email в буфер
const emailBtn = document.getElementById('copy-email');
const toast = document.getElementById('toast');

emailBtn.addEventListener('click', () => {
  const email = emailBtn.getAttribute('data-email');
  navigator.clipboard.writeText(email).then(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
});

// Плавное следование красного кружка за курсором и параллакс блоков
const glow = document.getElementById('glow');
const parallaxElements = document.querySelectorAll('[data-depth]');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Параллакс эффект для карточек и блоков
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  parallaxElements.forEach((el) => {
    const depth = parseFloat(el.getAttribute('data-depth')) || 0.02;
    const moveX = deltaX * depth;
    const moveY = deltaY * depth;
    el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});

// Плавная интерполяция движения шара (анимация через requestAnimationFrame)
function animate() {
  glowX += (mouseX - glowX) * 0.07;
  glowY += (mouseY - glowY) * 0.07;

  // Центрируем 420x420 шар относительно координат курсора
  glow.style.transform = `translate3d(${glowX - 210}px, ${glowY - 210}px, 0)`;

  requestAnimationFrame(animate);
}

animate();