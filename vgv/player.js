console.log("PLAYER")

document.addEventListener('DOMContentLoaded', () => {
    const controls = [
        'play-large', // The large play button in the center
        'play', // Play/pause playback
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'settings', // Settings menu
        'pip', // Picture-in-picture (currently Safari only)
        'airplay', // Airplay (currently Safari only)
        'fullscreen', // Toggle fullscreen
    ];

    const player = new Plyr('#player', {
        controls: controls,
        muted: true, // Включение беззвучного режима
        // autoplay: true, // Активация автовоспроизведения
        youtube: {
            showinfo: 0, // Не показывать информацию о видео в верхней части видео
            rel: 0 // Не показывать рекомендованные видео по завершении воспроизведения
        }
    });

    player.on('ready', event => {
        console.log('Плеер готов и полностью загружен!');
        // Здесь можно добавить дополнительный код, который должен выполниться после загрузки плеера
        player.play(); // Start playback
    });
    // 
});
