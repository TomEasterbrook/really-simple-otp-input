
# Really Simple One Time Passcode Input
This is a simple one time passcode input for your React Native App. I made this because I couldn't find a simple one that suited my needs. I wanted a simple one that I could just drop in and use without having to worry about styling or anything else. This is my first React Native component so please let me know if there are any issues or if you have any suggestions.

## Installation
```
NPM: npm install react-native-really-simple-otp-input
Yarn: yarn add react-native-really-simple-otp-input
```
## Usage
```
import OTPInput from 'react-native-really-simple-otp-input';
OtpInput value={code}
         onValueChanged={(value)=> {
                     setCode(value)
                 }}
         onAutofill={()=>setOtpAutofilled(true)}
         onNewCodeRequested={resendCode}/>

```
![A screenshot of the component](https://i.imgur.com/69rvScb.png)
## Props
| Prop | Type | Default | Description                                                                          |
| --- | --- | --- |--------------------------------------------------------------------------------------|
| value | Array | [] | The value of the OTP input. This should be an array of strings. One string per digit |
| numberOfDigits | Number | 6 | The number of digits that make up the code                                           |
| resendTimerLength | Number | 30 | The length of time in seconds that the resend button is disabled for                 |
| onValueChanged | Function | () => {} | A function that is called when the value of the input changes. The value is passed as a parameter |
| onAutofill | Function | () => {} | A function that is called when the code is autofilled by the OS. This is useful if you want to do something when the code is autofilled |
| onNewCodeRequested | Function | () => {} | A function that is called when the user taps the resend button. This is useful if you want to do something when the user requests a new code |
| containerStyle | Object | {} | A style object that is applied to the container of the component |
| headerTextStyle | Object | {} | A style object that is applied to the header text of the component |
| digitInputStyle | Object | {} | A style object that is applied to the input for each digit |
| codeResendEnabledStyle | Object | {} | A style object that is applied to the resend button when it is enabled |
| codeResendDisabledStyle | Object | {} | A style object that is applied to the resend button when it is disabled |
| hideCode | Boolean | false | A boolean that determines whether the code is hidden or not. If true the code will be hidden with dots |
| headerText | String | "Enter your One Time Passcode" | The text that is displayed above the input |


## License
MIT License - Feel free to use this in any project you like.

## Contributing
As this is my first React Native component I would love to hear any suggestions or improvements. Please feel free to open an issue or a pull request.

## Credits
This project was inspired by [react-native-otp-input](https://github.com/naveenvignesh5/react-native-otp-textinput) 
