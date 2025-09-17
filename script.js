// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const guestNameElement = document.getElementById('guest-name');
    const openButton = document.getElementById('open-invitation');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('background-music');

    // --- Mengatur data dari config ---
    function populateData() {
        // Tema dan Font
        root.style.setProperty('--theme-color', config.themeColor);
        root.style.setProperty('--font-judul', config.fontJudul);
        root.style.setProperty('--font-konten', config.fontKonten);
        
        // Google Fonts Link
        const fontLink1 = document.createElement('link');
        fontLink1.href = `https://fonts.googleapis.com/css2?family=${config.fontJudul.split("'")[1].replace(' ', '+')}:wght@400&display=swap`;
        fontLink1.rel = 'stylesheet';
        document.head.appendChild(fontLink1);

        const fontLink2 = document.createElement('link');
        fontLink2.href = `https://fonts.googleapis.com/css2?family=${config.fontKonten.split("'")[1].replace(' ', '+')}:wght@400;700&display=swap`;
        fontLink2.rel = 'stylesheet';
        document.head.appendChild(fontLink2);

        // Data Teks
        document.getElementById('couple-name-landing').textContent = config.coupleName;
        document.getElementById('intro-text').textContent = config.introText;
        document.getElementById('open-invitation').textContent = config.buttonText;
        document.getElementById('groom-name').textContent = config.groomName;
        document.getElementById('bride-name').textContent = config.brideName;
        document.getElementById('groom-parents').textContent = `Putra dari ${config.groomParents}`;
        document.getElementById('bride-parents').textContent = `Putri dari ${config.brideParents}`;
        
        document.getElementById('akad-date').textContent = config.akadNikah.date;
        document.getElementById('akad-time').textContent = config.akadNikah.time;
        document.getElementById('akad-location').textContent = config.akadNikah.location;
        
        document.getElementById('resepsi-date').textContent = config.resepsi.date;
        document.getElementById('resepsi-time').textContent = config.resepsi.time;
        document.getElementById('resepsi-location').textContent = config.resepsi.location;
        
        document.getElementById('gmaps-link').href = config.googleMapsLink;
        document.getElementById('hadith-text').textContent = config.hadith;
        document.getElementById('hadith-source').textContent = config.hadithSource;
        
        document.getElementById('footer-name').textContent = config.footerName;
        document.getElementById('footer-tiktok').textContent = `@${config.footerTiktokUsername}`;
        document.getElementById('footer-tiktok').href = `https://tiktok.com/@${config.footerTiktokUsername}`;
    }

    // --- Mendapatkan Nama Tamu dari URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    guestNameElement.textContent = guestName ? guestName : 'Tamu Undangan';

    // --- Countdown Timer ---
    function startCountdown() {
        const eventTime = new Date(config.eventDate).getTime();
        const countdownElement = document.getElementById('countdown');

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventTime - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "<div class='h4'>Acara Telah Berlangsung</div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    // --- Membuat Galeri Foto ---
function populateGallery() {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = '';

    config.gallery.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photo}" alt="Gallery ${index + 1}" loading="lazy">
        `;
        gallery.appendChild(galleryItem);
    });
}


    
    // --- Efek Hati Berjatuhan ---
    function startFallingHearts() {
        if (!config.fallingHeartsEnabled) return;
        
        const container = document.body;
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '❤';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
            heart.style.fontSize = `${Math.random() * 12 + 10}px`;
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }

    // --- Tombol "Buka Undangan" ---
    openButton.addEventListener('click', () => {
        landingPage.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'scale(1.2)';

        setTimeout(() => {
            landingPage.style.display = 'none';
            mainContent.style.display = 'block';
            document.body.style.overflowY = 'auto'; // Mengizinkan scroll

            // Smooth scroll ke section berikutnya
            document.getElementById('bride-groom-section').scrollIntoView({
                behavior: 'smooth'
            });

            // Putar Musik
            if (config.musicEnabled) {
                audio.src = config.musicFile;
                audio.play().catch(e => console.error("Autoplay musik gagal:", e));
            }
            
            startFallingHearts();

        }, 1500); // Tunggu transisi selesai
    });
    
    // --- Efek Animasi saat Scroll ---
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Inisialisasi ---
    populateData();
    startCountdown();
    populateGallery();

    // Mengaktifkan light-box untuk galeri (membutuhkan bootstrap.bundle.min.js dan ekko-lightbox.js)
    //document.addEventListener('click', '[data-toggle="lightbox"]', function(event) {
      //  event.preventDefault();
        // Pastikan Anda sudah menyertakan library ekko-lightbox untuk fungsionalitas ini
        // Contoh: new EkkoLightbox(this); 
        // Karena ini statis, kita bisa buka di tab baru sebagai fallback sederhana
      //  window.open(this.href, '_blank');
   // });
});