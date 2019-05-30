import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import Header from '../components/Header'

class RentingScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            choosenLock: this.props.navigation.getParam('chosenLock')
        }
    }

    static navigationOptions = {
        header: null
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Header title='Renting' goBack={() => this.props.navigation.goBack()} />
                <View style={styles.RentingName}>
                    <Text>{this.state.choosenLock.name}</Text>
                    <Text>{this.state.choosenLock.serial}</Text>
                </View>
                <View style={styles.RentingContainer}>
                    <TouchableOpacity>
                        <Text>Press to unlock</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RentingName : {
        backgroundColor: 'blue',
        alignItems: 'center',
        
    },
    RentingContainer: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default RentingScreen