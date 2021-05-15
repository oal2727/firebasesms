import React, { Component } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput
} from 'react-native'
import auth from '@react-native-firebase/auth'

class PhoneAuthScreen extends Component {
  state = {
    phone: '',
    confirmResult: null,
    verificationCode: '',
    userId: ''
  }
  validatePhoneNumber = () => {
    console.log("press button")
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(this.state.phone)
  }

  handleSendCode = () => {
    // Request to send OTP asdad 
    console.log("send code" + this.state.phone)
    if (this.validatePhoneNumber()) {
        auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({ confirmResult })
        })
        .catch(error => {
          alert(error.message)

          console.log(error)
        })
    } else {
      alert('Invalid Phone Number')
    }
  }

  changePhoneNumber = () => {
    this.setState({ confirmResult: null, verificationCode: '' })
  }

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid })
          alert(`Verified! ${user.uid}`)
        })
        .catch(error => {
          alert(error.message)
          console.log(error)
        })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  }

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder='Verification code'
          placeholderTextColor='#eee'
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={verificationCode => {
            this.setState({ verificationCode })
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.themeButton, { marginTop: 20 }]}
          onPress={this.handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView >
        <View>
          <TextInput
            style={styles.textInput}
            placeholder='Phone Number with country code'
            placeholderTextColor='#eee'
            value={this.state.phone}
            onChangeText={phone => {
              this.setState({ phone })
            }}
            maxLength={15}
          />
          <Text>hola</Text>
          <TouchableOpacity
            style={[styles.themeButton, { marginTop: 20 }]}
            onPress={
              this.state.confirmResult
                ? this.changePhoneNumber
                : this.handleSendCode
            }>
            <Text style={styles.themeButtonTitle}>
              {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
            </Text>
          </TouchableOpacity>



          {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginTop: 150,
    width: '90%',
    height: 40,
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16
  },
  themeButton: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
    borderColor: '#555',
    borderWidth: 2,
    borderRadius: 5
  },
  themeButtonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  verificationView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50
  }
})

export default PhoneAuthScreen