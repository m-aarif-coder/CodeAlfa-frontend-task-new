const cards = document.querySelectorAll(".image-card");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const filterButtons = document.querySelectorAll(".filters button");

let visibleCards = [...cards];
let currentIndex = 0;


// Open Lightbox

function openLightbox(index) {

    currentIndex = index;

    const card = visibleCards[currentIndex];

    const image = card.querySelector("img");

    const title = card.querySelector("h3").textContent;

    lightboxImg.src = image.src;

    lightboxImg.alt = image.alt;

    caption.textContent = title;

    lightbox.classList.add("show");
}


// Close Lightbox

function closeLightbox() {

    lightbox.classList.remove("show");

}


// Next Image

function nextImage() {

    currentIndex++;

    if (currentIndex >= visibleCards.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}


// Previous Image

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleCards.length - 1;
    }

    openLightbox(currentIndex);
}


// Card Click

cards.forEach(card => {

    card.addEventListener("click", () => {

        const index = visibleCards.indexOf(card);

        openLightbox(index);

    });

});


// Buttons

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);


// Filter

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        visibleCards = [];

        cards.forEach(card => {

            if (filter === "all" ||
                card.dataset.category === filter) {

                card.style.display = "block";

                visibleCards.push(card);

            } else {

                card.style.display = "none";

            }

        });

    });

});


// Keyboard Controls

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

});