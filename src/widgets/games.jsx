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
  const hideTitle = element.getAttribute('data-hide-title');
  const modern = element.getAttribute('data-modern');

  const parseDimension = function (val){
    if(val.toString() === parseInt(val).toString()){
      return [val, val];
    }
    else{
      return val.split("x");
    }
  };

  // mines, initialState
  const game_opts = dimension ?
    {dimensions: parseDimension(dimension)} :
    {preset: preset || 'beginner'};

  game_opts.editable = editable;
  game_opts.mine_count = editable ? 0 : undefined;
  game_opts.modern = Boolean(modern);

  const game = create(game_opts);
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

  render(<Game game={game} modern={modern} hideTitle={hideTitle} />, element);
};

each(document.getElementsByClassName("minesweeper-game"), renderComponent);
