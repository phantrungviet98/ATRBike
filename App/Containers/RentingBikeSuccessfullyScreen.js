import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'
import Loading from 'react-native-loading-spinner-overlay'
import { lockSubcription } from '../Config/Global'
import moment from 'moment'
import NetInfo from '@react-native-community/netinfo'
import LockRentingFlatListItem from '../Components/LockRentingFlatListItem'

class RentingBikeSuccessfullyScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      rentedTime: 0,
      isConnected: false,
      duration: {}
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

  componentWillMount() {
  }

  componentDidMount() {
    this.props.locksRentingRequest(this.props.token)
  }

  componentWillReceiveProps(nextProps) {

  }

  setTimeState = (createAt) => {
    const now = moment()
    const createdAt = moment(createAt)
    const c = now.diff(createdAt)
    time = moment.duration(c)
    this.setState({duration: time})
  }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Renting Bike Successfully List' goBack={() => this.props.navigation.goBack()} />
        <Loading visible={this.state.isLoading} textContent={'Loading...'} />
        <View style={styles.TimeContainer}>
          
        </View>
        <FlatList
          data={this.props.locksRentingList}
          renderItem={({ item }) => {
            setInterval(() => {
              const now = moment()
              const createdAt = moment(item.createdAt)
              const c = now.diff(createdAt)
              time = moment.duration(c)

              console.log(time.hours() + 'time' + time.minutes())
            }, 3000)
            
            return <LockRentingFlatListItem item={item} hours={this.state.hours} minutes={this.state.minutes}></LockRentingFlatListItem>
          }}
          keyExtractor={(item, index) => index.toString()} />
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
  },
  TimeContainer: {
    height: 100,
    backgroundColor: 'lightpink'
  }
})

const mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    locksRentingList: state.locksRenting.locksRentingList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    locksRentingRequest: (token) => dispatch(LocksRentingRedux.locksRentingRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingBikeSuccessfullyScreen)