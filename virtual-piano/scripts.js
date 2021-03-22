let fullscreenFlag = false;

note.onclick = function (event) {
    document.getElementById('note').classList.add("btn-active");
    document.getElementById('letter').classList.remove("btn-active");

    const pianoKeys = document.getElementsByClassName('piano-key');

    for (let piano of pianoKeys) {
        piano.classList.remove("piano-key-letter");
    }
}

letter.onclick = function (event) {
    document.getElementById('note').classList.remove("btn-active");
    document.getElementById('letter').classList.add("btn-active");
    const pianoKeys = document.getElementsByClassName('piano-key');

    for (let piano of pianoKeys) {
        piano.classList.add("piano-key-letter");
    }
}

fullscreen.onclick = function (event) {
    if (fullscreenFlag) {
        fullscreenFlag = false;
        deactivateFullscreen();
    } else {
        fullscreenFlag = true;
        activateFullscreen(document.documentElement);

    }
}

document.documentElement.onkeydown = document.documentElement.onkeyup = document.documentElement.onkeypress = handle;


function handle(e) {
    const key = e.code.substring(e.code.indexOf('Key') + 3);
    if (key == 'D' || key == 'F' || key == 'G' || key == 'H' || key == 'J' || key == 'K' || key == 'L') {

        const el = '[data-letter~="' + key + '"]';
        if (e.type == 'keydown') {
            document.querySelectorAll(el)[0].classList.add("piano-key-active");
            playLetter(key);
        }
        if (e.type == 'keyup') {
            document.querySelectorAll(el)[0].classList.remove("piano-key-active");
        }
    }
}

document.documentElement.onmousedown = function (event) {
    const mode = document.getElementsByClassName("btn-active")[0].id;
    event.target.classList.add("piano-key-active");
    if (event.target.dataset[mode]) {
        playLetter(event.target.dataset[mode]);
    }
}

document.documentElement.onmouseup = function (event) {
    event.target.classList.remove("piano-key-active");
}

document.documentElement.onmouseout= function (event) {
   if (event.which == 1){
        const mode = document.getElementsByClassName("btn-active")[0].id;
        event.target.classList.add("piano-key-active");
        if (event.target.dataset[mode]) {
            playLetter(event.target.dataset[mode]);
        }
    }
}
document.documentElement.onmouseover= function (event) {
  
    if (event.which == 1){
        event.target.classList.remove("piano-key-active");
    }
}


function activateFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function deactivateFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

function playLetter(letter) {
    const path = "assets\\audio\\";
    const snd = new Audio(path + letter + ".mp3");
    snd.play();
}