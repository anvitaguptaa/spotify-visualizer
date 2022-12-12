const smallCover = document.querySelector(".cover");
const vinyl = document.querySelector(".vinyl");
const largeCover = document.querySelector(".large-cover");
const coverContent = document.querySelector(".large-cover-inner");
const innerBox = document.querySelector(".inner-box");
const shapes = document.querySelectorAll(".shapes");
// let shapes = document.getElementsByClassName('shapes');
// console.log(shapes);
let coverFlipped = false;
let smallCoverClicked = false;


smallCover.addEventListener("click", () => {
    if(!smallCoverClicked) {
        vinyl.style.webkitTransform = "translate(450px, 0) rotate(0deg)"
        vinyl.style.transform = "translate(450px, 0) rotate(0deg)"
    }   else {
        vinyl.style.transform = "translate(50px, 0) rotate(-180deg)"
        vinyl.style.webkitTransform = "translate(50px, 0) rotate(-180deg)"
    }
    smallCoverClicked = !smallCoverClicked;
});


smallCover.addEventListener("mouseover", function() {
    smallCover.style.opacity = 0.97;
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

// Abstract this
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
    let genresLength = genresArr.length;
    console.log(genresLength);

    if (genresLength == 1) {
        color = getColor(genresArr[0]);
        smallCover.style.backgroundColor =  color;
        coverContent.style.backgroundColor = color;
    } else {
        firstColor = getColor(genresArr[1]);
        secondColor = getColor(genresArr[0]);
        smallCover.style.background =  `linear-gradient(${firstColor}, ${secondColor})`;
        coverContent.style.background = `linear-gradient(${firstColor}, ${secondColor})`;
    }
};


function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
};


function tracklistOutline(loudness) {
    var line = '';
    if (inRange(loudness, -60, -46)) {
        line = 'dotted';
    } else if (inRange(loudness, -45, -31)) {
        line = 'dashed';
    } else if (inRange(loudness, -30, -16)) {
        line = 'solid';
    } else {
        line = 'double';
    }
    innerBox.style.outline = line + ' 3.5px white';
};


function colorShapes() {
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].style.background = '#000';
    }
};

// Big function to run all customization
function customize(genresArr, features) {
    var loudness = features['loudness'];
    console.log(loudness);
    coverColor(genresArr);
    tracklistOutline(loudness);
    colorShapes();
};