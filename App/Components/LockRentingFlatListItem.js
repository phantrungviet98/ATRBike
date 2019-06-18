import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import LockRentingFlatListItemStyles from './Styles/LockRentingFlatListItemStyles'

class LockRentingFlatListItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeRowKey: null
    }
  }

  render(){
    
    return (
      <TouchableOpacity
      onPress={() => {this.props.setRentedDuration(this.props.item.createdAt)}}>
        <View style={LockRentingFlatListItemStyles.itemContainer}>
          <View>
            <Text>Name: {this.props.item.lock.name}</Text>
            <Text>Serial: {this.props.item.lock.serial}</Text>
            <Text style={{ color: 'green' }}>RENTING</Text>
          </View>
          <TouchableOpacity style={LockRentingFlatListItemStyles.returnButton} onPress={() => this.props.returnBike(this.props.item.lock._id, this.props.item.startAt)}><Text>Return</Text></TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: 'white', }}></View>
      </TouchableOpacity>
    )
  }
}

export default LockRentingFlatListItem

