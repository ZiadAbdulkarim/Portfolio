// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header Background Change on Scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 10, 8, 0.95)';
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 10px 30px -10px rgba(0, 255, 157, 0.1)';
    } else {
        header.style.background = 'rgba(5, 10, 8, 0.85)';
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
scrollReveal();

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
// Project Modal Logic
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.querySelector('.modal-close');
const modalTriggers = document.querySelectorAll('.modal-trigger');

const openModal = (projectId) => {
    const template = document.getElementById(`project-${projectId}-data`);
    if (template) {
        // Clone the template content
        const content = template.content.cloneNode(true);
        modalContent.innerHTML = ''; // Clear previous content
        modalContent.appendChild(content);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
};

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const projectId = trigger.getAttribute('data-project');
        openModal(projectId);
    });
});

closeModalBtn.addEventListener('click', closeModal);

// Close on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
