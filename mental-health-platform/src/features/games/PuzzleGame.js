import React from 'react';

const PuzzleGame = () => {
    const [puzzle, setPuzzle] = React.useState([]);
    const [shuffledPuzzle, setShuffledPuzzle] = React.useState([]);

    const generatePuzzle = () => {
        const newPuzzle = Array.from({ length: 9 }, (_, i) => i + 1);
        newPuzzle.push(null); // Add an empty space
        setPuzzle(newPuzzle);
        shufflePuzzle(newPuzzle);
    };

    const shufflePuzzle = (puzzleArray) => {
        const shuffled = puzzleArray.sort(() => Math.random() - 0.5);
        setShuffledPuzzle(shuffled);
    };

    const handleTileClick = (index) => {
        const newPuzzle = [...shuffledPuzzle];
        const emptyIndex = newPuzzle.indexOf(null);

        // Check if the clicked tile is adjacent to the empty space
        if (isAdjacent(index, emptyIndex)) {
            [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
            setShuffledPuzzle(newPuzzle);
        }
    };

    const isAdjacent = (index1, index2) => {
        const row1 = Math.floor(index1 / 3);
        const col1 = index1 % 3;
        const row2 = Math.floor(index2 / 3);
        const col2 = index2 % 3;

        return (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1);
    };

    React.useEffect(() => {
        generatePuzzle();
    }, []);

    return (
        <div>
            <h2>Puzzle Game</h2>
            <div className="puzzle-grid">
                {shuffledPuzzle.map((tile, index) => (
                    <div key={index} className="puzzle-tile" onClick={() => handleTileClick(index)}>
                        {tile}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PuzzleGame;