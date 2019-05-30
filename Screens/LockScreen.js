import React, { Component } from 'react';
import { StyleSheet ,TextInput, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux'
import { setCurrentUser, setStations } from '../actions'
import ItemLockFlatList from '../components/ItemLockFlatList'
import Header from '../components/Header'

class LockScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listLock: [],
        }
    }

    static navigationOptions = {
        header: null
    }

    // setPopupVisible = (isVisible) => {
    //     console.log(isVisible)
    //     this.setState({popupVisible: Boolean(isVisible)})
    // }

    componentDidMount = () => {
        this.setState({
            listLock: this.props.navigation.getParam('stationLocks', [])
        })
    };

    onPressLock = (lock) => {
        console.log(lock)
        this.props.navigation.navigate('Renting', {chosenLock: lock})
    }

    render() {
        const stationId = this.props.navigation.getParam('stationId', '-1')
        return (
            <View style={{ flex: 1 }}>
                <Header title='Lock' goBack = {() => this.props.navigation.goBack()}/>
                <View>
                    {this.state.listLock.length !== 0 ?
                        <FlatList data={this.state.listLock}
                            renderItem={({ item }) => <ItemLockFlatList item={item} goToRentingScreen = {this.onPressLock}/>}
                            keyExtractor={(item, index) => index.toString()}
                        /> :
                        <Text>No any lock</Text>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.setCurrentUser,
        listStation: state.setStations
    }
}

export default connect(mapStateToProps, { setCurrentUser, setStations })(LockScreen)

