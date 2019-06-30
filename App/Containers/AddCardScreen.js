import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Loading from 'react-native-loading-spinner-overlay'
import AddCardScreenStyles from './Styles/AddCardScreenStyles'
import { CreditCardInput } from 'react-native-credit-card-input'
import { connect } from 'react-redux'
import PayboxRegisterRedux from '../Redux/PayboxRegisterRedux'
import PayboxCaptureRedux from '../Redux/PayboxCaptureRedux'

class AddCardScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cardNumber: '',
            cvv: '',
            expireAt: ''
        }
    }

    onPress = () => {
        this.props.payboxRegisterRequest(this.props.token, {
            cardNumber: this.state.cardNumber,
            cvv: this.state.cvv,
            expireAt: this.state.expireAt
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.payboxRegisterStatus === 'finished') {
            if (nextProps.cardStatus === 'ACTIVATED') {
                this.props.payboxCaptureRequest(this.props.token, 150)
                nextProps.navigation.navigate('StationScreen',  {token: nextProps.token})
            } else {
                alert(JSON.stringify(nextProps.payboxRegisterError.message))
            }
        }
    }


    render() {
        return (
            <View style={AddCardScreenStyles.container}>
                <Loading visible={(this.props.payboxRegisterStatus === 'activated') ? true : false} textContent={'Loading...'} />
                <CreditCardInput onChange={this.onChange} />
                <View style={AddCardScreenStyles.buttonView}>
                    <TouchableOpacity style={AddCardScreenStyles.button} onPress={this.onPress}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onChange = (form) => {
        this.setState({
            cardNumber: form.values.number.replace(/\s/g, ''),
            cvv: form.values.cvc,
            expireAt: form.values.expiry.replace('/', '')
        })
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.signUp.token,
        cardStatus: state.payboxRegister.cardStatus,
        payboxRegisterStatus: state.payboxRegister.status,
        payboxRegisterError: state.payboxRegister.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        payboxRegisterRequest: (token, cardValues) => dispatch(PayboxRegisterRedux.payboxRegisterRequest(token, cardValues)),
        payboxCaptureRequest: (token, amount) => dispatch(PayboxCaptureRedux.payboxCaptureRequest(token,amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen)
