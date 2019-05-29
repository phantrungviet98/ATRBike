import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'

class ItemLockFlatList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeRowKey: null
        }
    }

    render() {
        return (
            <Swipeout>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'lightpink', padding: 10,}}>
                        <View>
                            <Text>Name: {this.props.item.name}</Text>
                            <Text>Serial: {this.props.item.serial}</Text>
                        </View>
                        <View style={{
                            backgroundColor: this.props.item.status === 'ACTIVE' ? 'green' : 'red',
                            width: 10, height: 10, borderRadius: 5,
                        }}></View>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'blue', }}></View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

export default ItemLockFlatList