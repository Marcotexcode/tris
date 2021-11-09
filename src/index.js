import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {

      return (
        // modificare la funzione arrow in modo che al click stampi il valore X
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
}
  
class Board extends React.Component {

    // aggiunta costruttore per contenere un array di 9 null che corrispondono ai quadrati 
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, // boleano 
        };
    }

    // definire handleClick per farlo funzionare quando click su square
    handleClick(i) {
        const squares = this.state.squares.slice();
        // nel caso c'e un vincitore viene ignorato il click
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; // ogni turno cambia con X o O
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    // Modificare il comp. board per far si che ogni square riceva il valore corrente  ('X', 'O', o null)
    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
                />
        );
    }

    render() {
        // funzione per verificare il vincitore
        const winner = calculateWinner(this.state.squares);

        let status;

        if (winner) {
          status = 'Ha vinto il giocatore: ' + winner;
        } else {
          status = 'Giocatore: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <h1 className="status text-style">Gioco del tris</h1>
                <div className="status">{status}</div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  

// ******** Helper Function **************

function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }