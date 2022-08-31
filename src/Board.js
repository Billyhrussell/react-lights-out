import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for(let row = 0; row < nrows; row++){
      let rows = [];
      for(let col = 0; col < ncols; col++){
        let percent = Math.random();
        //false
        if(percent >= chanceLightStartsOn){
          rows.push(0);
        //true
        } else{
          rows.push(1);
        }
      }
      initialBoard.push(rows);
    }
    return initialBoard;
  }

  function hasWon(boardPieces) {
     const lights = boardPieces.filter(c => c.includes(1));
     if(lights.length > 0){
       return false;
     }
     return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //TODO: do we need to use spread operator?
      let newBoard = oldBoard.map(val => val);

      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
