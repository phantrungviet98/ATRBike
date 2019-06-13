import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class ItemStationFlatList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeRowKey: null
        }
    }

    render() {
        return (

            <TouchableOpacity onPress={() => {
                this.props.goToLockScreen(this.props.item.id, this.props.item.locks)
            }}>
                <View style={styles.itemStyle}>
                    <Text>{this.props.item.name}</Text>
                    <Text>{this.props.item.address}</Text>
                </View>
            </TouchableOpacity>

        )
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

export default ItemStationFlatList