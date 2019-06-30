import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import { } from '../Redux/SignInRedux'
import Loading from 'react-native-loading-spinner-overlay'
import { lockSubcription } from '../Config/Global'
import { resetScreen } from '../untils/navigation'

class RentingBikeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      choosenLock: this.props.navigation.getParam('chosenLock'),
      spiner: false
    }
  }

  static navigationOptions = {
    header: null
  }

  _storeData = async (nextProps) => {
    try {
      const rentingSuccessStringtify = await AsyncStorage.getItem(this.props.user.phoneNumber.toString())
      if (rentingSuccessStringtify === null) {
        const rentingSuccessArray = [nextProps.rentingSuccessResponse.response]
        await AsyncStorage.setItem(this.props.user.phoneNumber.toString(), JSON.stringify(rentingSuccessArray));
      }
      else {
        const rentingSuccessArray = JSON.parse(rentingSuccessStringtify)
        rentingSuccessArray.push(nextProps.rentingSuccessResponse.response)
        await AsyncStorage.setItem(this.props.user.phoneNumber.toString(), JSON.stringify(rentingSuccessArray))
      }
    } catch (error) {
      console.log('errrorrrrr: ', error)
    }
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props


    if (nextProps.rentingBikeStatus === 'finished') {

      if (nextProps.error !== null) {
        alert(nextProps.error.message + '. Please try again')
        navigation.goBack()
      }
      else {
        lockSubcription.next(nextProps.rentingSuccessResponse.response.lock._id)

        this._storeData(nextProps)

        Alert.alert(
          'Notification',
          'Renting Successfully. Do you want to rent another bike ?',
          [
            { text: 'Yes, sure', onPress: () => navigation.goBack() },
            { text: 'No', onPress: () => navigation.dispatch(resetScreen('RentingBikeSuccessfullyScreen')) },
          ],
        );
      }
    }

  }

  render() {
    const { choosenLock } = this.state
    return (
      <View style={{ flex: 1 }}>
        <Header title='Renting' goBack={() => this.props.navigation.goBack()} />
        <Loading visible={this.props.rentingBikeStatus === 'activated' ? true : false} textContent={'Loading...'} />
        <View style={styles.RentingName}>
          <Text>{choosenLock.name}</Text>
          <Text>{choosenLock.serial}</Text>
        </View>
        <View style={styles.RentingContainer}>
          <TouchableOpacity onPress={() => {
            this.props.rentingBikeRequest(this.props.token, choosenLock._id)
          }}>
            <Text>Press to rent</Text>
          </TouchableOpacity>
        </View>
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

const mapStateToProps = (state) => {
  return {
    token: state.signIn.token,
    user: state.signIn.user,
    rentingSuccessResponse: state.rentingBike.rentingSuccessResponse,
    rentingBikeStatus: state.rentingBike.status,
    error: state.rentingBike.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    rentingBikeRequest: (token, lockId) => dispatch(RentingBikeRedux.rentingBikeRequest(token, lockId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingBikeScreen)