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
    smallCover.style.opacity = 0.95;
});


smallCover.addEventListener("mouseout", function() {
    smallCover.style.opacity = 1.0;
});


largeCover.addEventListener("click", () => {
    if(!coverFlipped) {
        coverContent.style.transform = "rotateY(179.9deg)"
        coverContent.style.webkitTransform = "rotateY(179.9deg)"
    }   else {
        coverContent.style.transform = "rotateY(0deg)"
        coverContent.style.webkitTransform = "rotateY(0deg)"
    }
    coverFlipped = !coverFlipped;
});


var genre_dict = {'rap' : 'var(--dark-blue)', 
                  'pop' : 'var(--sky-blue)',
                  'r&b' : 'var(--purple)',
                  'indie' : 'var(--green)',
                  'soul' : 'var(--orange)',
                  'rock' : 'var(--crimson)', 
                  'country' : 'var(--yellow)', 
                  'gospel' : 'var(--brown)', 
                  'ambient' : 'var(--teal)', 
                  'electronic' : 'var(--silver)', 
                  'classical' : 'var(--lavender)', 
                  'jazz' : 'var(--pink)', 
                  'other' : 'var(--grey)'
                };


function getColor(genre) {
    console.log("GENRE: ", genre);
    var color = genre_dict[genre];
    
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
        firstColor = getColor(topGenres[1]);
        secondColor = getColor(topGenres[0]);
        smallCover.style.background =  `linear-gradient(${firstColor}, ${secondColor})`;
        coverContent.style.background = `linear-gradient(${firstColor}, ${secondColor})`;
    }
};
