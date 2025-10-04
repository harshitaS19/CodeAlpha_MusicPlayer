document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const albumArt = document.querySelector('.album-art');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const currentTimeEl = document.getElementById('current-time');
    const songDurationEl = document.getElementById('song-duration');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeProgress = document.querySelector('.volume-progress');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const autoplayToggle = document.getElementById('autoplay');
    const shuffleToggle = document.getElementById('shuffle');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const songCountEl = document.getElementById('song-count');
    const totalTimeEl = document.getElementById('total-time');

    // Audio element
    const audio = new Audio();
    audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Using a placeholder audio
    
    // Song data with popular songs
    const songs = [
        {
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '3:20'
        },
        {
            title: 'Levitating',
            artist: 'Dua Lipa',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '3:23'
        },
        {
            title: 'Save Your Tears',
            artist: 'The Weeknd',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '3:35'
        },
        {
            title: 'Stay',
            artist: 'The Kid LAROI, Justin Bieber',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '2:21'
        },
        {
            title: 'Good 4 U',
            artist: 'Olivia Rodrigo',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
            cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
            duration: '2:58'
        },
        {
            title: 'Flowers',
            artist: 'Miley Cyrus',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '3:20'
        },
        {
            title: 'Kill Bill',
            artist: 'SZA',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
            cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '2:33'
        },
        {
            title: 'As It Was',
            artist: 'Harry Styles',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            cover: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            duration: '2:47'
        },
        {
            title: 'Anti-Hero',
            artist: 'Taylor Swift',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
            cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            duration: '3:20'
        },
        {
            title: 'Unholy',
            artist: 'Sam Smith, Kim Petras',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
            cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            duration: '2:36'
        },
        {
            title: 'Heat Waves',
            artist: 'Glass Animals',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
            cover: 'https://images.unsplash.com/photo-1571974599782-87624638275f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80',
            duration: '3:58'
        },
        {
            title: 'Shivers',
            artist: 'Ed Sheeran',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
            cover: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            duration: '3:27'
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isDraggingProgress = false;
    let isDraggingVolume = false;

    // Initialize player stats
    songCountEl.textContent = songs.length;
    
    // Calculate total time
    function calculateTotalTime() {
        let totalSeconds = 0;
        songs.forEach(song => {
            const timeParts = song.duration.split(':');
            totalSeconds += parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        });
        
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        totalTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    calculateTotalTime();

    // Format time in minutes and seconds
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Load song
    function loadSong(index) {
        const song = songs[index];
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songDurationEl.textContent = song.duration;
        albumArt.querySelector('img').src = song.cover;
        audio.src = song.src;
        nowPlayingTitle.textContent = song.title;
        
        // Update active playlist item
        playlistItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Play song
    function playSong() {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.classList.add('playing');
        audio.play();
    }

    // Pause song
    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.classList.remove('playing');
        audio.pause();
    }

    // Next song
    function nextSong() {
        if (shuffleToggle.checked) {
            // Shuffle mode - play random song
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * songs.length);
            } while (newIndex === currentSongIndex && songs.length > 1);
            
            currentSongIndex = newIndex;
        } else {
            // Normal mode - play next song
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }
        }
        
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Update progress bar
    function updateProgress(e) {
        if (!isDraggingProgress) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }

    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }

    // Set volume
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        
        audio.volume = volume;
        volumeProgress.style.width = `${volume * 100}%`;
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (autoplayToggle.checked) {
            nextSong();
        } else {
            pauseSong();
            progress.style.width = '0%';
            currentTimeEl.textContent = '0:00';
        }
    });

    progressBar.addEventListener('click', setProgress);
    
    // Progress bar dragging
    progressBar.addEventListener('mousedown', () => {
        isDraggingProgress = true;
    });
    
    document.addEventListener('mouseup', () => {
        isDraggingProgress = false;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDraggingProgress) {
            const progressRect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - progressRect.left;
            const width = progressRect.width;
            const duration = audio.duration;
            
            audio.currentTime = (clickX / width) * duration;
        }
    });

    // Volume control
    volumeSlider.addEventListener('click', setVolume);
    
    volumeSlider.addEventListener('mousedown', () => {
        isDraggingVolume = true;
    });
    
    document.addEventListener('mouseup', () => {
        isDraggingVolume = false;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDraggingVolume) {
            const volumeRect = volumeSlider.getBoundingClientRect();
            const clickX = e.clientX - volumeRect.left;
            const width = volumeRect.width;
            const volume = Math.max(0, Math.min(1, clickX / width));
            
            audio.volume = volume;
            volumeProgress.style.width = `${volume * 100}%`;
        }
    });

    // Playlist item click
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
    });

    // Initialize
    loadSong(currentSongIndex);
});