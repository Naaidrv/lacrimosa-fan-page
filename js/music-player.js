class MusicPlayer {
  constructor() {
    this.currentTrack = 0
    this.isPlaying = false
    this.isMinimized = false
    this.volume = 0.7
    this.currentTime = 0
    this.duration = 0

    // Playlist con títulos largos para probar la animación
    this.playlist = [
      {
        id: 1,
        name: "Lament",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "9:32",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Lament - Lacrimosa.mp3",
      },
      {
        id: 2,
        name: "Ein Sturm zieht auf",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "7:30",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Ein Sturm zieht auf - Lacrimosa.mp3",
      },
      {
        id: 3,
        name: "Ein langer Weg",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "7:34",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Ein langer Weg - Lacrimosa.mp3",
      },
        {
        id: 4,
        name: "Du bist alles was ich will",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "4:32",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Du bist alles was ich will - Lacrimosa.mp3",
      },
     {
        id: 5,
        name: "Avalon",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "4:32",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Avalon - Lacrimosa.mp3",
      },
            {
        id: 6,
        name: "Geliebtes Monster",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "5:54",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Geliebtes Monster - Lacrimosa.mp3",
      },
            {
        id: 7,
        name: "Dark is The Night",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "4:35",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Dark is The Night - Lacrimosa.mp3",
      },
            {
        id: 8,
        name: "Punk & Pomerol",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "5:21",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Punk & Pomerol - Lacrimosa.mp3",
      },
            {
        id: 9,
        name: "In einem anderen Leben",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "5:34",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/In einem anderen Leben - Lacrimosa.mp3",
      },
            {
        id: 10,
        name: "Memoria",
        artist: "Lacrimosa",
        album: "Lament",
        duration: "7:03",
        durationSeconds: 272,
        artwork: "/img/lament.jpg",
        audioUrl: "/songs/Memoria - Lacrimosa.mp3",
      },
    ]

    this.init()
  }

  init() {
    this.createPlayer()
    this.createAudioElement()
    this.bindEvents()
    this.updateUI()

    setTimeout(() => {
      this.playerElement.classList.add("active")
    }, 2000)
  }

  createAudioElement() {
    this.audio = new Audio()
    this.audio.volume = this.volume

    this.audio.addEventListener("ended", () => this.nextTrack())
    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime
      this.updateProgress()
    })
  }

  createPlayer() {
    const playerHTML = `
            <div class="music-player" id="musicPlayer">
                <div class="player-header">
                    <div class="player-title">
                        🎵 Lacrimosa
                        <div class="equalizer">
                            <div class="equalizer-bar"></div>
                            <div class="equalizer-bar"></div>
                            <div class="equalizer-bar"></div>
                            <div class="equalizer-bar"></div>
                        </div>
                    </div>
                    <div class="player-controls-header">
                        <button class="minimize-btn" id="minimizeBtn"></button>
                        <button class="expand-btn" id="expandBtn"></button>
                        <button class="close-btn" id="closeBtn"></button>
                    </div>
                </div>
                <div class="player-content">
                    <div class="current-track">
                        <div class="track-artwork" id="trackArtworkContainer">
                            <img id="trackArtwork" src="/placeholder.svg" alt="Album artwork">
                            <button class="expand-btn-hover" id="expandBtnHover"></button>
                        </div>
                        <div class="track-info" id="trackInfo">
                            <div class="track-name" id="trackName"></div>
                            <div class="track-artist" id="trackArtist"></div>
                            <div class="track-album" id="trackAlbum"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" id="progressBar"><div class="progress-fill" id="progressFill"></div></div>
                        <div class="progress-time">
                            <span id="currentTime">0:00</span>
                            <span id="totalTime">0:00</span>
                        </div>
                    </div>
                    <div class="player-controls">
                        <button class="control-btn" id="prevBtn"></button>
                        <button class="control-btn play-pause-btn" id="playPauseBtn"></button>
                        <button class="control-btn" id="nextBtn"></button>
                    </div>
                    <div class="volume-container">
                        <div class="volume-icon"></div>
                        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="70">
                    </div>
                    <div class="playlist">
                        <div class="playlist-header">Canciones más escuchadas</div>
                        <div id="playlistContainer"></div>
                    </div>
                </div>
            </div>
        `
    document.body.insertAdjacentHTML("beforeend", playerHTML)
    this.playerElement = document.getElementById("musicPlayer")
  }

  bindEvents() {
    // Event listeners principales
    document.getElementById("playPauseBtn").addEventListener("click", () => this.togglePlay())
    document.getElementById("prevBtn").addEventListener("click", () => this.previousTrack())
    document.getElementById("nextBtn").addEventListener("click", () => this.nextTrack())

    // Event listeners para minimizar/expandir
    const minimizeBtn = document.getElementById("minimizeBtn")
    const expandBtn = document.getElementById("expandBtn")
    const expandBtnHover = document.getElementById("expandBtnHover")

    if (minimizeBtn) {
      minimizeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Minimizando...")
        this.minimize()
      })
    }

    if (expandBtn) {
      expandBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Expandiendo desde header...")
        this.expand()
      })
    }

    // Event listener para el botón hover sobre la imagen
    if (expandBtnHover) {
      expandBtnHover.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Expandiendo desde imagen...")
        this.expand()
      })
    }

    document.getElementById("closeBtn").addEventListener("click", () => this.close())

    document.getElementById("progressBar").addEventListener("click", (e) => this.seekTo(e))
    document.getElementById("volumeSlider").addEventListener("input", (e) => this.setVolume(e.target.value))

    document.addEventListener("click", (e) => {
      if (e.target.closest(".playlist-item")) {
        const index = Number.parseInt(e.target.closest(".playlist-item").dataset.index)
        this.playTrack(index)
      }
    })

    // Agregar listener para resize
    window.addEventListener("resize", () => {
      setTimeout(() => {
        this.checkTextOverflow()
      }, 100)
    })
  }

  updateUI() {
    const track = this.playlist[this.currentTrack]
    document.getElementById("trackArtwork").src = track.artwork
    document.getElementById("trackName").textContent = track.name
    document.getElementById("trackArtist").textContent = track.artist
    document.getElementById("trackAlbum").textContent = track.album
    document.getElementById("totalTime").textContent = track.duration

    // Actualizar botón de play/pause
    const playPauseBtn = document.getElementById("playPauseBtn")
    if (this.isPlaying) {
      playPauseBtn.classList.add("playing")
    } else {
      playPauseBtn.classList.remove("playing")
    }

    this.playerElement.classList.toggle("playing", this.isPlaying)
    this.updatePlaylist()

    const trackInfo = document.getElementById("trackInfo")
    trackInfo.classList.add("changing")
    setTimeout(() => trackInfo.classList.remove("changing"), 300)

    // Verificar overflow de texto después de que se actualice la UI
    setTimeout(() => {
      this.checkTextOverflow()
    }, 100)
  }

  updatePlaylist() {
    const container = document.getElementById("playlistContainer")
    container.innerHTML = ""
    this.playlist.forEach((track, index) => {
      const item = document.createElement("div")
      item.className = `playlist-item ${index === this.currentTrack ? "active" : ""}`
      item.dataset.index = index
      item.innerHTML = `
                <div class="playlist-number">${index + 1}</div>
                <div class="playlist-track-info">
                    <div class="playlist-track-name">${track.name}</div>
                    <div class="playlist-track-artist">${track.artist}</div>
                </div>
                <div class="playlist-track-duration">${track.duration}</div>
            `
      container.appendChild(item)
    })
  }

  togglePlay() {
    const track = this.playlist[this.currentTrack]

    if (!this.audio.src && track.audioUrl) {
      this.audio.src = track.audioUrl
    }

    if (this.isPlaying) {
      this.audio.pause()
    } else {
      this.audio.play()
    }

    this.isPlaying = !this.isPlaying
    this.updateUI()
  }

  playTrack(index) {
    if (index >= 0 && index < this.playlist.length) {
      const track = this.playlist[index]
      this.currentTrack = index
      this.isPlaying = true
      this.currentTime = 0

      if (track.audioUrl) {
        this.audio.src = track.audioUrl
        this.audio.play()
      }

      this.updateUI()
    }
  }

  previousTrack() {
    this.currentTrack = this.currentTrack > 0 ? this.currentTrack - 1 : this.playlist.length - 1
    this.playTrack(this.currentTrack)
  }

  nextTrack() {
    this.currentTrack = this.currentTrack < this.playlist.length - 1 ? this.currentTrack + 1 : 0
    this.playTrack(this.currentTrack)
  }

  seekTo(e) {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const track = this.playlist[this.currentTrack]
    this.audio.currentTime = percent * track.durationSeconds
  }

  setVolume(value) {
    this.volume = value / 100
    this.audio.volume = this.volume
  }

  minimize() {
    console.log("Función minimize ejecutada")
    this.isMinimized = true
    this.playerElement.classList.add("minimized")

    // Cambiar visibilidad de botones del header
    const minimizeBtn = document.getElementById("minimizeBtn")
    const expandBtn = document.getElementById("expandBtn")

    if (minimizeBtn) minimizeBtn.style.display = "none"
    if (expandBtn) expandBtn.style.display = "none"

    // Verificar overflow de texto después de minimizar
    setTimeout(() => {
      this.checkTextOverflow()
    }, 350) // Aumentado el tiempo para asegurar que la transición termine
  }

  expand() {
    console.log("Función expand ejecutada")
    this.isMinimized = false
    this.playerElement.classList.remove("minimized")

    // Cambiar visibilidad de botones del header
    const minimizeBtn = document.getElementById("minimizeBtn")
    const expandBtn = document.getElementById("expandBtn")

    if (minimizeBtn) minimizeBtn.style.display = "flex"
    if (expandBtn) expandBtn.style.display = "none"

    // Verificar overflow de texto después de expandir
    setTimeout(() => {
      this.checkTextOverflow()
    }, 350) // Aumentado el tiempo para asegurar que la transición termine
  }

  close() {
    this.playerElement.classList.remove("active")
    setTimeout(() => {
      this.playerElement.remove()
    }, 300)
  }

  updateProgress() {
    const track = this.playlist[this.currentTrack]
    const percent = (this.audio.currentTime / track.durationSeconds) * 100
    document.getElementById("progressFill").style.width = `${percent}%`
    document.getElementById("currentTime").textContent = this.formatTime(this.audio.currentTime)
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // FUNCIÓN MEJORADA: Detección más precisa del overflow
  checkTextOverflow() {
    const trackName = document.getElementById("trackName")
    const trackArtist = document.getElementById("trackArtist")

    // Limpiar clases anteriores
    if (trackName) trackName.classList.remove("marquee")
    if (trackArtist) trackArtist.classList.remove("marquee")

    // Esperar a que se rendericen los elementos
    setTimeout(() => {
      // Función helper para verificar overflow
      const hasOverflow = (element) => {
        if (!element) return false

        // Crear un elemento temporal para medir el texto completo
        const tempElement = element.cloneNode(true)
        tempElement.style.position = "absolute"
        tempElement.style.visibility = "hidden"
        tempElement.style.width = "auto"
        tempElement.style.whiteSpace = "nowrap"
        tempElement.style.overflow = "visible"
        tempElement.style.textOverflow = "unset"

        document.body.appendChild(tempElement)
        const fullWidth = tempElement.offsetWidth
        document.body.removeChild(tempElement)

        const containerWidth = element.parentElement.offsetWidth

        console.log(`Elemento: ${element.textContent}`)
        console.log(`Ancho completo: ${fullWidth}px, Ancho contenedor: ${containerWidth}px`)

        return fullWidth > containerWidth
      }

      // Verificar overflow para el título
      if (hasOverflow(trackName)) {
        trackName.classList.add("marquee")
        console.log(`✅ Animación marquee activada para el título`)
      } else {
        console.log(`❌ No se necesita animación para el título`)
      }

      // Verificar overflow para el artista
      if (hasOverflow(trackArtist)) {
        trackArtist.classList.add("marquee")
        console.log(`✅ Animación marquee activada para el artista`)
      } else {
        console.log(`❌ No se necesita animación para el artista`)
      }
    }, 200)
  }
}

// Inicializar el reproductor cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando reproductor...")
  setTimeout(() => {
    window.musicPlayer = new MusicPlayer()
    console.log("Reproductor inicializado")
  }, 2000)
})