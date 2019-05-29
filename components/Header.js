import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'


class Header extends Component {
    render() {
        return (
            <View style={styles.headerStyle}>
                {typeof (this.props.goBack) !== 'undefined' ?
                    <TouchableOpacity onPress={() => { this.props.goBack() }}>
                        <Image style={styles.imageHeaderStyle} source={require('../images/goBack-icon.png')} />
                    </TouchableOpacity> :
                    <View style={{marginLeft: 10,}}></View>}

                <Text style={styles.titleHeaderStyle}>{this.props.title}</Text>
            </View>
        )
    }
}





const styles = StyleSheet.create({
    headerStyle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageHeaderStyle: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    titleHeaderStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})

export default Header