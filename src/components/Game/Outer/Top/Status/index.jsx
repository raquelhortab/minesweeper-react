import React from 'react';
import styles from './styles.css';
import styleForStatus from './styleForStatus';
import {gameStates, cellStates} from 'mines';

class Status extends React.Component {
  constructor(props) {
    super(props);
    const game = props.game;
    game.onGameStateChange((newState) => {
      this.setState({style: styles[styleForStatus(newState)]});
      if(game.finished()){
        let data = {
          dimensions: game.dimensions,
          cellState: this.cellState(),
          totalMines: game.mine_count,
          cellStateOptions: cellStates
        };
        if (newState === gameStates.WON) {
          window.onGameFinished(true, data);
        }
        else if (newState === gameStates.LOST) {
          window.onGameFinished(false, data);
        }
      }
    });
    this.cellState = ()=>{
      let states = [];
      for(let i = 0; i < game.dimensions[0]; i++){
        states[i] = []
        for(let j = 0; j < game.dimensions[1]; j++){
          states[i][j] = game.cellState([i,j]);
        }
      }
      return states;
    }
    this.onMouseDown = (event) => {
      event.preventDefault();
      this.setState({style: styles.alivePressed});
    };
    this.onMouseUp = (event) => {
      event.preventDefault();
      this.setState({style: styles[styleForStatus(game.state())]});
      game.reset();
    };
    this.state = {
      style: styles[styleForStatus(game.state())]
    };
  }

  render() {
    return (
      <span onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} className={`${styles.status} ${this.state.style}`}>
      </span>
    );
  }
}

export default Status;
