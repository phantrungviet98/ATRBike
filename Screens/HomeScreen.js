import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { setCurrentToken, setCurrentUser } from '../actions'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listStation: []
        }
    }

    componentDidMount = () => {
        fetch('http://api.appebike.com:4000/v1/shared/stations?populate=locks', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization':'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiYXRyYmlrZSIsInNlc3Npb25JZCI6IjVjZWJjMWJkNDE0ZGE2NjA4YTQyZWViZiIsImlhdCI6MTU1ODk1NDQyOSwiZXhwIjoxNTU5MDQwODI5fQ.9ywqBcT-pHnGt2WYjtPHEowEgybkDs9BDnpJVfm_uDg',
                'Content-Type': 'application/json',
                'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if ('token' in responseJson) {
                    alert(JSON.stringify(responseJson))
                } else {
                    alert(JSON.stringify(responseJson))
                    alert(JSON.stringify(this.state.countryCode))
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.data)}</Text>
                <FlatList data={[{ key: 'a' }, { key: 'b' }]} renderItem={({ item }) => <Text>{item.key}</Text>}>

                </FlatList>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.setCurrentUser
    }
}

export default connect(mapStateToProps, { setCurrentUser })(HomeScreen)