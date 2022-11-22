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
    console.log("GENRE: ", genre);
    
    if (genre == 'rap') {
        colour = '--red';
    } else if (genre == 'pop') {

    } else if (genre == 'r&b') {

    } else if (genre == 'indie') {

    } else if (genre == 'soul') {

    } else if (genre == 'rock') {

    } else if (genre == 'country') {

    } else if (genre == 'gospel') {

    } else if (genre == 'ambient') {

    } else if (genre == 'electronic') {

    } else if (genre == 'classical') {

    } else if (genre == 'jazz') {

    } else if (genre == 'other') {

    }
};

function coverColour(genresArr) {
    var topGenres = genresArr;
    console.log(topGenres);

    let genresLength = topGenres.length;
    console.log(genresLength);

    if (genresLength == 1) {
        getColour(topGenres[0]);
    }


};

smallCover.style.backgroundColor =  "var(--dark-blue)";
coverContent.style.backgroundColor =  "var(--dark-blue)";
