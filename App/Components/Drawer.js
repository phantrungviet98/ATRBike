import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DrawerStyles from './Styles/DrawerStyles'
export default drawerContent = (data) => {
  console.log('data drawer', data)
  return (
  <View style={DrawerStyles.drawerContainer}>
    <View style={DrawerStyles.userContainer}><Text>Drawer Content</Text></View>
    <View style={DrawerStyles.logoutView}>
      <TouchableOpacity><Text style={DrawerStyles.logoutText}>Logout</Text></TouchableOpacity>
    </View>
  </View>
)
}

