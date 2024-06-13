document.addEventListener("DOMContentLoaded", function() {
    const projectItems = document.querySelectorAll('.project-item');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
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
});


document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('project-link');
    const transitionElement = document.querySelector('.page-transition');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let target = this.getAttribute('href');
            //ausnahme für die context menu

            transitionElement.classList.add('active');

            setTimeout(() => {
                window.location.href = target;
            }, 500); // Duration should match the CSS transition duration
        });
    });
});

