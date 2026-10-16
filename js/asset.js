// Initialisation des animations AOS
        AOS.init({
            duration: 800,
            once: true
        });

        // Mise à jour automatique de l'année dans le footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Animation de la barre de navigation au défilement
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });

        // --- GESTION DU CLIC SUR LES CARTES DE MATÉRIELS (MODALE DROITE À GAUCHE) ---
        document.addEventListener('DOMContentLoaded', function() {
            const productCards = document.querySelectorAll('#materiels .product-card');
            const productModalElement = document.getElementById('productModal');
            const productModal = new bootstrap.Modal(productModalElement);

            productCards.forEach(card => {
                card.addEventListener('click', function() {
                    const imgUrl = this.querySelector('.product-img').getAttribute('src');
                    const imgAlt = this.querySelector('.product-img').getAttribute('alt');
                    const badgeText = this.querySelector('.badge').textContent;
                    const titleText = this.querySelector('h5').textContent;
                    const descText = this.querySelector('p').textContent;

                    document.getElementById('modalImg').setAttribute('src', imgUrl);
                    document.getElementById('modalImg').setAttribute('alt', imgAlt);
                    document.getElementById('modalBadge').textContent = badgeText;
                    document.getElementById('modalTitle').textContent = titleText;
                    document.getElementById('modalDescription').textContent = descText;

                    productModal.show();
                });
            });
        });

        // --- 1. DÉCOMPTE ANIMÉ DES STATISTIQUES AU MOMENT DE L'AFFICHAGE ---
        function animateValue(obj, start, end, duration, decimals = 0, prefix = "", suffix = "") {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentValue = progress * (end - start) + start;
                obj.textContent = prefix + currentValue.toFixed(decimals) + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        const statsSection = document.querySelector('.stats-section');
        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
                        const target = parseFloat(el.getAttribute('data-target'));
                        const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
                        const prefix = el.getAttribute('data-prefix') || "";
                        const suffix = el.getAttribute('data-suffix') || "";
                        animateValue(el, 0, target, 2000, decimals, prefix, suffix);
                    });
                }
            });
        }, { threshold: 0.3 });

        if (statsSection) {
            observer.observe(statsSection);
        }

        // --- 2. REDIRECTION VERS GMAIL AVEC TOUS LES CHAMPS RENSEIGNÉS ---
        const DEST_EMAIL = 'royaldiamondmali223@gmail.com';

        // Formulaire Hero (Demande Express)
        const heroForm = document.getElementById('heroForm');
        if (heroForm) {
            heroForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('heroName').value;
                const email = document.getElementById('heroEmail').value;
                const domain = document.getElementById('heroDomain').value;

                const subject = encodeURIComponent(`Demande Express - ${domain}`);
                const body = encodeURIComponent(
                    `Bonjour ROYAL DIAMOND MALI,\n\n` +
                    `Voici une nouvelle demande d'information/devis :\n\n` +
                    `- Nom complet : ${name}\n` +
                    `- Adresse email : ${email}\n` +
                    `- Domaine concerné : ${domain}\n\n` +
                    `Cordialement,\n${name}`
                );

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DEST_EMAIL}&su=${subject}&body=${body}`;
                window.open(gmailUrl, '_blank');
            });
        }

        // Formulaire Contact
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('contactName').value;
                const phone = document.getElementById('contactPhone').value;
                const email = document.getElementById('contactEmail').value;
                const message = document.getElementById('contactMessage').value;

                const subject = encodeURIComponent(`Nouveau Message de ${name}`);
                const body = encodeURIComponent(
                    `Bonjour ROYAL DIAMOND MALI,\n\n` +
                    `Vous avez reçu un nouveau message depuis le site web :\n\n` +
                    `- Nom complet : ${name}\n` +
                    `- Téléphone : ${phone}\n` +
                    `- E-mail : ${email}\n\n` +
                    `Message / Matériel recherché :\n${message}\n\n` +
                    `Cordialement,\n${name}`
                );

                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${DEST_EMAIL}&su=${subject}&body=${body}`;
                window.open(gmailUrl, '_blank');
            });
        }

        document.getElementById('btnDevisModal').addEventListener('click', function (e) {
            e.preventDefault();
            
            // 1. Récupération de l'instance de la modale et fermeture
            const modalElement = document.getElementById('productModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            
            if (modalInstance) {
                modalInstance.hide();
            }

            // 2. Défilement fluide vers la section #contact après la fermeture
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // 300ms correspond au temps de l'animation de fermeture
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                // Retire la classe 'active' de tous les liens de la navbar
                document.querySelectorAll('.navbar-nav .nav-link').forEach(nav => nav.classList.remove('active'));
                
                // Ajoute la classe 'active' sur le lien qui vient d'être cliqué
                this.classList.add('active');
            });
        });