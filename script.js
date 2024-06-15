document.addEventListener("DOMContentLoaded", function () {
    const projectItems = document.querySelectorAll('.project-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');


    const links = document.querySelectorAll('.project-link');
    const transitionElement = document.querySelector('.page-transition');
    const scrollToTopButton = document.querySelector('.pfeil-icon');

    // Smooth scrolling to top for the button
    scrollToTopButton.addEventListener('click', function() {
        document.documentElement.scrollIntoView({
            behavior: 'smooth'
        });
    });


    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let target = this.getAttribute('href');
        
            transitionElement.classList.add("active");

            setTimeout(() => {
                window.location.href = target;
            },500); // Duration should match the CSS transition duration
        });
    });

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("show");
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    projectItems.forEach(project => {
        appearOnScroll.observe(project);
    });

    
    // Function to highlight nav link based on scroll position
    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        if (window.scrollY === 0) {
            current = 'about';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Initial highlight
    highlightNavLink();
    // Highlight nav link on scroll
    window.addEventListener('scroll', highlightNavLink);

});