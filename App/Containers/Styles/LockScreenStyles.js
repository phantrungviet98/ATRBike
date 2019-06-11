import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    bottomButtonView: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: 10
    },
    bottomButton: {
      justifyContent: 'center',
      alignItems: 'center', 
      width: 80,
      height: 40,
      backgroundColor: 'lightblue'
    },
    viewBetweenButtons: {
      backgroundColor: 'white',
      width: 1
    }
})