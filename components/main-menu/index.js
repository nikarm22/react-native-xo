import React from 'react';
import { Button, Text, View } from 'react-native';

export default class MenuScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Main Menu</Text>
        <Button
          title="Play"
          onPress={() => this.props.navigation.navigate('Levels')}
        />
      </View>
    );
  }
}