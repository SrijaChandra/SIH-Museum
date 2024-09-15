document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.banner-text .word');
    const museumTitle = document.querySelector('.museum-section h2');
    let lastScrollTop = 0;
    
    // Function to animate the words (keep this for initial animation)
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

    // Remove the Intersection Observer for the banner

    // Modify the handleScroll function to remove animateWords
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            animateMuseumTitle();
            animateCards();
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
            if (index === 0) {
                // Set the first card to be visible without animation
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out ${index * 0.1}s`;
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 50);
            }
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
    animateWords(); // This will run only once when the page loads
    animateMuseumTitle();
    animateCards();

    // Add this code at the end of your existing JavaScript

    document.addEventListener('DOMContentLoaded', () => {
        const paymentForm = document.querySelector('.payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Here you would typically send the form data to your server
                alert('Payment processing... This is a demo.');
            });
        }
    });
});
