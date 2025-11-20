var slideIndex = 1;
var t = setTimeout(function () { }, 0);
showSlides(slideIndex);

function plusSlides(slideCount) {
    showSlides(slideIndex += slideCount);
}

function currentSlide(slideNumber) {
    showSlides(slideIndex = slideNumber);
}

function showSlides(slideNumber) {
    var i;
    clearTimeout(t)
    var carousel = document.getElementsByClassName("hero-banner-carousel");
    var autoSlide = $(carousel[0]).attr('data-auto-slide');
    var duration = $(carousel[0]).attr('data-duration')
    var showDots = $(carousel[0]).attr('data-show-dots')

    var slides = document.getElementsByClassName("hero-banner-carousel-item");

    if (slideNumber == undefined) {
        slideIndex++;
        slideNumber = slideIndex;
    }
    if (slideNumber > slides.length) { slideIndex = 1 }

    if (slideNumber < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    if (showDots != undefined && showDots.toLowerCase() == 'true') {
        var dots = document.getElementsByClassName("hero-banner-carousel-item__dot");
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[slideIndex - 1].className += " active";
    }

    if (slides[slideIndex - 1] != undefined) {
        slides[slideIndex - 1].style.display = "block";
    }

    if (autoSlide != undefined && autoSlide.toLowerCase() == 'true') {
        if (!isNaN(Number(duration))) {
            if (Number(duration) > 0) {
                t = setTimeout(showSlides, Number(duration));
            }
        } else {
            t = setTimeout(showSlides, 5000); // Change image every 5 seconds
        }
    }
}