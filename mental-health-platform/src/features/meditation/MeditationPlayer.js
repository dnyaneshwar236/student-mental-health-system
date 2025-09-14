import React, { useState, useRef } from 'react';

const MeditationPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <h2>Guided Meditation</h2>
            <audio ref={audioRef} src="path_to_your_audio_file.mp3" />
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default MeditationPlayer;