import React, { Component } from 'react'
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'
import {setCurrentUser} from '../actions'
import {connect} from 'react-redux'

class ItemFlatList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeRowKey: null
        }
    }

    render() {

        const swipeoutSettings = {
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null })
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({
                    activeRowKey: this.props.item.id
                })
            },
            right: [
                {
                    onPress: () => {
                        console.log(this.state.activeRowKey)
                        console.log(this.props.data.token)
                        fetch('http://api.appebike.com:4000/v1/shared/stations/' + this.state.activeRowKey, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Authorization': 'Bearer ' + this.props.data.token,
                                'Content-Type': 'application/json',
                                'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
                                'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
                            },
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                console.log(responseJson)
                                if (responseJson.deleted == true) {
                                    alert('Đã xóa thành công')
                                } else {
                                    alert('Response: ' + JSON.stringify(responseJson))
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    },
                    text: 'Delete',
                    type: 'delete'
                }
            ],
            autoClose: true
        }

        return (
            <Swipeout {...swipeoutSettings}>
                <TouchableOpacity onPress={() => {
                    console.log(this.props.item.locks)
                    this.props.goToLockScreen(this.props.item.locks)
                }}>
                    <View style={ styles.itemStyle }>
                        <Text>{this.props.item.name}</Text>
                        <Text>{this.props.item.address}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.setCurrentUser
    }
} 

const styles = StyleSheet.create({
    itemStyle: {
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: 'lightpink',
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        height: 60
    }
})

export default connect(mapStateToProps)(ItemFlatList)