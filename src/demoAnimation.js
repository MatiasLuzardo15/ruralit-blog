// Animación en bucle infinito para la demo
const runDemoAnimation = () => {
  const steps = document.querySelectorAll('.demo-step');
  const permItems = document.querySelectorAll('.demo-perm-item');
  
  // Resetear todos los elementos
  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = '';
    step.style.animation = 'none';
  });
  
  permItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-6px)';
    item.style.animation = 'none';
  });
  
  // Forzar reflow
  void document.body.offsetHeight;
  
  // Ejecutar secuencia animada
  steps[0].style.animation = 'slideDownFadeIn 0.25s ease-out forwards';
  
  steps[1].style.animation = 'slideUpFadeIn 0.25s ease-out 0.2s forwards';
  
  steps[2].style.animation = 'slideLeftFadeIn 0.3s ease-out 0.4s forwards';
  
  steps[3].style.animation = 'fadeIn 0.2s ease-out 0.7s forwards';
  
  steps[4].style.animation = 'scaleFadeIn 0.3s ease-out 0.9s forwards';
  
  // Permisos con delay escalonado
  permItems[0].style.animation = 'slideLeftFadeIn 0.25s ease-out 1.1s forwards';
  permItems[1].style.animation = 'slideLeftFadeIn 0.25s ease-out 1.2s forwards';
  permItems[2].style.animation = 'slideLeftFadeIn 0.25s ease-out 1.3s forwards';
  permItems[3].style.animation = 'slideLeftFadeIn 0.25s ease-out 1.4s forwards';
  
  // Repetir ciclo después de pausa
  setTimeout(runDemoAnimation, 4000);
};

// Iniciar cuando la sección es visible
const demoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    runDemoAnimation();
    demoObserver.disconnect();
  }
}, { threshold: 0.15 });

demoObserver.observe(document.querySelector('.equipo-demo'));