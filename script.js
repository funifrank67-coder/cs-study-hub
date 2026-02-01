/* =============================
   CS Study Hub Interactive JS
      - Floating symbols animation
   - Smooth scroll navigation
   - Fade-in sections/cards on scroll
   - Optional hero typing effect
   - About section typewriter effect
============================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     1. Floating Symbols Animation
  ============================ */
  const floatLayers = document.querySelectorAll(".floating-layer, .floating-symbols");

  floatLayers.forEach(layer => {
    const symbols = layer.querySelectorAll(".floating-symbol, .symbol");
    symbols.forEach(symbol => {
      // Random starting position
      symbol.style.transform = `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`;
      // Animate with floating effect
      let angle = 0;
      const amplitude = 10 + Math.random() * 15; // vertical drift
      const speed = 0.02 + Math.random() * 0.03;
      function floatAnim() {
        angle += speed;
        symbol.style.transform = `translate(${Math.sin(angle) * amplitude}px, ${Math.cos(angle) * amplitude}px)`;
        requestAnimationFrame(floatAnim);
      }
      floatAnim();
    });
  });

  /* =============================
     2. Smooth Scroll Navigation
  ============================ */
  const navLinks = document.querySelectorAll("nav ul li a[href^='#']");
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* =============================
     3. Scroll-triggered Fade-in
  ============================ */
  const fadeElems = document.querySelectorAll(".grid-section, .content-split, .hero-content, .card, .about-box");

  const observerOptions = {
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        // Also reveal about-box with float if you want
        if (entry.target.classList.contains("about-box")) {
          entry.target.classList.add("visible", "float");
        }
      }
    });
  }, observerOptions);

  fadeElems.forEach(el => fadeObserver.observe(el));

  /* =============================
     4. Optional Hero Typing Effect
  ============================ */
  const heroContent = document.querySelector(".hero-content h2");
  if (heroContent) {
    const text = heroContent.textContent;
    heroContent.textContent = "";
    let i = 0;
    function typeHero() {
      if (i < text.length) {
        heroContent.textContent += text.charAt(i);
        i++;
        setTimeout(typeHero, 50);
      }
    }
    typeHero();
  }

  /* =============================
     5. About Section Typewriter
  ============================ */
  const typewriterParagraphs = document.querySelectorAll(".about-box .typewriter");

  typewriterParagraphs.forEach(p => {
    const fullText = p.textContent;
    p.textContent = "";
    let index = 0;

    function type() {
      if (index < fullText.length) {
        p.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, 30); // speed of typing
      }
    }

    type();
  });

});