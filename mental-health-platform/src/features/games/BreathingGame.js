import React, { useState } from 'react';

const BreathingGame = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathCount, setBreathCount] = useState(0);

    const startBreathing = () => {
        setIsBreathing(true);
        setBreathCount(0);
        const interval = setInterval(() => {
            setBreathCount(prevCount => {
                if (prevCount >= 9) {
                    clearInterval(interval);
                    setIsBreathing(false);
                    return 0;
                }
                return prevCount + 1;
            });
        }, 1000);
    };

    return (
        <div className="breathing-game">
            <h2>Breathing Exercise</h2>
            {isBreathing ? (
                <div>
                    <p>Inhale...</p>
                    <p>{10 - breathCount}</p>
                    <p>Exhale...</p>
                </div>
            ) : (
                <button onClick={startBreathing}>Start Breathing Exercise</button>
            )}
        </div>
    );
};

export default BreathingGame;