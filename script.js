// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Navegación suave para enlaces internos
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".nav").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animación de aparición al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(".card, .habits-column");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Efecto hover mejorado para las cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Contador de visitantes (simulado)
  let visitorCount = localStorage.getItem("visitorCount") || 0;
  visitorCount = parseInt(visitorCount) + 1;
  localStorage.setItem("visitorCount", visitorCount);

  // Mostrar contador en el footer
  const footer = document.querySelector(".footer p");
  if (footer) {
    footer.innerHTML += ` | Visitantes: ${visitorCount}`;
  }

  // Función para mostrar mensaje de bienvenida
  function showWelcomeMessage() {
    const welcomeDiv = document.createElement("div");
    welcomeDiv.className = "welcome-message";
    welcomeDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4a90e2, #f39c12);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.5s ease;
                max-width: 300px;
            ">
                <h4 style="margin: 0 0 0.5rem 0;">🐾 ¡Bienvenido!</h4>
                <p style="margin: 0; font-size: 0.9rem;">Explora el fascinante mundo de perros y gatos</p>
                <button onclick="this.parentElement.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 0.5rem;
                    font-size: 0.8rem;
                ">Cerrar</button>
            </div>
        `;

    document.body.appendChild(welcomeDiv);

    // Remover automáticamente después de 5 segundos
    setTimeout(() => {
      if (welcomeDiv.parentElement) {
        welcomeDiv.remove();
      }
    }, 5000);
  }

  // Mostrar mensaje de bienvenida después de 1 segundo
  setTimeout(showWelcomeMessage, 1000);

  // Función para agregar efecto de typing en el hero
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Aplicar efecto typing al título del hero
  const heroTitle = document.querySelector(".hero h2");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }

  // Función para agregar tooltips a las cards
  function addTooltips() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent;
      card.setAttribute("title", `Haz clic para saber más sobre ${title}`);
    });
  }

  addTooltips();

  // Función para cambiar tema (claro/oscuro)
  function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "dark") {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }

  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  }

  // Agregar botón de cambio de tema
  const themeButton = document.createElement("button");
  themeButton.innerHTML = "🌙";
  themeButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #4a90e2, #f39c12);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: transform 0.3s ease;
    `;

  themeButton.addEventListener("click", toggleTheme);
  themeButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });
  themeButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  document.body.appendChild(themeButton);

  // Función para agregar CSS del tema oscuro
  function addDarkThemeCSS() {
    const style = document.createElement("style");
    style.textContent = `
            [data-theme="dark"] {
                --text-color: #ecf0f1;
                --light-bg: #2c3e50;
                --white: #34495e;
            }
            
            [data-theme="dark"] .card {
                background: #34495e;
                color: #ecf0f1;
            }
            
            [data-theme="dark"] .habits-list li {
                border-bottom-color: #4a5568;
            }
            
            [data-theme="dark"] .habits-list li:hover {
                background: #2c3e50;
            }
        `;
    document.head.appendChild(style);
  }

  addDarkThemeCSS();

  // Función para agregar animación de scroll
  function addScrollAnimation() {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
    document.head.appendChild(style);
  }

  addScrollAnimation();

  // Función para optimizar el rendimiento del iframe
  function optimizeIframe() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      // Cargar iframe solo cuando esté visible
      const iframeObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iframe.style.opacity = "1";
            iframeObserver.unobserve(iframe);
          }
        });
      });

      iframe.style.opacity = "0";
      iframe.style.transition = "opacity 0.5s ease";
      iframeObserver.observe(iframe);
    }
  }

  optimizeIframe();

  // Función para agregar efecto de partículas en el header
  function addParticleEffect() {
    const header = document.querySelector(".header");
    if (header) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${
                      3 + Math.random() * 4
                    }s infinite ease-in-out;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
        header.appendChild(particle);
      }

      const style = document.createElement("style");
      style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `;
      document.head.appendChild(style);
    }
  }

  addParticleEffect();

  console.log("🐾 Portafolio de Perros y Gatos cargado exitosamente!");
});

// Función global para cerrar mensajes
window.closeMessage = function (element) {
  element.remove();
};
