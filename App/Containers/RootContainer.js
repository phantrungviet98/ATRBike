import AppConfig from '../Config/AppConfig'
import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import GettingStationRedux from '../Redux/GettingStationRedux'
import SocketIOClient from 'socket.io-client'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  // componentDidMount() {
  //   // if redux persist is not active fire startup action
  //   if (!ReduxPersist.active) {
  //     this.props.startup()
  //   }

  //   //Socket IO
  //   const room = 'myRoom'
  //   socket = SocketIOClient(AppConfig.HOST + ':' + AppConfig.PORT, {
  //     query: `room=${room}`
  //   })

  //   socket.on('connect', () => {
  //     console.log('Conneeted SC')
  //   })

  //   socket.on('events', data => {
  //     console.log('event', data)
  //     console.log('prpossdfsdafsdf', this.props)
  //     if (data.operationType == 'update') {
  //       console.log('datatatatatatatAAA: ' +JSON.stringify(data.data))
  //       this.props.updateLock(data.data)
  //     }
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('Disconneted')
  //   })
  // }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listStation: state.gettingStation.listStation
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup()),
    updateLock: (lockData) => dispatch(GettingStationRedux.updateLockRequest(lockData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
