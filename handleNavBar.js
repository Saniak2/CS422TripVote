// document.addEventListener('scroll', function () {
//     const currentSectionId = determineCurrentSectionId();

//     document.querySelectorAll('.navbar .navbar-nav .nav-link').forEach(link => {
//         if (link.getAttribute('href') === '#' + currentSectionId) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
// });

// function determineCurrentSectionId() {
//     const sections = document.querySelectorAll('section');
//     let currentSectionId = '';

//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;

//         if (pageYOffset >= sectionTop - sectionHeight / 3) {
//             currentSectionId = section.getAttribute('id');
//         }
//     });

//     return currentSectionId;
// }
