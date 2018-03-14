import React from 'react';
import { Button, Text, View } from 'react-native';

export default class ChoseLvlScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Chose Level</Text>
        <Button
          title="Back"
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}