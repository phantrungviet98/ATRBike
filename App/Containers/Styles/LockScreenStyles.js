import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderTopStartRadius: 15,
      padding: 1
    },
    headerText: {
      fontWeight: 'bold',
    },
    item: { 
      flex: 1,
      marginLeft: 5,
      marginRight: 5,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#f5eef8', 
      padding: 10,
      borderRadius: 10
    },
    unlockButton: {
      borderRadius: 4,
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: 'lightblue'
    }


})