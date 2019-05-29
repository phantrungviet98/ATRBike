import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { setCurrentUser, setStations } from '../actions'
import ItemFlatList from '../components/ItemFlatList'
import Header from '../components/Header'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listStation: [],
            // popupVisible: false
        }
    }

    static navigationOptions = {
        header: null
    }

    // setPopupVisible = (isVisible) => {
    //     console.log(isVisible)
    //     this.setState({popupVisible: Boolean(isVisible)})
    // }

    onPressStation = (locks) => {
        console.log(locks)
        this.props.navigation.navigate('Lock', {stationLocks: locks})
    }
 
    componentDidMount = () => {
        console.log(this.props.data.token)
        fetch('http://api.appebike.com:4000/v1/shared/stations?populate=locks', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiYXRyYmlrZSIsInNlc3Npb25JZCI6IjVjZWRlNzNlMzYzM2RjNWI0YmYwYmRhOSIsImlhdCI6MTU1OTA5NTEwMiwiZXhwIjoxNTU5MTgxNTAyfQ.W-EOlmAieTzuCAjYb2sEvPzFbaWHRbfMDoULar4qSq8',
                // 'Authorization': 'Bearer ' + this.props.data.token,
                'Content-Type': 'application/json',
                'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if ('results' in responseJson) {
                    alert('Hi you')
                    this.props.setStations(responseJson.results)
                } else {
                    alert('Response: ' + JSON.stringify(responseJson))
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title='Station'/>
                <View>
                    <FlatList data={this.props.listStation}
                        renderItem={({ item }) => <ItemFlatList item={item} goToLockScreen={this.onPressStation}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {/* <AddStationPopup popupVisible = {this.state.popupVisible} setPopupVisible = {this.setPopupVisible}/> */}
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

export default connect(mapStateToProps, { setCurrentUser, setStations })(HomeScreen)