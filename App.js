import React from 'react';
import { StackNavigator } from 'react-navigation';

// Components
import MenuScreen from './components/main-menu/index.js';
import ChoseLvlScreen from './components/chose-lvl/index.js';
import GameScreen from './components/game/index.js';

const RootStack = StackNavigator(
  {
    Menu: {
      screen: MenuScreen,
    },
    Levels: {
      screen: ChoseLvlScreen,
    },
    Game: {
      screen: GameScreen,
    },
  },
  {
    initialRouteName: 'Menu',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
