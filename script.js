// État de l'application
const state = {
    isAdmin: false,
    editingArticleId: null,
    currentImageData: null,
    currentPdfData: null,
    currentSlide: 0,
    carouselInterval: null,
    settings: {
        facebookUrl: "#",
        whatsappUrl: "#",
        youtubeUrl: "#",
        twitterUrl: "#",
        instagramUrl: "#",
        linkedinUrl: "#",
        email: "contact@elikiamedia.com",
        phone: "+243 81 234 5678",
        address: "Kinshasa, RDC",
        mapUrl: "#",
        hours: "Lun-Ven: 8h-18h"
    },
    articles: [
        {
            id: 1,
            title: "Sommet des chefs d'État africains à Addis-Abeba",
            category: "Politique",
            author: "Jean Kabasele",
            media: {
                type: "image",
                url: "https://picsum.photos/600/400?random=1"
            },
            content: "<p>Les dirigeants africains se réunissent pour discuter de l'intégration régionale et des défis sécuritaires du continent. Cette rencontre historique vise à renforcer la coopération entre les nations africaines et à trouver des solutions communes aux problèmes de sécurité qui affectent le développement du continent.</p><h2>Un avenir prometteur</h2><p>Le plan de développement économique présenté lors du sommet a été accueilli avec enthousiasme par la plupart des participants. Plusieurs pays ont déjà annoncé leur intention de participer activement à ce projet ambitieux.</p>",
            date: "17 Juil. 2025",
            featured: true
        },
        {
            id: 2,
            title: "Croissance économique en hausse de 5,2% en Afrique subsaharienne",
            category: "Économie",
            author: "Marie-Louise Diallo",
            media: {
                type: "image",
                url: "https://picsum.photos/600/400?random=2"
            },
            content: "<p>Malgré les défis mondiaux, la région affiche une résilience remarquable selon le FMI. Les projections économiques montrent une croissance soutenue dans plusieurs secteurs clés, notamment les technologies, l'agriculture et les industries extractives, contribuant ainsi au développement économique de la région.</p><h2>Les secteurs porteurs</h2><p>L'analyse détaillée montre que le secteur technologique connaît une croissance exponentielle, avec une augmentation de 12% des investissements dans les startups africaines. L'agriculture moderne et les énergies renouvelables sont également des moteurs importants de cette croissance.</p>",
            date: "16 Juil. 2025",
            featured: true
        },
        {
            id: 3,
            title: "Festival panafricain de cinéma : les lauréats dévoilés",
            category: "Culture",
            author: "Samuel N'diaye",
            media: {
                type: "video",
                url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            content: "<p>Le cinéma africain célébré lors de la 15ème édition du festival qui s'est tenu à Ouagadougou. Des réalisateurs talentueux de tout le continent ont présenté leurs œuvres, mettant en lumière la diversité culturelle et les histoires captivantes de l'Afrique contemporaine.</p><h2>Des œuvres remarquables</h2><p>Le grand prix du festival a été décerné au film congolais 'Lumière sur Kin' qui raconte l'histoire touchante d'une famille à travers trois générations. Le film sénégalais 'Teranga' a remporté le prix du public pour sa représentation authentique de la vie rurale.</p>",
            date: "15 Juil. 2025",
            featured: false
        },
        {
            id: 4,
            title: "Rapport économique annuel 2025",
            category: "Économie",
            author: "Ministère de l'Économie",
            media: {
                type: "pdf",
                url: "#",
                filename: "rapport-economique-2025.pdf"
            },
            content: "<p>Le ministère de l'Économie a publié son rapport annuel sur la situation économique du pays. Ce document complet analyse les performances des différents secteurs et présente les perspectives pour l'année à venir.</p><h2>Principales conclusions</h2><p>Le rapport met en lumière une croissance soutenue du PIB de 5,2%, une inflation maîtrisée à 3,8% et une augmentation des investissements étrangers de 12% par rapport à l'année précédente.</p>",
            date: "14 Juil. 2025",
            featured: false
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Références aux éléments DOM
    const adminCopyrightAccess = document.getElementById('adminCopyrightAccess');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('login-form');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsModal = document.getElementById('closeSettingsModal');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const form = document.getElementById('article-form');
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    const imageUploadContainer = document.getElementById('imageUploadContainer');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const uploadedImage = document.getElementById('uploadedImage');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const articleIdInput = document.getElementById('article-id');
    const editorContent = document.getElementById('content');
    const editorButtons = document.querySelectorAll('.editor-btn');
    const articlesGrid = document.getElementById('articlesGrid');
    const featuredCarousel = document.getElementById('featuredCarousel');
    const articlesSection = document.getElementById('articlesSection');
    const articleDetail = document.getElementById('articleDetail');
    const backButton = document.getElementById('backButton');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const newArticleBtn = document.getElementById('newArticleBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const adminControls = document.getElementById('adminControls');
    const featuredCheckbox = document.getElementById('featured');
    const logoutBtn = document.getElementById('logoutBtn');
    const mediaTypeButtons = document.querySelectorAll('.media-type-btn');
    const mediaUploads = document.querySelectorAll('.media-upload');
    const videoUrl = document.getElementById('videoUrl');
    const pdfUpload = document.getElementById('pdfUpload');

    // Liens sociaux et contact
    const facebookLink = document.getElementById('facebookLink');
    const whatsappLink = document.getElementById('whatsappLink');
    const youtubeLink = document.getElementById('youtubeLink');
    const emailLink = document.getElementById('emailLink');
    const addressText = document.getElementById('addressText');
    const phoneText = document.getElementById('phoneText');
    const emailText = document.getElementById('emailText');

    // Champs de paramètres
    const facebookUrl = document.getElementById('facebookUrl');
    const whatsappUrl = document.getElementById('whatsappUrl');
    const youtubeUrl = document.getElementById('youtubeUrl');
    const twitterUrl = document.getElementById('twitterUrl');
    const instagramUrl = document.getElementById('instagramUrl');
    const linkedinUrl = document.getElementById('linkedinUrl');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const mapUrl = document.getElementById('mapUrl');
    const hours = document.getElementById('hours');

    // Initialiser les paramètres
    loadSettings();
    applySettings();

    // Initialiser les articles
    renderArticles();
    renderCarousel();

    // Gestion de l'accès admin via le symbole ©
    adminCopyrightAccess.addEventListener('click', function() {
        if (state.isAdmin) {
            openSettingsModal();
        } else {
            openAdminLogin();
        }
    });

    // Nouvel article
    newArticleBtn.addEventListener('click', openFormForNewArticle);

    // Paramètres
    settingsBtn.addEventListener('click', openSettingsModal);

    // Déconnexion
    logoutBtn.addEventListener('click', logoutAdmin);

    // Sélecteur de type de média
    mediaTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            mediaTypeButtons.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const mediaType = this.dataset.type;

            // Masquer tous les champs d'upload
            mediaUploads.forEach(upload => {
                upload.style.display = 'none';
            });

            // Afficher le champ correspondant au type sélectionné
            document.querySelector(`.media-upload[data-type="${mediaType}"]`).style.display = 'block';
        });
    });

    function openAdminLogin() {
        loginModal.style.display = 'flex';
    }

    closeLoginModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === "admin" && password === "elikia2025") {
            state.isAdmin = true;

            // Mettre à jour le symbole © pour indiquer que l'admin est connecté
            adminCopyrightAccess.innerHTML = '&#x1F512;'; // Symbole de cadenas
            adminCopyrightAccess.title = "Administrateur connecté - Cliquez pour accéder aux paramètres";

            // Ajouter un effet visuel
            adminCopyrightAccess.style.color = "var(--primary-gold)";
            adminCopyrightAccess.style.fontWeight = "bold";

            // Afficher les boutons de modification
            document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = 'flex');

            // Afficher les contrôles admin
            adminControls.style.display = 'flex';

            // Afficher le bouton de déconnexion
            logoutBtn.style.display = 'block';

            loginModal.style.display = 'none';
        } else {
            alert("Identifiants incorrects. Veuillez réessayer.");
        }
    });

    // Ouvrir la modale des paramètres
    function openSettingsModal() {
        if (!state.isAdmin) return;

        // Remplir le formulaire avec les paramètres actuels
        facebookUrl.value = state.settings.facebookUrl;
        whatsappUrl.value = state.settings.whatsappUrl;
        youtubeUrl.value = state.settings.youtubeUrl;
        twitterUrl.value = state.settings.twitterUrl;
        instagramUrl.value = state.settings.instagramUrl;
        linkedinUrl.value = state.settings.linkedinUrl;
        email.value = state.settings.email;
        phone.value = state.settings.phone;
        address.value = state.settings.address;
        mapUrl.value = state.settings.mapUrl;
        hours.value = state.settings.hours;

        settingsModal.style.display = 'flex';
    }

    closeSettingsModal.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    // Déconnexion admin
    function logoutAdmin() {
        state.isAdmin = false;

        // Réinitialiser le symbole ©
        adminCopyrightAccess.innerHTML = '©';
        adminCopyrightAccess.title = "";
        adminCopyrightAccess.style.color = "";
        adminCopyrightAccess.style.fontWeight = "";

        // Cacher les boutons d'édition
        document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = 'none');

        // Cacher les contrôles admin
        adminControls.style.display = 'none';

        // Cacher le bouton de déconnexion
        logoutBtn.style.display = 'none';

        alert("Vous avez été déconnecté du mode administrateur.");
    }

    // Gestion des onglets
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const tabId = this.dataset.tab;

            // Masquer tous les contenus d'onglets
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Afficher le contenu de l'onglet sélectionné
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Sauvegarder les paramètres
    saveSettingsBtn.addEventListener('click', function() {
        // Mettre à jour les paramètres
        state.settings = {
            facebookUrl: facebookUrl.value,
            whatsappUrl: whatsappUrl.value,
            youtubeUrl: youtubeUrl.value,
            twitterUrl: twitterUrl.value,
            instagramUrl: instagramUrl.value,
            linkedinUrl: linkedinUrl.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            mapUrl: mapUrl.value,
            hours: hours.value
        };

        // Sauvegarder dans localStorage
        localStorage.setItem('siteSettings', JSON.stringify(state.settings));

        // Appliquer les nouveaux paramètres
        applySettings();

        // Fermer la modale
        settingsModal.style.display = 'none';
    });

    // Charger les paramètres depuis localStorage
    function loadSettings() {
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            state.settings = JSON.parse(savedSettings);
        }
    }

    // Appliquer les paramètres à l'interface
    function applySettings() {
        // Liens sociaux
        facebookLink.href = state.settings.facebookUrl;
        whatsappLink.href = state.settings.whatsappUrl;
        youtubeLink.href = state.settings.youtubeUrl;
        emailLink.href = `mailto:${state.settings.email}`;

        // Informations de contact
        addressText.textContent = state.settings.address;
        phoneText.textContent = state.settings.phone;
        emailText.textContent = state.settings.email;
    }

    // Filtrage des articles
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const category = this.dataset.category;
            filterArticles(category);
        });
    });

    function filterArticles(category) {
        const articles = document.querySelectorAll('.article-card');

        articles.forEach(article => {
            if (category === "all" || article.dataset.category === category) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Recherche d'articles
    searchButton.addEventListener('click', searchArticles);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });

    function searchArticles() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === "") {
            renderArticles();
            return;
        }

        const filteredArticles = state.articles.filter(article => {
            return (
                article.title.toLowerCase().includes(searchTerm) ||
                article.content.toLowerCase().includes(searchTerm) ||
                article.author.toLowerCase().includes(searchTerm) ||
                article.category.toLowerCase().includes(searchTerm)
            );
        });

        // Afficher les résultats de la recherche
        renderArticles(filteredArticles);
    }

    // Afficher les articles
    function renderArticles(articlesToShow = state.articles) {
        articlesGrid.innerHTML = '';

        articlesToShow.forEach(article => {
            const articleCard = document.createElement('article');
            articleCard.className = 'article-card';
            articleCard.dataset.id = article.id;
            articleCard.dataset.category = article.category;

            // Extraire un extrait sans balises HTML
            const excerpt = article.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...';

            let mediaHtml = '';
            if (article.media.type === "image") {
                mediaHtml = `<div class="article-image" style="background-image: url('${article.media.url}');"></div>`;
            } else if (article.media.type === "video") {
                mediaHtml = `
                    <div class="article-image" style="background-image: url('https://img.youtube.com/vi/${getYouTubeId(article.media.url)}/0.jpg');">
                        <div class="video-icon">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                `;
            } else if (article.media.type === "pdf") {
                mediaHtml = `
                    <div class="article-image" style="background-color: #f1f1f1;">
                        <div class="pdf-icon">
                            <i class="fas fa-file-pdf"></i>
                        </div>
                    </div>
                `;
            }

            articleCard.innerHTML = `
                ${mediaHtml}
                ${article.featured ? '<span class="featured-badge">À la une</span>' : ''}
                <div class="article-content">
                    <span class="article-category">${article.category}</span>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${excerpt}</p>
                    <div class="article-meta">
                        <span>Par ${article.author}</span>
                        <span>${article.date}</span>
                    </div>
                </div>
                <button class="edit-btn" title="Modifier l'article">
                    <i class="fas fa-edit"></i>
                </button>
            `;

            // Ajouter le gestionnaire d'événement pour l'édition
            articleCard.querySelector('.edit-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                openFormForEdit(article);
            });

            // Ajouter le gestionnaire pour afficher le détail
            articleCard.addEventListener('click', function() {
                showArticleDetail(article.id);
            });

            articlesGrid.appendChild(articleCard);
        });
    }

    // Afficher le détail d'un article
    function showArticleDetail(articleId) {
        const article = state.articles.find(a => a.id === articleId);
        if (!article) return;

        // Cacher les autres sections
        articlesSection.style.display = 'none';
        featuredCarousel.style.display = 'none';

        // Afficher le bouton de retour
        backButton.style.display = 'inline-flex';

        let mediaHtml = '';
        if (article.media.type === "image") {
            mediaHtml = `<img src="${article.media.url}" alt="${article.title}" class="article-detail-image">`;
        } else if (article.media.type === "video") {
            mediaHtml = `
                <div class="video-player">
                    <iframe src="${article.media.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `;
        } else if (article.media.type === "pdf") {
            mediaHtml = `
                <div class="pdf-viewer">
                    <embed src="${article.media.url}" type="application/pdf" width="100%" height="100%">
                </div>
                <a href="${article.media.url}" class="pdf-download" download="${article.media.filename || 'document.pdf'}">
                    <i class="fas fa-download"></i> Télécharger le PDF
                </a>
            `;
        }

        articleDetail.innerHTML = `
            <div class="article-header">
                <span class="article-category">${article.category}</span>
                <h2 class="article-detail-title">${article.title}</h2>
                <div class="article-meta-detail">
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                    <span><i class="fas fa-calendar"></i> ${article.date}</span>
                </div>
            </div>
            ${mediaHtml}
            <div class="article-detail-content">
                ${article.content}
            </div>
        `;

        articleDetail.style.display = 'block';
    }

    // Retour à la liste des articles
    backButton.addEventListener('click', function() {
        articleDetail.style.display = 'none';
        articlesSection.style.display = 'block';
        featuredCarousel.style.display = 'block';
        backButton.style.display = 'none';
    });

    // Afficher le carrousel
    function renderCarousel() {
        // Filtrer les articles à la une
        const featuredArticles = state.articles.filter(article => article.featured);

        // Générer le HTML du carrousel
        let carouselHTML = '';
        let controlsHTML = '';

        featuredArticles.forEach((article, index) => {
            carouselHTML += `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}"
                     style="background-image: url('${article.media.type === "image" ? article.media.url : article.media.type === "video" ? `https://img.youtube.com/vi/${getYouTubeId(article.media.url)}/0.jpg` : 'https://picsum.photos/1200/600?random=pdf'}');">
                    <div class="slide-content">
                        <span class="slide-category">${article.category}</span>
                        <h3 class="slide-title">${article.title}</h3>
                        <p class="slide-excerpt">${article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
                        <button class="btn" data-id="${article.id}">Lire l'article</button>
                    </div>
                </div>
            `;

            controlsHTML += `<div class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`;
        });

        // Ajouter la navigation et les contrôles
        carouselHTML += `
            <div class="carousel-nav">
                <button class="carousel-btn" id="prevSlide">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-btn" id="nextSlide">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="carousel-controls">
                ${controlsHTML}
            </div>
        `;

        featuredCarousel.innerHTML = carouselHTML;

        // Initialiser le carrousel
        initCarousel();

        // Ajouter les gestionnaires d'événements pour les boutons "Lire l'article"
        document.querySelectorAll('.featured-carousel .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const articleId = parseInt(this.dataset.id);
                showArticleDetail(articleId);
            });
        });
    }

    // Initialisation du carrousel
    function initCarousel() {
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const carouselDots = document.querySelectorAll('.carousel-dot');
        const prevSlideBtn = document.getElementById('prevSlide');
        const nextSlideBtn = document.getElementById('nextSlide');

        if (carouselSlides.length === 0) return;

        // Démarrer le défilement automatique
        clearInterval(state.carouselInterval);
        state.carouselInterval = setInterval(nextSlide, 5000);

        // Ajouter les gestionnaires d'événements pour les points
        carouselDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.dataset.slide);
                goToSlide(slideIndex);
            });
        });

        // Navigation précédent/suivant
        prevSlideBtn.addEventListener('click', prevSlide);
        nextSlideBtn.addEventListener('click', nextSlide);

        function nextSlide() {
            const nextSlideIndex = (state.currentSlide + 1) % carouselSlides.length;
            goToSlide(nextSlideIndex);
        }

        function prevSlide() {
            const prevSlideIndex = (state.currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
            goToSlide(prevSlideIndex);
        }

        function goToSlide(slideIndex) {
            // Retirer la classe active de la diapositive actuelle
            carouselSlides[state.currentSlide].classList.remove('active');
            carouselDots[state.currentSlide].classList.remove('active');

            // Mettre à jour l'index de la diapositive actuelle
            state.currentSlide = slideIndex;

            // Ajouter la classe active à la nouvelle diapositive
            carouselSlides[state.currentSlide].classList.add('active');
            carouselDots[state.currentSlide].classList.add('active');

            // Réinitialiser le minuteur
            clearInterval(state.carouselInterval);
            state.carouselInterval = setInterval(nextSlide, 5000);
        }
    }

    // Obtenir l'ID YouTube à partir de l'URL
    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Ouvrir le formulaire pour un nouvel article
    function openFormForNewArticle() {
        form.reset();
        editorContent.innerHTML = "";
        state.editingArticleId = null;
        formTitle.textContent = "Publier un Nouvel Article";
        submitBtn.textContent = "Publier l'article";
        deleteBtn.style.display = 'none';
        featuredCheckbox.checked = false;
        imagePreview.style.display = 'none';
        state.currentImageData = null;
        state.currentPdfData = null;

        // Réinitialiser le sélecteur de média
        mediaTypeButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('.media-type-btn[data-type="image"]').classList.add('active');
        mediaUploads.forEach(upload => upload.style.display = 'none');
        document.querySelector('.media-upload[data-type="image"]').style.display = 'block';

        document.getElementById('admin-form').style.display = 'block';
        window.scrollTo({
            top: document.getElementById('admin-form').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // Fermer le formulaire
    closeFormBtn.addEventListener('click', function() {
        document.getElementById('admin-form').style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        document.getElementById('admin-form').style.display = 'none';
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupérer les données du formulaire
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const author = document.getElementById('author').value;
        const content = editorContent.innerHTML;
        const featured = featuredCheckbox.checked;
        const date = new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        // Déterminer le type de média
        const mediaType = document.querySelector('.media-type-btn.active').dataset.type;
        let media = { type: mediaType };

        if (mediaType === "image") {
            media.url = state.currentImageData || "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 100);
        } else if (mediaType === "video") {
            media.url = videoUrl.value || "https://www.youtube.com/embed/dQw4w9WgXcQ";
        } else if (mediaType === "pdf") {
            media = {
                type: "pdf",
                url: state.currentPdfData || "#",
                filename: "document.pdf"
            };
        }

        // Créer un nouvel article ou mettre à jour un existant
        if (state.editingArticleId) {
            // Mise à jour d'un article existant
            const articleIndex = state.articles.findIndex(a => a.id === state.editingArticleId);
            if (articleIndex !== -1) {
                state.articles[articleIndex] = {
                    ...state.articles[articleIndex],
                    title,
                    category,
                    author,
                    content,
                    media,
                    featured
                };

                // Message de succès
                successText.textContent = "Article mis à jour avec succès !";
            }
        } else {
            // Création d'un nouvel article
            const newArticle = {
                id: Date.now(), // ID unique basé sur le timestamp
                title,
                category,
                author,
                media,
                content,
                date,
                featured
            };

            state.articles.push(newArticle);

            // Message de succès
            successText.textContent = "Article publié avec succès !";
        }

        // Mettre à jour l'affichage
        renderArticles();
        renderCarousel();

        // Afficher le message de succès
        successMessage.style.display = 'block';

        // Réinitialiser après 3 secondes
        setTimeout(function() {
            form.reset();
            editorContent.innerHTML = "";
            successMessage.style.display = 'none';
            imagePreview.style.display = 'none';
            state.currentImageData = null;
            state.currentPdfData = null;
            document.getElementById('admin-form').style.display = 'none';
        }, 3000);
    });

    // Supprimer un article
    deleteBtn.addEventListener('click', function() {
        if (!state.editingArticleId) return;

        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.")) {
            const articleIndex = state.articles.findIndex(a => a.id === state.editingArticleId);
            if (articleIndex !== -1) {
                state.articles.splice(articleIndex, 1);
                renderArticles();
                renderCarousel();
                document.getElementById('admin-form').style.display = 'none';
            }
        }
    });

    // Ouvrir le formulaire pour modifier un article
    function openFormForEdit(article) {
        if (!state.isAdmin) return;

        state.editingArticleId = article.id;
        articleIdInput.value = article.id;

        document.getElementById('title').value = article.title;
        document.getElementById('category').value = article.category;
        document.getElementById('author').value = article.author;
        editorContent.innerHTML = article.content;
        featuredCheckbox.checked = article.featured;

        // Afficher le bon type de média
        mediaTypeButtons.forEach(b => b.classList.remove('active'));
        document.querySelector(`.media-type-btn[data-type="${article.media.type}"]`).classList.add('active');
        mediaUploads.forEach(upload => upload.style.display = 'none');
        document.querySelector(`.media-upload[data-type="${article.media.type}"]`).style.display = 'block';

        // Afficher le média existant
        if (article.media.type === "image") {
            uploadedImage.src = article.media.url;
            imagePreview.style.display = 'block';
            state.currentImageData = article.media.url;
        } else if (article.media.type === "video") {
            videoUrl.value = article.media.url;
        } else if (article.media.type === "pdf") {
            // Ne rien afficher pour le PDF
        }

        formTitle.textContent = "Modifier l'Article";
        submitBtn.textContent = "Mettre à jour";
        deleteBtn.style.display = 'block';

        document.getElementById('admin-form').style.display = 'block';
        window.scrollTo({
            top: document.getElementById('admin-form').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    // Fonctionnalité de glisser-déposer pour l'image
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        imageUploadContainer.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        imageUploadContainer.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        imageUploadContainer.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        imageUploadContainer.classList.add('drag-over');
    }

    function unhighlight() {
        imageUploadContainer.classList.remove('drag-over');
    }

    // Gérer le dépôt de fichier
    imageUploadContainer.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Gérer la sélection de fichier via le bouton
    imageUpload.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // Gérer la sélection de fichier PDF
    pdfUpload.addEventListener('change', function() {
        const files = this.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === "application/pdf") {
                // Dans un vrai projet, on enverrait le fichier au serveur
                // Ici, on simule juste l'upload
                state.currentPdfData = "#";
                alert("PDF téléchargé avec succès !");
            } else {
                alert("Veuillez sélectionner un fichier PDF valide.");
            }
        }
    });

    // Afficher l'aperçu de l'image
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.match('image.*')) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    uploadedImage.src = e.target.result;
                    imagePreview.style.display = 'block';
                    state.currentImageData = e.target.result;
                }

                reader.readAsDataURL(file);
            } else {
                alert("Veuillez sélectionner un fichier image valide (JPG, PNG, etc.).");
            }
        }
    }

    // Supprimer l'image
    removeImageBtn.addEventListener('click', function() {
        imagePreview.style.display = 'none';
        imageUpload.value = '';
        state.currentImageData = null;
    });

    // Éditeur de texte enrichi
    editorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const command = this.dataset.command;
            const value = this.dataset.value;

            if (command === "createLink") {
                const url = prompt("Entrez l'URL du lien:", "https://");
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else if (value) {
                document.execCommand(command, false, value);
            } else {
                document.execCommand(command, false, null);
            }

            editorContent.focus();
        });
    });

    // Cacher les boutons d'édition initialement
    document.querySelectorAll('.edit-btn').forEach(btn => btn.style.display = 'none');
});
