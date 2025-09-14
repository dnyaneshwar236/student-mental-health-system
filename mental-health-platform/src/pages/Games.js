import React from 'react';
import BreathingGame from '../features/games/BreathingGame';
import PuzzleGame from '../features/games/PuzzleGame';

const Games = () => {
    return (
        <div>
            <h1>Stress Relief Games</h1>
            <BreathingGame />
            <PuzzleGame />
        </div>
    );
};

export default Games;