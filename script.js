/**
 * Sidharth Vakkan — Portfolio JavaScript v2
 * Features: sticky nav, active link tracking, scroll reveal,
 * project modals w/ real data, 3D card tilt, contact form.
 */

/* =====================================================
   1. REAL PROJECT DATA (sourced from GitHub)
   ===================================================== */
const projects = {
    'concreate': {
        category: 'MERN Stack · OpenAI API',
        year: '2025',
        title: 'ConCreate: AI Content Generator',
        description: 'A full-stack MERN application that generates targeted marketing copy using the OpenAI API, with persistent generation history.',
        detail: 'Built a complete MERN-stack AI application where users select their target audience and platform to receive AI-generated marketing copy powered by the OpenAI API. Developed a robust Express.js backend with MongoDB to handle API requests and persist generation history across sessions. Implemented a clean React.js frontend with real-time feedback and a history panel. The app reduces content creation time significantly and demonstrates end-to-end full-stack engineering from database to UI.',
        github: 'https://github.com/sidvak06/Portfolio_Projects/tree/main/ConCreate_MERN',
        video: 'https://drive.google.com/file/d/1dBmEY6pvDSkglNsvGxImlfFZSGpxcs-f/view?usp=drive_link',
        tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'OpenAI API', 'REST APIs', 'Full-Stack']
    },
    'n8n': {
        category: 'N8N · LLM · Automation',
        year: '2025',
        title: 'AI Content Marketing Automation Workflow',
        description: 'A fine-tuned LLM workflow in n8n that automates end-to-end SEO content creation and publishing, cutting production time by 95%.',
        detail: 'Designed and deployed an advanced LLM automation workflow in n8n that connects keyword research, AI content generation, SEO optimisation, and CMS publishing into a single seamless pipeline. Fine-tuned the language model prompts for consistent, publication-ready output. The result: a client can now publish 50+ well-researched, keyword-optimised articles in minutes instead of months — achieving a 95% reduction in content production time. This project demonstrates practical AI deployment and workflow engineering for real business outcomes.',
        video: 'https://drive.google.com/file/d/1rt8UJdZ-HsaO4MiUdpLKXDw-38NHaXRM/view?usp=drive_link',
        tags: ['N8N', 'LLM', 'SEO Automation', 'Workflow Engineering', 'AI Deployment', 'Prompt Engineering']
    },
    'covid': {
        category: 'SQL · Tableau · Data Analysis',
        year: '2025',
        title: 'Covid-19 Global Data Analysis',
        description: 'A global pandemic data analysis project using advanced SQL to explore infection rates, mortality, and vaccination trends, visualised in Tableau.',
        detail: 'Analysed the Our World in Data Covid-19 deaths and vaccinations dataset using Microsoft SQL Server. Applied advanced SQL techniques including JOINs across two large datasets, CTEs, window functions, and aggregate queries to explore death percentages by country, continent-level infection rates, and rolling vaccination coverage. Final insights were visualised in an interactive Tableau workbook highlighting global patterns and country comparisons.',
        github: 'https://github.com/sidvak06/Portfolio_Projects/tree/main/Covid_19_DATASET',
        tags: ['SQL', 'MS SQL Server', 'Tableau', 'CTEs', 'Window Functions', 'Public Health Data']
    },
    'movie': {
        category: 'Python · EDA · Statistics',
        year: '2025',
        title: 'Movie Industry Correlation Analysis',
        description: 'Exploratory data analysis on a large movie dataset to uncover statistical correlations between budget, gross revenue, and audience ratings.',
        detail: 'Performed in-depth exploratory data analysis using Python in Jupyter Notebook on a dataset of thousands of movies spanning multiple decades. Used Pandas for data wrangling and cleaning, Seaborn and Matplotlib for visualisation, and NumPy for statistical computation. Discovered strong correlations between production budget and gross revenue, and explored the influence of genre, vote count, and release timing on box office performance. Findings were presented as a well-documented notebook with annotated charts.',
        github: 'https://github.com/sidvak06/Portfolio_Projects/tree/main/Movie_Correlation_DATASET',
        tags: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'EDA', 'Correlation Analysis', 'Jupyter']
    }
};

/* =====================================================
   2. UTILITY: DOM SELECTORS
   ===================================================== */
const navHeader = document.getElementById('nav-header');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

/* =====================================================
   3. NAVIGATION — STICKY + ACTIVE LINK
   ===================================================== */
function updateNav() {
    // Sticky shadow
    if (window.scrollY > 10) {
        navHeader.classList.add('scrolled');
    } else {
        navHeader.classList.remove('scrolled');
    }

    // Active link highlight
    const scrollPos = window.scrollY + window.innerHeight / 4;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateNav, { passive: true });

/* =====================================================
   4. SMOOTH SCROLL FOR ANCHOR LINKS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navHeader.offsetHeight + 8;
            const top    = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* =====================================================
   5. SCROLL REVEAL — INTERSECTION OBSERVER
   ===================================================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================================================
   6. PROJECT MODAL
   ===================================================== */
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose   = document.getElementById('modal-close');

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    const githubBtn = project.github
        ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="modal-github-link">
               <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"/></svg>
               View on GitHub ↗
           </a>`
        : '';

    const videoBtn = project.video
        ? `<a href="${project.video}" target="_blank" rel="noopener noreferrer" class="modal-github-link modal-video-link">
               <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
               View Video ↗
           </a>`
        : '';

    modalContent.innerHTML = `
        <p class="modal-label">${project.category} · ${project.year}</p>
        <h2 id="modal-title">${project.title}</h2>
        <p>${project.description}</p>
        <p>${project.detail}</p>
        <div class="modal-tags">
            ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
        </div>
        <div class="modal-actions">
            ${githubBtn}
            ${videoBtn}
        </div>
    `;

    modalOverlay.setAttribute('aria-hidden', 'false');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button
    requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});

/* =====================================================
   7. 3D TILT ON PROJECT CARDS
   ===================================================== */
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const cx     = rect.width  / 2;
            const cy     = rect.height / 2;
            const tiltX  = ((y - cy) / cy) * -6;
            const tiltY  = ((x - cx) / cx) *  6;

            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

initCardTilt();

/* =====================================================
   8. CONTACT FORM
   ===================================================== */
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('form-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const name    = document.getElementById('form-name').value.trim();
        const email   = document.getElementById('form-email').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !email || !message) return;

        submitBtn.textContent = 'Sending…';
        submitBtn.disabled    = true;

        // Simulate network call — replace with Formspree or EmailJS for production
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent                = 'Message Sent ✓';
            submitBtn.style.backgroundColor      = '#16A34A';
            submitBtn.style.borderColor           = '#16A34A';
            submitBtn.style.boxShadow            = '0 6px 20px rgba(22,163,74,0.3)';

            setTimeout(() => {
                submitBtn.textContent                = 'Send Message';
                submitBtn.disabled                   = false;
                submitBtn.style.backgroundColor      = '';
                submitBtn.style.borderColor           = '';
                submitBtn.style.boxShadow            = '';
            }, 3200);
        }, 1200);
    });
}

/* =====================================================
   9. HERO LOAD ANIMATIONS (staggered)
   ===================================================== */
window.addEventListener('DOMContentLoaded', () => {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 350 + i * 160);
    });
});

/* =====================================================
   10. MICRO-INTERACTION: Button ripple press effect
   ===================================================== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointerdown', function (e) {
        this.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('pointerup', function () {
        this.style.transform = '';
    });
    btn.addEventListener('pointerleave', function () {
        this.style.transform = '';
    });
});