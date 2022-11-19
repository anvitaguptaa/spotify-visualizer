const cover = document.querySelector(".large-cover");
const coverContent = document.querySelector(".large-cover-inner");
let flipped = false;

cover.addEventListener("click", () => {
    if(!flipped) {
        coverContent.style.transform = "rotateY(180deg)"
    }   else {
        coverContent.style.transform = "rotateY(0deg)"
    }
    flipped = !flipped;
});
