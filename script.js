document.addEventListener("DOMContentLoaded", () => {
    console.log("Portafolio web de Saltos Torres Santiago Ariel inicializado con visor de imágenes interactivo.");

    // Control de navegación por pestañas (4 temas)
    const navButtons = document.querySelectorAll(".nav-btn");
    const panels = document.querySelectorAll(".content-panel");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            navButtons.forEach(btn => btn.classList.remove("active"));
            panels.forEach(panel => panel.classList.remove("active"));

            button.classList.add("active");
            const targetId = button.getAttribute("data-target");
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });

    // Lógica robusta para abrir imágenes en tamaño real (con lupa y scroll) al darles clic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImgOriginal");
    const closeBtn = document.querySelector(".modal-close");
    const images = document.querySelectorAll(".slot-img");

    images.forEach(img => {
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            // Verifica que la imagen tenga un enlace URL colocado en el src
            if (img.src && img.src.trim() !== "" && !img.src.endsWith(window.location.pathname)) {
                modal.style.display = "flex";
                modalImg.src = img.src;
                // Resetea el scroll del contenedor modal al abrir
                const container = modal.querySelector('.modal-image-container');
                if (container) {
                    container.scrollTop = 0;
                    container.scrollLeft = 0;
                }
            } else {
                console.log("⚠️ Esta imagen todavía no tiene un URL asignado en el atributo src del HTML.");
            }
        });
    });

    function closeModal() {
        modal.style.display = "none";
        modalImg.src = "";
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Animación de fondo flotante con partículas "67" y "SI SI SII"
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particlesArray = [];
    const numberOfParticles = 40;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.speed = Math.random() * 0.8 + 0.3;
            this.size = Math.random() * 8 + 16;
            this.opacity = Math.random() * 0.3 + 0.15;
            this.text = Math.random() > 0.45 ? "67" : "SI SI SII";
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height + 50) {
                this.y = -50;
                this.x = Math.random() * canvas.width;
                this.text = Math.random() > 0.45 ? "67" : "SI SI SII";
            }
        }
        draw() {
            ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
            ctx.font = `bold ${this.size}px 'Orbitron', monospace`;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});