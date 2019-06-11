import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Header from '../Components/Header'
import RentingBikeRedux from '../Redux/RentingBikeRedux'
import { } from '../Redux/SignInRedux'
import Loading from 'react-native-loading-spinner-overlay'
import { lockSubcription } from '../Config/Global'

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
          const rentingSuccessStringtify = await AsyncStorage.getItem('rentingSuccessStringtify')
          if (rentingSuccessStringtify === null) {
              const rentingSuccessArray = [nextProps.rentingSuccessResponse.response]
              console.log('rentingSuccessArray Renting 1: ', rentingSuccessArray)
              await AsyncStorage.setItem('rentingSuccessStringtify', JSON.stringify(rentingSuccessArray));
          }
          else {
              const rentingSuccessArray = JSON.parse(rentingSuccessStringtify)
              rentingSuccessArray.push(nextProps.rentingSuccessResponse.response)
              console.log('rentingSuccessArray Renting 2: ', rentingSuccessArray)
              await AsyncStorage.setItem('rentingSuccessStringtify', JSON.stringify(rentingSuccessArray))
          }
      } catch (error) {
          console.log('errrorrrrr: ', error)
      }
  };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoading: nextProps.isRequesting })
        const { navigation } = this.props


        if (nextProps.isRequesting === true) {
            this.setState({ isLoading: true })
        }
        else {
            this.setState({ isLoading: false })
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
                        { text: 'No', onPress: () => navigation.navigate('RentingBikeSuccessfullyScreen') },
                    ],
                );
            }
        }

    }

    render() {
        const { choosenLock } = this.state
        console.log(choosenLock)
        return (
            <View style={{ flex: 1 }}>
                <Header title='Renting' goBack={() => this.props.navigation.goBack()} />
                <Loading visible={this.state.isLoading} textContent={'Loading...'} />
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
    console.log('state renting bike', state)
    return {
        token: state.signIn.token,
        rentingSuccessResponse: state.rentingBike.rentingSuccessResponse,
        isRequesting: state.rentingBike.isRequesting,
        error: state.rentingBike.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rentingBikeRequest: (token, lockId) => dispatch(RentingBikeRedux.rentingBikeRequest(token, lockId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RentingBikeScreen)