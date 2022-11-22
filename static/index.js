const smallCover = document.querySelector(".cover");
const vinyl = document.querySelector(".vinyl");
const largeCover = document.querySelector(".large-cover");
const coverContent = document.querySelector(".large-cover-inner");

let coverFlipped = false;
let smallCoverClicked = false;

smallCover.addEventListener("click", () => {
    if(!smallCoverClicked) {
        vinyl.style.transform = "translate(450px, 0) rotate(0deg)"
    }   else {
        vinyl.style.transform = "translate(50px, 0) rotate(-180deg)"
    }
    smallCoverClicked = !smallCoverClicked;
});

largeCover.addEventListener("click", () => {
    if(!coverFlipped) {
        coverContent.style.transform = "rotateY(180deg)"
    }   else {
        coverContent.style.transform = "rotateY(0deg)"
    }
    coverFlipped = !coverFlipped;
});

function getColour(genre) {
    
};

function coverColour(genresArr) {
    var topGenres = genresArr;
    console.log(topGenres);

    let genresLength = topGenres.length;
    console.log(genresLength);


};

smallCover.style.backgroundColor =  "#555";
coverContent.style.backgroundColor = "#555";
