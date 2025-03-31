import React from 'react';
import Title from './Title';
import Outer from './Outer';
import styles from './styles.css';

class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  getChildContext() {
    return { game: this.props.game };
  }

  render() {
    const cols = this.props.game.dimensions[1];
    const width = cols * 16 + 20;

    return (
      <div className={`${styles.minesweeper} modern`} style={{width: width}}>
        {this.props.hideTitle ? null : <Title />}
        <Outer />
      </div>
    );
  }
}

Game.childContextTypes = {
  game: React.PropTypes.object
};

export default Game;
