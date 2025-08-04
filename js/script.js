document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const sliderContainer = document.querySelector('.slider-container');
    let currentSlide = 0;

    function updateSliderPosition() {
        const currentSlideElement = slides[currentSlide];
        if (!currentSlideElement) return;

        // Calculate the position needed to center the slide
        const containerCenterX = sliderContainer.offsetWidth / 2;
        const slideCenterX = currentSlideElement.offsetLeft + (currentSlideElement.offsetWidth / 2);
        const transformValue = containerCenterX - slideCenterX;

        slider.style.transform = `translateX(${transformValue}px)`;

        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderPosition();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Ensure images are loaded before calculating width
    window.addEventListener('load', () => {
        updateSliderPosition();
        // Add transition after initial positioning to prevent flickr
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    });

    // Recalculate on window resize
    window.addEventListener('resize', updateSliderPosition);

    // --- Language Switcher ---
    const translations = {
        ja: {
            'site-title': '見附島アーカイブ',
            'nav-history': '見附島の歴史',
            'nav-damage': '地震被害',
            'nav-photos': '写真収集',
            'history-title': '見附島の歴史',
            'history-text': 'ここに「見附島の歴史」に関する文章が入ります。弘法大師が佐渡島から能登半島へ渡る際に、この島を見つけて「見附島」と名付けたという伝説があります。',
            'damage-title': '地震の被害',
            'damage-text': 'ここに「地震の被害」に関する文章が入ります。近年発生した地震により、島の形状に変化がありました。被害の状況と復興への取り組みについて説明します。',
            'photos-title': '写真の収集',
            'photos-text': 'ここに「写真の収集」に関する文章が入ります。昔から現在までの見附島の写真を募集しています。提供方法や注意事項について記載します。'
        },
        en: {
            'site-title': 'Mitsukejima Archive',
            'nav-history': 'History of Mitsukejima',
            'nav-damage': 'Earthquake Damage',
            'nav-photos': 'Photo Collection',
            'history-title': 'History of Mitsukejima',
            'history-text': 'This is the text about the history of Mitsukejima. Legend says that Kobo Daishi named the island "Mitsukejima" when he found it while traveling from Sado Island to the Noto Peninsula.',
            'damage-title': 'Earthquake Damage',
            'damage-text': 'This is the text about the earthquake damage. The shape of the island has changed due to recent earthquakes. This section explains the extent of the damage and the efforts toward recovery.',
            'photos-title': 'Photo Collection',
            'photos-text': 'This is the text about photo collection. We are looking for photos of Mitsukejima from the past to the present. This section describes how to submit photos and important notes.'
        }
    };

    const languageSelector = document.getElementById('language-selector');

    function changeLanguage(lang) {
        if (!translations[lang]) return;

        // Update site title
        document.getElementById('site-title').textContent = translations[lang]['site-title'];

        // Update nav
        document.getElementById('nav-history').textContent = translations[lang]['nav-history'];
        document.getElementById('nav-damage').textContent = translations[lang]['nav-damage'];
        document.getElementById('nav-photos').textContent = translations[lang]['nav-photos'];

        // Update content
        document.getElementById('history-title').textContent = translations[lang]['history-title'];
        document.getElementById('history-text').textContent = translations[lang]['history-text'];
        document.getElementById('damage-title').textContent = translations[lang]['damage-title'];
        document.getElementById('damage-text').textContent = translations[lang]['damage-text'];
        document.getElementById('photos-title').textContent = translations[lang]['photos-title'];
        document.getElementById('photos-text').textContent = translations[lang]['photos-text'];
    }

    languageSelector.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    // Set initial language (optional, defaults to Japanese)
    changeLanguage('ja');
});
