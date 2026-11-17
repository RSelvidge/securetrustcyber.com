(() => {
  const scenes = document.querySelectorAll('[data-product-motion]');
  if (!scenes.length) return;
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => target.classList.toggle('is-motion-offscreen', !isIntersecting));
  }, { rootMargin: '100px' }) : null;
  scenes.forEach((scene) => {
    if (observer) {
      scene.classList.add('is-motion-offscreen');
      observer.observe(scene);
    }
  });
})();
