import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ItemLockFlatListStyles from './Styles/ItemLockFlatListStyles';

class ItemLockFlatList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRowKey: null
    }
  }

  render() {
    return (
      <TouchableOpacity 
      onPress={() => this.props.onPressLock(this.props.item)}
      >
        <View style={ItemLockFlatListStyles.item}>
          <View>
            <Text>Name: {this.props.item.name}</Text>
            <Text>Serial: {this.props.item.serial}</Text>
          </View>
          <View style={{
            backgroundColor: this.props.item.status === 'ACTIVATED' ? 'green' : 'red',
            width: 10, height: 10, borderRadius: 5,
          }}></View>
        </View>
        <View style={{ height: 1, backgroundColor: 'white', }}></View>
      </TouchableOpacity>
    )
  }
}

export default ItemLockFlatList

