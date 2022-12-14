const smallCover = document.querySelector(".cover");
const vinyl = document.querySelector(".vinyl");
const largeCover = document.querySelector(".large-cover");
const coverContent = document.querySelector(".large-cover-inner");
const innerBox = document.querySelector(".inner-box");
const shapes = document.querySelectorAll(".shapes");
const disk = document.querySelector(".label");
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
var genre_dict = {
    'rap' : 'var(--dark-blue)', 
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
}


function getColor(genre) {
    console.log("GENRE: ", genre);
    var color = genre_dict[genre];
    
    return color;
}


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
}


function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}


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
}

function labToRGB(lab){
    var y = (lab[0] + 16) / 116,
        x = lab[1] / 500 + y,
        z = y - lab[2] / 200,
        r, g, b;
  
    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);
  
    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;
  
    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;
  
    return `rgb(${Math.max(0, Math.min(1, r)) * 255}, 
            ${Math.max(0, Math.min(1, g)) * 255}, 
            ${Math.max(0, Math.min(1, b)) * 255})`
}


// Based on research from Palmer et al. (2013) where L x1.5, a x10, b x3
//  Values represent [L, a, b] coordinates
var color_map = {
    '(slow, minor)' : [30, 0, -120],
    '(slow, major)' : [75, -120, -105],
    '(med, minor)' : [52.5, -100, -105],
    '(med, major)' : [71.25, 120, 0],
    '(fast, minor)' : [67.5, 0, -15],
    '(fast, major)' : [90, 100, 30]
}


// Spotify tempo typically ranges between 60-180
function getTempo(tempo) {
    var tempo = '';
    if (inRange(tempo, 0, 100)) {
        tempo = 'slow';
    } else if (inRange(tempo, 100, 140)) {
        tempo = 'medium';
    } else {
        tempo = 'fast';
    }
    return tempo;
}


function getMode(mode) {
    var mode = '';
    if (inRange(mode, 0, 0.5)) { 
        mode = 'minor';
    } else {
        mode = 'major';
    }
    return mode;
}


function generateShapeColor(features) {
    var tempo = getTempo(features.tempo);
    console.log(tempo);
    var mode = getMode(features.mode);
    console.log(mode);

    var key = `(${tempo}, ${mode})`;
    var lab_values = color_map[key];

    var l = lab_values[0];
    var a = lab_values[1];
    var b = lab_values[2];

    return [l, a, b];
}

var energy_dict = {
    0.125 : 'var(--wave1)',
    0.250 : 'var(--wave2)',
    0.375 : 'var(--wave3)',
    0.5 : 'var(--wave4)',
    0.625 : 'var(--wave5)',
    0.750 : 'var(--wave6)',
    0.875 : 'var(--wave7)',
    1.0 : 'var(--wave8)',
}

function generateDiskColor(energy) {
    var keys = Object.keys(energy_dict);
    var color;
    // console.log(energy, keys);
    for (var i = 0, j = 1; i, j < keys.length; i++, j++) {
        // console.log(i, j)
        if ((energy >= keys[i]) && (energy <= keys[j])) {
            color = energy_dict[keys[i]];
            console.log(color);
        }
    }
    disk.style.backgroundColor = color;
    // console.log(color);
}

// No browser support for LAB so must convert to RGB
function colorShapes(features) {
    var color = labToRGB(generateShapeColor(features));
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].style.background = color;
    }
}

// Big function to run all customization
function customize(genresArr, features) {
    var loudness = features.loudness;
    console.log(loudness);
    coverColor(genresArr);
    tracklistOutline(loudness);
    colorShapes(features);
    generateDiskColor(features.energy);
}