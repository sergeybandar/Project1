let id = 0;
let idNow = 0;
const videos = [
    {
        name: "Интерстеллар",
        duration: "",
        poster: "Interstellar.jpg",
        src: `Interstellar.mp4`,
        id: getId(),
    },
    {
        name: "Аватар",
        duration: "",
        poster: "Avatar.jpg",
        src: `Avatar.mp4`,
        id: getId(),
    },
    {
        name: "В сердце моря",
        duration: "",
        poster: "Heart-of-the-Sea.2015.trailer1_720.jpg",
        src: `Heart-of-the-Sea.2015.trailer1_720.mp4`,
        id: getId(),
    },
    {
        name: "Марсианин",
        duration: "",
        poster: "Martian.2015.trailer1_720.jpg",
        src: `Martian.2015.trailer1_720.mp4`,
        id: getId(),
    },
    {
        name: "Выживший",
        duration: "",
        poster: "Revenant.2015.trailer_720.jpg",
        src: `Revenant.2015.trailer_720.mp4`,
        id: getId(),
    },
    {
        name: "Валериан и город тысячи планет",
        duration: "",
        poster: "Valerian.jpg",
        src: `Valerian.mp4`,
        id: getId(),
    },

    {
        name: "1917",
        duration: "",
        poster: "1917-2019_720.jpg",
        src: `1917-2019_720.mp4`,
        id: getId(),
    },

    {
        name: "Хоббит: Нежданное путешествие",
        duration: "",
        poster: "The Hobbit.jpg",
        src: `The Hobbit.mp4`,
        id: getId(),
    },
    
]
const videosBlock = document.getElementById("videos");

for (let i = 0; i < videos.length; i++) {

    videosBlock.appendChild(getBlockPoster(videos[i]));
}

function getBlockPoster(videoObj) {
    const divBlock = document.createElement('div');
    divBlock.innerHTML = `<div id="${videoObj.id}"><div>
    <img src="${videoObj.poster}"></div>
    <div>
    <h3>${videoObj.name}</h3>
         </div></div>`;
    divBlock.setAttribute('class', 'blockPoster');
    return divBlock;
}

function getId() {
    return id++;
}

let modal = document.querySelector('.modal');
let videoBlock = document.querySelector('.videoBlock');
let video = document.getElementById('videoContent');
let path = document.querySelector('.next');

videosBlock.addEventListener('click', function (e) {
    console.log(e.target.tagName);
    if (e.target.tagName === 'IMG' || e.target.tagName === 'H3') {
        modal.style.display = "block";
        idNow = Number(e.target.parentElement.parentElement.getAttribute('id'));
        console.log(idNow);
        console.log(video.src);
        video.src = `${videos[idNow].src}`;
        getRightBlock(idNow);

    }
})

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        let conf = confirm("Закрыть видео?");
        if (conf) {
            video.pause();
            modal.style.display = "none";
        }
    }
})

const RightBlock = document.querySelector(".videoBlockBodyRight");
function getRightBlock(a) {
    if (a === 0 || a === 1 || a === 2) {
        RightBlock.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            RightBlock.appendChild(getBlockPoster(videos[i]));
        }
    } else if (a === videos.length - 1 || a === videos.length - 2 || a === videos.length - 3) {
        RightBlock.innerHTML = "";
        for (let i = videos.length - 5; i < videos.length; i++) {
            RightBlock.appendChild(getBlockPoster(videos[i]));
        }
    } else {
        RightBlock.innerHTML = "";
        for (let i = a - 2; i < a + 3; i++) {
            RightBlock.appendChild(getBlockPoster(videos[i]));
        }
    }
    const posterColor = document.getElementById(`${a}`);
    posterColor.parentNode.style[`background-color`] = '#FF6347';
    posterColor.lastElementChild.firstElementChild.style.color = 'black';

}

RightBlock.addEventListener('click', function (e) {
    console.log(e.target.tagName);
    if (e.target.tagName === 'IMG' || e.target.tagName === 'H3') {
        idNow = Number(e.target.parentElement.parentElement.getAttribute('id'));
        video.src = `${videos[idNow].src}`;
        getRightBlock(idNow);
    }
})

path.addEventListener('click', function (e) {
    if (idNow === videos.length - 1) {
        idNow = 0;
        video.src = `${videos[idNow].src}`;
        getRightBlock(idNow);
    } else {
        idNow++;
        video.src = `${videos[idNow].src}`;
        getRightBlock(idNow);
    }

})


setInterval(function () {
    if (video.duration === video.currentTime) {
        const event = new Event('click');
        path.dispatchEvent(event);
    }
}, 3000)

let playPause = 1;
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const next = document.getElementById('next');
const speed = document.getElementById('speed');
const volume = document.getElementById('volume');

const speedBlock = document.getElementById('speedBlock');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const sound = document.getElementById('sound');
const soundPicture = document.getElementById('soundPicture');
play.addEventListener('click', function () {
    if (playPause === 0) {
        video.play();
        playPause = 1;

        play.innerHTML = `<svg width="20" height="20"><g fill-rule="nonzero" fill="#000000" transform="translate(5, 4)"><rect x="0" y="0" width="3.5" height="12" fill="#ffffff"></rect><rect x="6.5" y="0" width="3.5" height="12" fill="#ffffff"></rect></g></svg>`;
    }
    else if (playPause === 1) {
        video.pause();
        playPause = 0;
        play.innerHTML = `<svg id="play" width="20" height="20"><g fill-rule="nonzero" transform="translate(5, 3)"><polyline points="0.59375 0.48438 0.5625 13.51563 11.4375 7 0.59375 0.48438" fill="#ffffff"></polyline></g></svg>`;
    }
})

speed.addEventListener('mouseover', function () {
    speedBlock.style.display = "block";


    let cords = speed.getBoundingClientRect();
    speedBlock.style.left = `${cords.left - 5}px`;
    speedBlock.style.top = `${cords.top - speedBlock.getBoundingClientRect().height - 5}px`;

    setTimeout(function () {
        speedBlock.style.display = "none";
    }, 5000)
})
window.addEventListener('click', function (e) {
    if (e.target !== speedBlock) {
        speedBlock.style.display = "none";
    }
});
speedBlock.addEventListener('click', function (e) {
    video.playbackRate = e.target.innerText;
})
sound.addEventListener('mouseover', function () {
    volume.style.display = "block";
    setTimeout(function () {
        volume.style.display = "none";
    }, 5000)
})
volume.addEventListener('input', function () {
    video.volume = volume.value / 100;
    if (volume.value <= 5) {
        soundPicture.innerHTML = `<svg width="20" height="20">
        <g fill-rule="nonzero" fill="#000000" transform="translate(3, 2)">
            <polygon
                points="8.8817842e-16 4.3746 8.8817842e-16 10.62539 3.10029 10.62539 7.74143 15 7.74419 0 3.10237 4.37461 1.77635684e-15 4.37461 1.77635684e-15 4.3746"
                fill="#ffffff"></polygon>
            <path
                d="M11.9267767,6.64744791 L9.87932726,4.59999847 L9,5.47932573 L11.0474494,7.52677517 L9,9.57422461 L9.87932726,10.4535519 L11.9267767,8.40610243 L13.9742261,10.4535519 L14.8535534,9.57422461 L12.806104,7.52677517 L14.8535534,5.47932573 L13.9742261,4.59999847 L11.9267767,6.64744791 Z"
                fill="#ffffff"></path>
        </g>
    </svg>`;
    } else {
        soundPicture.innerHTML = `<svg width="20" height="20" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="#ffffff" stroke-width="0"
                d="m2.49931,6.8746l0,6.25079l3.10029,0l4.64114,4.37461l0.00276,-15l-4.64182,4.37461l-3.10237,0l0,-0.00001zm10.44167,-0.75275c-0.26762,-0.30766 -0.69733,-0.30766 -0.96359,0.00158c-0.26557,0.30925 -0.26557,0.80989 0.00136,1.11992l0,-0.00157c0.58769,0.68334 0.94997,1.62056 0.94997,2.66218c0,1.04083 -0.3616,1.97489 -0.94861,2.65823c-0.2683,0.30766 -0.2683,0.8083 -0.00136,1.11912c0.13279,0.15423 0.30713,0.23173 0.48146,0.23173c0.17501,0 0.34934,-0.0775 0.48213,-0.23173c0.83216,-0.9649 1.34835,-2.30548 1.34767,-3.77735c0.00068,-1.47504 -0.51755,-2.8172 -1.34903,-3.7821l0,-0.00001zm1.55246,-1.75907c-0.27124,0.30979 -0.27124,0.81211 0,1.12031c1.00334,1.14962 1.62195,2.73104 1.62195,4.4852c0,1.75256 -0.61861,3.3332 -1.62056,4.48361c-0.27125,0.30899 -0.27125,0.81053 0,1.12031c0.13493,0.1545 0.31208,0.23214 0.48991,0.23214c0.17713,0 0.35428,-0.07764 0.48921,-0.23214c1.25105,-1.43327 2.02674,-3.41876 2.02536,-5.60392c0.00069,-2.18675 -0.775,-4.17383 -2.02813,-5.60551c-0.27194,-0.30979 -0.70857,-0.30979 -0.97774,0z">
            </path>
        </g>
    </svg>`;
    }
})
video.addEventListener('timeupdate', function () {
    progress.value = video.currentTime / video.duration * 100;
    timer.innerHTML = `${Math.floor(video.currentTime / 60)}:${Math.floor(video.currentTime % 60)}/${Math.floor(video.duration / 60)}:${Math.floor(video.duration % 60)}`;
})
progress.addEventListener('click', function (e) {
    progress.value = event.offsetX / progress.offsetWidth * 100;
    video.currentTime = progress.value * video.duration / 100;
})