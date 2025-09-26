        // =============================
        // 🎵 Music Player Dinámico por Álbum - Versión Corregida
        // =============================

        // 1️⃣ Playlists por álbum
        const albumPlaylists = {
            lament: [
                { id: 1, name: "Lament", artist: "Lacrimosa", album: "Lament", duration: "9:32", durationSeconds: 572, artwork: "/img/lament.jpg", audioUrl: "/songs/Lament - Lacrimosa.mp3" },
                { id: 2, name: "Ein Sturm zieht auf", artist: "Lacrimosa", album: "Lament", duration: "7:30", durationSeconds: 450, artwork: "/img/lament.jpg", audioUrl: "/songs/Ein Sturm zieht auf - Lacrimosa.mp3" },
                { id: 3, name: "Ein langer Weg", artist: "Lacrimosa", album: "Lament", duration: "7:34", durationSeconds: 454, artwork: "/img/lament.jpg", audioUrl: "/songs/Ein langer Weg - Lacrimosa.mp3" },
                { id: 4, name: "Du bist alles was ich will", artist: "Lacrimosa", album: "Lament", duration: "4:32", durationSeconds: 272, artwork: "/img/lament.jpg", audioUrl: "/songs/Du bist alles was ich will - Lacrimosa.mp3" },
                { id: 5, name: "Avalon", artist: "Lacrimosa", album: "Lament", duration: "4:32", durationSeconds: 272, artwork: "/img/lament.jpg", audioUrl: "/songs/Avalon - Lacrimosa.mp3" },
                { id: 6, name: "Geliebtes Monster", artist: "Lacrimosa", album: "Lament", duration: "5:54", durationSeconds: 354, artwork: "/img/lament.jpg", audioUrl: "/songs/Geliebtes Monster - Lacrimosa.mp3" },
                { id: 7, name: "Dark is The Night", artist: "Lacrimosa", album: "Lament", duration: "4:35", durationSeconds: 275, artwork: "/img/lament.jpg", audioUrl: "/songs/Dark is The Night - Lacrimosa.mp3" },
                { id: 8, name: "Punk & Pomerol", artist: "Lacrimosa", album: "Lament", duration: "5:21", durationSeconds: 321, artwork: "/img/lament.jpg", audioUrl: "/songs/Punk & Pomerol - Lacrimosa.mp3" },
                { id: 9, name: "In einem anderen Leben", artist: "Lacrimosa", album: "Lament", duration: "5:34", durationSeconds: 334, artwork: "/img/lament.jpg", audioUrl: "/songs/In einem anderen Leben - Lacrimosa.mp3" },
                { id: 10, name: "Memoria", artist: "Lacrimosa", album: "Lament", duration: "7:03", durationSeconds: 423, artwork: "/img/lament.jpg", audioUrl: "/songs/Memoria - Lacrimosa.mp3" }
            ],

            testimonium: [
                { id: 1, name: "Wenn unsere Helden sterben", artist: "Lacrimosa", album: "Testimonium", duration: "6:55", durationSeconds: 415, artwork: "/img/testimonium.jpg", audioUrl: "/songs/Testimonium/Herz und Verstand.mp3" },
                { id: 2, name: "Nach dem Sturm", artist: "Lacrimosa", album: "Testimonium", duration: "5:44", durationSeconds: 344, artwork: "/img/testimonium.jpg", audioUrl: "/songs/Testimonium/MyPain.mp3" }
                // Agrega más canciones reales aquí
            ]
            // ➡️ Agrega más álbumes con la misma estructura
        };

        // 2️⃣ Clase MusicPlayer
        class MusicPlayer {
            constructor() {
                this.currentTrack = 0;
                this.isPlaying = false;
                this.isMinimized = false;
                this.volume = 0.7;
                this.currentTime = 0;
                this.duration = 0;

                // Playlist inicial vacía, se cargará al hacer clic
                this.playlist = [];

                this.init();
            }

            init() {
                this.createPlayer();
                this.createAudioElement();
                this.bindEvents();
                this.updateUI();

                // Cargar un álbum por defecto (puedes cambiarlo)
                this.loadPlaylist('lament');
            }

            createAudioElement() {
                this.audio = new Audio();
                this.audio.volume = this.volume;

                this.audio.addEventListener("ended", () => this.nextTrack());
                this.audio.addEventListener("timeupdate", () => {
                    this.currentTime = this.audio.currentTime;
                    this.updateProgress();
                });
                
                this.audio.addEventListener("loadedmetadata", () => {
                    this.duration = this.audio.duration;
                });
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
                                <div class="playlist-header">Lista del álbum</div>
                                <div id="playlistContainer"></div>
                            </div>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML("beforeend", playerHTML);
                this.playerElement = document.getElementById("musicPlayer");
            }

            bindEvents() {
                document.getElementById("playPauseBtn").addEventListener("click", () => this.togglePlay());
                document.getElementById("prevBtn").addEventListener("click", () => this.previousTrack());
                document.getElementById("nextBtn").addEventListener("click", () => this.nextTrack());

                const minimizeBtn = document.getElementById("minimizeBtn");
                const expandBtn = document.getElementById("expandBtn");
                const expandBtnHover = document.getElementById("expandBtnHover");

                if (minimizeBtn) minimizeBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); this.minimize(); });
                if (expandBtn) expandBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); this.expand(); });
                if (expandBtnHover) expandBtnHover.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); this.expand(); });

                document.getElementById("closeBtn").addEventListener("click", () => this.close());
                document.getElementById("progressBar").addEventListener("click", (e) => this.seekTo(e));
                document.getElementById("volumeSlider").addEventListener("input", (e) => this.setVolume(e.target.value));

                document.addEventListener("click", (e) => {
                    if (e.target.closest(".playlist-item")) {
                        const index = Number.parseInt(e.target.closest(".playlist-item").dataset.index);
                        this.playTrack(index);
                    }
                });
                
                // Eventos para los álbumes
                document.querySelectorAll('.album').forEach(album => {
                    album.addEventListener('click', () => {
                        const albumKey = album.getAttribute('data-album');
                        this.loadPlaylist(albumKey);
                    });
                });
            }

            // Método nuevo para cargar álbum dinámicamente
            loadPlaylist(albumKey) {
                if (!albumPlaylists[albumKey]) return;

                this.playlist = albumPlaylists[albumKey];
                this.currentTrack = 0;
                this.isPlaying = false;
                
                if (this.audio) {
                    this.audio.pause();
                    this.audio.src = "";
                }

                this.updateUI();
                this.playerElement.classList.add("active");
                this.expand(); // Mostrar reproductor grande al cargar álbum
                
                // Reproducir automáticamente la primera canción
                setTimeout(() => this.playTrack(0), 300);
            }

            updateUI() {
                if (this.playlist.length === 0) return;

                const track = this.playlist[this.currentTrack];
                document.getElementById("trackArtwork").src = track.artwork;
                document.getElementById("trackName").textContent = track.name;
                document.getElementById("trackArtist").textContent = track.artist;
                document.getElementById("trackAlbum").textContent = track.album;
                document.getElementById("totalTime").textContent = track.duration;

                const playPauseBtn = document.getElementById("playPauseBtn");
                playPauseBtn.classList.toggle("playing", this.isPlaying);
                this.playerElement.classList.toggle("playing", this.isPlaying);

                this.updatePlaylist();
            }

            updatePlaylist() {
                const container = document.getElementById("playlistContainer");
                container.innerHTML = "";
                this.playlist.forEach((track, index) => {
                    const item = document.createElement("div");
                    item.className = `playlist-item ${index === this.currentTrack ? "active" : ""}`;
                    item.dataset.index = index;
                    item.innerHTML = `
                        <div class="playlist-number">${index + 1}</div>
                        <div class="playlist-track-info">
                            <div class="playlist-track-name">${track.name}</div>
                            <div class="playlist-track-artist">${track.artist}</div>
                        </div>
                        <div class="playlist-track-duration">${track.duration}</div>
                    `;
                    container.appendChild(item);
                });
            }

            togglePlay() {
                if (this.playlist.length === 0) return;

                const track = this.playlist[this.currentTrack];
                if (!this.audio.src && track.audioUrl) {
                    this.audio.src = track.audioUrl;
                    this.audio.load();
                }

                if (this.isPlaying) {
                    this.audio.pause();
                } else {
                    this.audio.play().catch(error => {
                        console.error("Error al reproducir:", error);
                    });
                }
                this.isPlaying = !this.isPlaying;
                this.updateUI();
            }

            playTrack(index) {
                if (index >= 0 && index < this.playlist.length) {
                    const track = this.playlist[index];
                    this.currentTrack = index;
                    this.currentTime = 0;

                    if (track.audioUrl) {
                        this.audio.src = track.audioUrl;
                        this.audio.load();
                        this.audio.play().then(() => {
                            this.isPlaying = true;
                            this.updateUI();
                        }).catch(error => {
                            console.error("Error al reproducir:", error);
                            this.isPlaying = false;
                            this.updateUI();
                        });
                    }
                }
            }

            previousTrack() {
                if (this.playlist.length === 0) return;
                this.currentTrack = this.currentTrack > 0 ? this.currentTrack - 1 : this.playlist.length - 1;
                this.playTrack(this.currentTrack);
            }

            nextTrack() {
                if (this.playlist.length === 0) return;
                this.currentTrack = this.currentTrack < this.playlist.length - 1 ? this.currentTrack + 1 : 0;
                this.playTrack(this.currentTrack);
            }

            seekTo(e) {
                if (this.playlist.length === 0 || !this.audio.src) return;
                const progressBar = e.currentTarget;
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.audio.currentTime = percent * this.audio.duration;
            }

            setVolume(value) {
                this.volume = value / 100;
                this.audio.volume = this.volume;
            }

            minimize() {
                this.isMinimized = true;
                this.playerElement.classList.add("minimized");
            }

            expand() {
                this.isMinimized = false;
                this.playerElement.classList.remove("minimized");
            }

            close() {
                this.playerElement.classList.remove("active");
                setTimeout(() => {
                    if (this.audio) {
                        this.audio.pause();
                    }
                    this.playerElement.remove();
                }, 300);
            }

            updateProgress() {
                if (this.playlist.length === 0 || !this.audio.src) return;
                const percent = (this.audio.currentTime / this.audio.duration) * 100;
                document.getElementById("progressFill").style.width = `${percent}%`;
                document.getElementById("currentTime").textContent = this.formatTime(this.audio.currentTime);
            }

            formatTime(seconds) {
                if (isNaN(seconds)) return "0:00";
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs.toString().padStart(2, "0")}`;
            }
        }

        // 3️⃣ Inicializar reproductor
        document.addEventListener("DOMContentLoaded", () => {
            window.musicPlayer = new MusicPlayer();
            console.log("🎶 Reproductor dinámico inicializado");
        });