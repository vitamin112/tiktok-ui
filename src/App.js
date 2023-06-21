import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button onClick={onSquareClick}>{value}</button>;
}

function App() {
  const [Squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleClick(i) {
    if (checkWinre(Squares) || Squares[i]) {
      return;
    }
    const nextSquares = Squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else nextSquares[i] = "O";
    handlePlaye(nextSquares);
    setSquares(nextSquares);
    setxIsNext(!xIsNext);
  }

  function handlePlaye(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function Board({ xIsNext, Squares, handlePlay }) {
    return (
      <>
        <div className="board">
          <h1>{status}</h1>
          <div className="row">
            <Square value={Squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={Squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={Squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="row">
            <Square value={Squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={Squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={Squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="row">
            <Square value={Squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={Squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={Squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <div>
          <h1>history</h1>
          <ol>{moves}</ol>
        </div>
      </>
    );
  }
  function checkWinre(Square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (Square[a] && Square[a] === Square[b] && Square[a] === Square[c]) {
        return Square[a];
      }
    }
    return null;
  }

  let winner = checkWinre(Squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "turn of " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <Board xIsNext={xIsNext} Squares={Squares} handlePlaye={handlePlaye} />
    </div>
  );
}

export default App;
