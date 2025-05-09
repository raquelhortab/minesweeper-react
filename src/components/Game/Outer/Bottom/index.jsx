import React from 'react';
import styles from './styles.css';
import Cell from './Cell';
import {times} from 'lodash';

class Bottom extends React.Component {
  render() {
    const game = this.context.game;
    const [row_count, column_count] = game.dimensions;

    const rows = times(row_count, (row) => {
      const cols = times(column_count, (col) => {
        return <Cell key={`${row}.${col}`} smallMap={row_count < 10 || column_count < 10} game={game} position={[row, col]} />;
      });
      return <tr key={row}>{cols}</tr>;
    });

    return (
      <div className={`${styles.bottom} minesweeper-bottom`}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

Bottom.contextTypes = {
  game: React.PropTypes.object
};

export default Bottom;
