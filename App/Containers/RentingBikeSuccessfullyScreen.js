import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import { } from '../Redux/SignInRedux'
import Loading from 'react-native-loading-spinner-overlay'
import { lockSubcription } from '../Config/Global'
import moment from 'moment'

class RentingBikeSuccessfullyScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      rentingSuccessList: [],
      rentedTime: 0
    }
  }

  static navigationOptions = {
    header: null
  }

  _retrieveData = async () => {
    console.log('rentingSuccessStringtify 1')
    try {
      const rentingSuccessStringtify = await AsyncStorage.getItem('rentingSuccessStringtify');
      if (rentingSuccessStringtify !== null) {
        // We have data!!
        console.log('rentingSuccessStringtify', rentingSuccessStringtify)
        this.setState({
          rentingSuccessList: JSON.parse(rentingSuccessStringtify)
        })


      }
    } catch (error) {
      console.log('error:', error)
    }
  }
  componentDidMount() {
    this._retrieveData()
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Renting Bike Successfully List' goBack={() => this.props.navigation.goBack()} />
        <Loading visible={this.state.isLoading} textContent={'Loading...'} />
        <FlatList
          data={this.state.rentingSuccessList}
          renderItem={({ item }) => {
            var a = moment()
            var b = moment(item.createdAt)
            var c = a.diff(b, 'minutes')
            return <Text>{item.lock.name + '  ' + item.lock.serial + '  ' + item.lock.status + '  ' + moment() + ' ' + moment(item.createdAt) + '   ' + c + 'minutes'}</Text>
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  RentingName: {
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

export default RentingBikeSuccessfullyScreen