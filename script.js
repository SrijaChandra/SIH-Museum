document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.banner-text .word');
    const museumTitle = document.querySelector('.museum-section h2');
    let lastScrollTop = 0;
    
    // Function to animate the words
    function animateWords() {
        words.forEach((word, index) => {
            word.style.opacity = '0';
            word.style.transform = 'translateY(40px) scale(1.2)';
            setTimeout(() => {
                word.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out ${index * 0.1}s`;
                word.style.opacity = '1';
                word.style.transform = 'translateY(0) scale(1)';
            }, 50);
        });
    }

    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateWords();
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the banner is visible

    // Observe the banner
    const banner = document.querySelector('.banner');
    observer.observe(banner);

    // Trigger animation on scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            animateWords();
            animateMuseumTitle();
            lastScrollTop = scrollTop;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Existing card animation code
    const cards = document.querySelectorAll('.card');
    let activeCard = null;

    // Card animation and sliding effect
    function animateCards() {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(100px)';
            setTimeout(() => {
                card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out ${index * 0.1}s`;
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 50);
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (activeCard && activeCard !== card) {
                activeCard.style.transform = 'scale(1)';
            }
            if (activeCard !== card) {
                card.style.transform = 'scale(1.1)';
                activeCard = card;
            } else {
                card.style.transform = 'scale(1)';
                activeCard = null;
            }
        });

        card.addEventListener('dblclick', () => {
            card.classList.toggle('flipped');
        });
    });

    // Intersection Observer for cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCards();
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const cardContainer = document.querySelector('.card-container');
    cardObserver.observe(cardContainer);

    // Modify the handleScroll function to include card animation
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            animateWords();
            animateMuseumTitle();
            animateCards();
            lastScrollTop = scrollTop;
        }
    }

    // Remove or comment out the card slider code
    /*
    const cardContainer = document.querySelector('.card-container');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;

    function updateSlider() {
        // ...
    }

    prevBtn.addEventListener('click', () => {
        // ...
    });

    nextBtn.addEventListener('click', () => {
        // ...
    });
    */

    // Modified code for "Museums in Kolkata" text animation
    function animateMuseumTitle() {
        museumTitle.style.opacity = '0';
        museumTitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            museumTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            museumTitle.style.opacity = '1';
            museumTitle.style.transform = 'translateY(0)';
        }, 100);
    }

    // Initial animation on page load
    animateWords();
    animateMuseumTitle();
    animateCards();

});
