import React from 'react';
import {render} from 'react-dom';
import Game from '../components/Game';
import {create} from 'mines';
import {takeTurn} from 'mines-robot';
import {each} from 'lodash';
import {gameStates} from 'mines';

global.minesweeperGames = {};

const renderComponent = (element) => {
  const preset = element.getAttribute('data-preset');
  const editable = element.getAttribute('data-editable');
  const dimension = element.getAttribute('data-dimension');

  // mines, initialState
  const game = preset ?
    create({preset: preset}) :
    create({ dimensions: [dimension, dimension], editable: editable, mine_count: (editable ? 0 : undefined) });

  const name = element.getAttribute('data-name');

  if (name) {
    global.minesweeperGames[name] = game;
  }

  if (element.getAttribute('data-robot')) {
    const ms = parseInt(element.getAttribute('data-robot'));
    const poll = () => {
      if (game.state() === gameStates.WON || game.state() === gameStates.LOST) {
        game.reset();
      }
      takeTurn(game);
      setTimeout(poll, ms);
    };
    poll();
  }

  render(<Game game={game} />, element);
};

each(document.getElementsByClassName("minesweeper-game"), renderComponent);
