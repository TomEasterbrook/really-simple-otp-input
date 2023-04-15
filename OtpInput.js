import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";

const setInitialCode = (numberOfDigits,value) => {
    const code = []
    for (let i = 0; i < numberOfDigits; i++) {
        code[i] = value[i] || ""
    }
    return code
}
const OtpInput = ({value = [],numberOfDigits = 6,resendTimerLength = 30, onValueChanged=()=>{},onAutofill=()=>{},onNewCodeRequested = ()=>{},containerStyle = {},headerTextStyle = {},digitInputStyle = {}, codeResendEnabledStyle = {},codeResendDisabledStyle: codeResendDisabledStyle = {}, hideCode = false, headerText = "Enter your One Time Passcode"}) => {
    const [code,setCode] = useState(setInitialCode(numberOfDigits,value))
    const [newCodeTimer,setNewCodeTimer] = useState(resendTimerLength)
    const refs = useRef([])

    let newCodeButtonEnabled = newCodeTimer === 0;

    useEffect(()=>{
        onValueChanged(code)
    },[code])

    useEffect(()=>{
        if (newCodeTimer > 0) {
            setTimeout(() => {
                setNewCodeTimer(newCodeTimer - 1)
            }, 1000)
        }
    },[newCodeTimer])
    const changeDigit = (index,digit) => {
        if (digit.length === numberOfDigits){
            let autofillCode = digit.split("")
            setCode(autofillCode)
            onValueChanged(autofillCode)
            onAutofill(autofillCode)
            refs.current[5].focus();

        }else {
            const newCode =[...code]
            newCode[index]=digit
            setCode(newCode)
            onValueChanged(newCode)
        }

    }
    const onKeyPress = (index, event) => {
        if (index >=1 && event.key === 'Backspace'){
            if (code[index] === ''){
                refs.current[index-1].focus()
            }
        }else if (index<numberOfDigits-1 && event.key !== 'Backspace'){
            refs.current[index+1].focus()

        }
      
    }
    const styles = StyleSheet.create({
        container:{
            padding:10,
            flexDirection:'row',
            justifyContent:'center',
            ...containerStyle
        },
        title: {
            fontWeight:'bold',
            textAlign:'center',
            paddingTop:10,
            paddingBottom:10,
            fontSize:20,
            ...headerTextStyle
        },
        resendCodeButtonEnabled: {
            color:'blue',
            textAlign:'right',
            paddingBottom:5,
            ...codeResendEnabledStyle
        },
        resendCodeButtonDisabled: {
            color:'grey',
            textAlign:'right',
            paddingBottom:5,
            ...codeResendDisabledStyle
        },
        numberBox:{
            width:'10%',
            fontSize:30,
            textAlign:'center',
            fontWeight:'500',
            borderStyle:'solid',
            borderColor:'black',
            borderRadius:5,
            borderWidth:2,
            marginLeft:10,
            marginRight:10,
            ...digitInputStyle
        }
    })
  // @ts-ignore
    return(
        <View>
            <View>
                <Text style={styles.title}>{headerText}</Text>
            </View>
            <View style={styles.container}>
                {code.map((value,index) =>(
                    <TextInput key={index}
                               onKeyPress={({nativeEvent})=>onKeyPress(index,nativeEvent)}
                               onChangeText={(text)=>changeDigit(index,text)}
                               style={styles.numberBox} value={value} keyboardType={"number-pad"}
                               maxLength={index===0 ? numberOfDigits : 1}
                               secureTextEntry={hideCode}
                               ref={ref => !refs.current.includes(ref) && refs.current.push(ref)}
                    />

                ))}
            </View>
            <View>
                <TouchableOpacity disabled={!newCodeButtonEnabled} onPress={()=> {
                    onNewCodeRequested()
                    setNewCodeTimer(resendTimerLength)

                }
                }>
                    <Text variant="labelLarge"
                          style={newCodeButtonEnabled ? styles.resendCodeButtonEnabled : styles.resendCodeButtonDisabled}>
                        {"Not Received a code? " + (newCodeButtonEnabled ? "Resend" : `Resend in ${newCodeTimer}`)}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

  )


}

export default OtpInput