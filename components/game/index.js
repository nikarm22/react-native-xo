import React from 'react';
import { Button, Text, View } from 'react-native';
import { EventRegister } from "react-native-event-listeners";
import { Col, Row, Grid } from "react-native-easy-grid";

import GameLogic from "../../game";

export default class GameScreen extends React.Component {

    constructor(props) {
        super(props);

        this.game = new GameLogic();
        this.state = {
            game: this.game
        };
    }

    componentWillMount() {
        this.listener = EventRegister.addEventListener('gameChange', () => {
            this.setState({
                game: this.game
            });
        });
    }

    move(x, y) {
        this.game.makeMove(x, y);
    }

    reset() {
        this.game.resetBoard();
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
    }

    render() {
        // TODO move table to separate component
        return (
            <View>
                <Text>Main Game</Text>
                <Grid>
                    {this.state.game.gameArray.map((row, index) => (
                            <Row key={index} style={{ height: 60 }}>
                                {row.map((cell, idx) => (
                                    <Col
                                        key={idx}
                                        style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
                                        onTouchStart={() => {this.move(index, idx)}}
                                    >
                                        <Text style={{
                                            fontSize: 30,
                                            lineHeight:30,
                                            alignSelf: 'center'
                                        }}>{cell}</Text>
                                    </Col>
                                ))}
                            </Row>
                            ))}
                    <Row>
                        <Button
                            title="Reset"
                            onPress={this.reset.bind(this)}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        />
                    </Row>
                </Grid>
            </View>
        );
    }
}