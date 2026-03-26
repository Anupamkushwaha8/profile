/* ================= SAFE SELECTORS ================= */
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const typingText = document.querySelector(".typing");

/* ================= TYPING ================= */
const roles = ["Frontend Developer", "Java Programmer", "Creative Coder"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    let current = roles[roleIndex];

    typingText.textContent = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

/* ================= SMOOTH SCROLL ================= */
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" });
    });
});

/* ================= ACTIVE NAV ================= */
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(".section");

function revealOnScroll() {
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);

/* ================= PROGRESS BAR ================= */
const progressBar = document.createElement("div");
progressBar.style.cssText = `
position:fixed;top:0;left:0;height:5px;
background:#FFD700;z-index:9999;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const progress =
        (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = progress + "%";
});

/* ================= FORM VALIDATION ================= */
const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        let valid = true;

        form.querySelectorAll("input, textarea").forEach(input => {
            if (input.value.trim() === "") {
                valid = false;
                input.style.border = "1px solid red";
            } else {
                input.style.border = "1px solid green";
            }
        });

        if (valid) {
            alert("Message Sent!");
            form.reset();
        }
    });
}

/* ================= MOBILE MENU ================= */
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle?.addEventListener("click", () => {
    nav.classList.toggle("active");
});

/* ================= SCROLL TOP ================= */
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.className = "top-btn";
document.body.appendChild(topBtn);

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

/* ================= GOLDEN DOT BACKGROUND ================= */

const bgCanvas = document.createElement("canvas");
document.body.appendChild(bgCanvas);

bgCanvas.style.position = "fixed";
bgCanvas.style.top = "0";
bgCanvas.style.left = "0";
bgCanvas.style.zIndex = "-1";

const bgCtx = bgCanvas.getContext("2d");

function resizeCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const dots = Array.from({ length: 80 }, () => ({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    size: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
}));

function animateDots() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    dots.forEach(d => {
        d.x += d.dx;
        d.y += d.dy;

        if (d.x < 0 || d.x > bgCanvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > bgCanvas.height) d.dy *= -1;

        const g = bgCtx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 4);
        g.addColorStop(0, "#FFD700");
        g.addColorStop(0.5, "#FFA500");
        g.addColorStop(1, "transparent");

        bgCtx.fillStyle = g;
        bgCtx.beginPath();
        bgCtx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        bgCtx.fill();
    });

    requestAnimationFrame(animateDots);
}

animateDots();
