const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('.audio')
const progressContainer = document.querySelector('.progress__container')
const progress = document.querySelector('.progress')
const title = document.querySelector('.song')
const cover = document.querySelector('.cover__img')
const imgSrc = document.querySelector('.img__src')


// Назвыние песен
const songs = ['3LAU-feat-Bright-Lights_-_How-You-Love-Me-Radio-Edit', 'Bright Lights & Kaleena Zanders & Kandy - War For Love', 'Hardwell & Dyro ft. Bright Lights - Never Say Goodbye (GeoM remix)', 'Pink Is Punk & Benny Benassi feat. Bright Lights - Ghost (Original Extended)', 'Zedd-feat-Bright-Lights_-_Follow-You-Down-Keys-N-Krates-Remix', 'Zeds Dead & Dirtyphonics - Where Are You Now (feat. Bright Lights)']

// Песня по умолчанию
let songIndex = 0

// Inint
function loadSong(song) {
    title.innerHTML = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/img${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('plays')
    cover.classList.add('active')
    imgSrc.src = 'img/svg/pause.svg'
    audio.play()

}

// Pause
function pauseSong() {
    player.classList.remove('plays')
    cover.classList.remove('active')
    imgSrc.src = 'img/svg/play.svg'
    audio.pause()

}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('plays')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

})

// Next song
function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)
    // Prev song
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

//Progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// Set progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// Autoplay
audio.addEventListener('ended', nextSong)