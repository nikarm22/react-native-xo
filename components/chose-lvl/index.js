import React from 'react';
import { Button, Text, View } from 'react-native';

import GameLogic from '../../game/index';

export default class ChoseLvlScreen extends React.Component {

    setDifficulty(dif) {
        let game = new GameLogic();
        game.setDifficulty(dif);
        this.props.navigation.navigate('Game');
    }

  render() {
    return (
      <View>
        <Text>Chose Level</Text>
          <Button
              title="Junior"
              onPress={this.setDifficulty.bind(this, 0)}
          />
          <Button
              title="Mid"
              onPress={this.setDifficulty.bind(this, 1)}
          />
          <Button
              title="Senior"
              onPress={this.setDifficulty.bind(this, 2)}
          />
        <Button
          title="Back"
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}