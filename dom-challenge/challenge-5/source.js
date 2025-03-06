const images = [
    {
        src: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Beautiful Mountain Landscape",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Ocean Sunset View",
    },
    {
        src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Autumn Forest Path",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Urban City Skyline",
    },
];

let currentIndex = 0;
let interval;

const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const autoPlayButton = document.getElementById("autoPlayButton");
const timerDisplay = document.getElementById("timerDisplay");
const carouselNav = document.getElementById("carouselNav");

function initializeCarousel() {
    images.forEach((img, index) => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");
        slide.style.backgroundImage = `url(${img.src})`;
        carouselTrack.appendChild(slide);
        
        const indicator = document.createElement("span");
        indicator.classList.add("carousel-indicator");
        if (index === 0) indicator.classList.add("active");
        indicator.onclick = () => goToImage(index);
        carouselNav.appendChild(indicator);
    });
    updateCarousel();
}

function updateCarousel() {
    carouselTrack.style.transform = `translateX(${-currentIndex * 100}%)`;
    caption.textContent = images[currentIndex].caption;
    document.querySelectorAll(".carousel-indicator").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
}

function goToImage(index) {
    currentIndex = index;
    updateCarousel();
}

function togglePlay() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        autoPlayButton.innerText = "Start Auto Play";
        timerDisplay.innerText = "";
    } else {
        interval = setInterval(nextImage, 2000);
        autoPlayButton.innerText = "Stop Auto Play";
        let timeLeft = 2;
        timerDisplay.innerText = `Next in ${timeLeft}s`;
        interval = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) timeLeft = 2;
            timerDisplay.innerText = `Next in ${timeLeft}s`;
        }, 1000);
    }
}

prevButton.addEventListener("click", prevImage);
nextButton.addEventListener("click", nextImage);
autoPlayButton.addEventListener("click", togglePlay);

initializeCarousel();