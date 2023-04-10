import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";

const OtpInput = ({value, onValueChanged,onAutofill,onNewCodeRequested}) => {
    const [code,setCode] = useState(['','','','','',''])
    const [newCodeTimer,setNewCodeTimer] = useState(30)
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
        if (digit.length === 6){
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
        }else if (index<5 && event.key !== 'Backspace'){
            refs.current[index+1].focus()

        }
      
    }
  // @ts-ignore
    return(
        <View>
            <View>
                <Text variant={"titleLarge"} style={styles.title}> Enter your One Time Passcode</Text>
            </View>
            <View style={styles.container}>
                {code.map((value,index) =>(
                    <TextInput key={index}
                               onKeyPress={({nativeEvent})=>onKeyPress(index,nativeEvent)}
                               onChangeText={(text)=>changeDigit(index,text)}
                               style={styles.numberBox} value={value} keyboardType={"number-pad"}
                               maxLength={index===0 ? 6 : 1}
                               ref={ref => !refs.current.includes(ref) && refs.current.push(ref)}
                    />

                ))}
            </View>
            <View>
                <TouchableOpacity disabled={!newCodeButtonEnabled} onPress={()=> {
                    onNewCodeRequested()
                    setNewCodeTimer(30)

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
const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection:'row',
        justifyContent:'center'
    },
    title: {
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:10,
        paddingBottom:10
    },
    resendCodeButtonEnabled: {
        color:'blue',
        textAlign:'right',
        paddingBottom:5
    },
    resendCodeButtonDisabled: {
        color:'grey',
        textAlign:'right',
        paddingBottom:5
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
        marginRight:10
    }
})
export default OtpInput