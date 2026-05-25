const carousel = new BootstrapCarousel();
carousel.render(document.body);
const stars = new FloatingStars(80);
stars.render(document.body);
stars.start();
console.log("**************", stars.count);