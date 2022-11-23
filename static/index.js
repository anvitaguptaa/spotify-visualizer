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

smallCover.addEventListener("mouseover", function() {
    smallCover.style.opacity = 0.8;
});

smallCover.addEventListener("mouseout", function() {
    smallCover.style.opacity = 1.0;
});

largeCover.addEventListener("click", () => {
    if(!coverFlipped) {
        coverContent.style.transform = "rotateY(180deg)"
    }   else {
        coverContent.style.transform = "rotateY(0deg)"
    }
    coverFlipped = !coverFlipped;
});


function getColor(genre) {
    console.log("GENRE: ", genre);
    var color = '';
    if (genre == 'rap') {
        color = 'var(--dark-blue)';
    } else if (genre == 'pop') {
        color = 'var(--sky-blue)';
    } else if (genre == 'r&b') {
        color = 'var(--purple)';
    } else if (genre == 'indie') {
        color = 'var(--light-green)';
    } else if (genre == 'soul') {
        color = 'var(--orange)';
    } else if (genre == 'rock') {
        color = 'var(--red)';
    } else if (genre == 'country') {
        color = 'var(--brown)';
    } else if (genre == 'gospel') {
        color = 'var(--sienna)';
    } else if (genre == 'ambient') {
        color = 'var(--yellow-green)';
    } else if (genre == 'electronic') {
        color = 'var(--silver)';
    } else if (genre == 'classical') {
        color = 'var(--lavender)';
    } else if (genre == 'jazz') {
        color = 'var(--pink)';
    } else if (genre == 'other') {
        color = 'var(--grey)';
    }
    return color;
};


function coverColor(genresArr) {
    var topGenres = genresArr;
    console.log(topGenres);

    let genresLength = topGenres.length;
    console.log(genresLength);

    if (genresLength == 1) {
        color = getColor(topGenres[0]);

        smallCover.style.backgroundColor =  color;
        coverContent.style.backgroundColor = color;
    } else {
        firstColor = getColor(topGenres[0]);
        secondColor = getColor(topGenres[1]);

        smallCover.style.background =  `linear-gradient(${firstColor}, ${secondColor})`;
        coverContent.style.background = `linear-gradient(${firstColor}, ${secondColor})`;
    }
};
