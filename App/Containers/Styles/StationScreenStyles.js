import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    marker: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMarker: {
        color: 'white'
    },
    rentButton: {
        width: 150,
        height: 40,
        backgroundColor: 'lightgreen',
        position: 'absolute',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rentButtonView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });