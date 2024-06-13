document.addEventListener("DOMContentLoaded", function () {
    const projectItems = document.querySelectorAll('.project-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('project-link');
    const transitionElement = document.querySelector('.page-transition');

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

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let target = this.getAttribute('href');
        
            transitionElement.classList.add('active');

            setTimeout(() => {
                window.location.href = target;
            }, 500); // Duration should match the CSS transition duration
        });
    });

    // Custom smooth scroll function
    // function smoothScroll(target) {
    //     const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    //     const startPosition = window.scrollY;
    //     const distance = targetPosition - startPosition;
    //     const duration = 2000; // Adjust duration for slower scroll
    //     let start = null;

    //     function step(timestamp) {
    //         if (!start) start = timestamp;
    //         const progress = timestamp - start;
    //         const ease = progress / duration;
    //         const easedPosition = ease * distance + startPosition;

    //         window.scrollTo(0, easedPosition);

    //         if (progress < duration) {
    //             window.requestAnimationFrame(step);
    //         }
    //     }

    //     window.requestAnimationFrame(step);
    // }



    // navLinks.forEach(link => {
    //     link.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetSection = document.getElementById(targetId);

    //         // Scroll to the target section smoothly
    //         smoothScroll(targetSection);

    //         // Remove active class from all nav links
    //         navLinks.forEach(link => link.classList.remove('active'));
    //         // Add active class to the clicked nav link
    //         this.classList.add('active');
    //     });
    // });

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





