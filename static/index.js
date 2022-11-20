const small_cover = document.querySelector(".cover");
const vinyl = document.querySelector(".vinyl");
const large_cover = document.querySelector(".large-cover");
const coverContent = document.querySelector(".large-cover-inner");

let cover_flipped = false;
let small_cover_clicked = false;

small_cover.addEventListener("click", () => {
    if(!small_cover_clicked) {
        vinyl.style.transform = "translate(450px, 0) rotate(0deg)"
    }   else {
        vinyl.style.transform = "translate(50px, 0) rotate(-180deg)"
    }
    small_cover_clicked = !small_cover_clicked;
});

large_cover.addEventListener("click", () => {
    if(!cover_flipped) {
        coverContent.style.transform = "rotateY(180deg)"
    }   else {
        coverContent.style.transform = "rotateY(0deg)"
    }
    cover_flipped = !cover_flipped;
});

