const checkAvailId = () => {
    console.log(inputId)
    Axios.post(url + '/api/checkid', null, {
        params: {
            'user_id': inputId,
        }
    }).then((response) => {
        if(response.data.message=='No'){
            alert('사용이 불가능한 아이디 입니다.')
        }else{
            alert('사용이 가능한 아이디 입니다.')
        }
    })
}






//     const onForgotPasswordPressed = () => {
//         navigation.navigate('ForgotPassword');
//     }

//     // const onSignInFacebook = () => {
//     //     console.warn('onSignInFacebook');
//     // }

//     // const onSignInGoogle = () => {
//     //     console.warn('onSignInGoogle');
//     // }

//     // const onSignInApple = () => {
//     //     console.warn('onSignInApple');
//     // }

//     const onSignUpPressed = () => {
//         navigation.navigate('SignUp');
//     }

//     return (
//         <ScrollView showsVerticalScrollIndicator={false}>
//         <View style = {styles.root}>
//             <Image
//                  source={Logo}
//                  style = {[styles.logo, {height: height * 0.3}]}
//                  resizeMode="contain"
//             />

//             <TextInput>
//                 value={this.state.value}
//                 onChange={ (e) =>this.setUsername({ value: e}) }
//             </TextInput>

//             {/* <CustomInput
//              name="username"
//              placeholder= "ID"
//              control={control}
//             //  value = {username}
//             //  setValue = {setUsername}
//              onChangeText={ (e) => handleUsername(e) }
//              rules={{required: 'ID 가 입력되지 않았어요. ㅜㅜ'}}
         
//             /> */}

//             <TextInput>
//                 value={this.state.value}
//                 onChange={ (e) =>this.setPassword({ value: e}) }
//             </TextInput>


//             {/* <CustomInput
//              name="password"
//              placeholder= "Password"
//              secureTextEntry
//              control={control}
//             //  value = {password}
//             //  setValue = {setPassword}
//              rules={{required: '비밀번호가 입력되지 않았어요. ㅜㅜ',
//                      minLength: {value: 3,
//                                  message: '비밀번호는 8자 이상 되어야해요.'}}} 
//             /> */}

//             {/* <Controller
//              control={control}
//              name = "userID"
//              render={({field: {value, onChange, onBlur}}) => (
//              <TextInput value={value} onChangeText={onChange} onBlur={onBlur} placeholder={"userID"} />)} 
//             /> */}

        
//             {/* <TextInput placeholder={"password"} /> */}




//             <CustomButton 
//              text= {loading ? "진행중.." : "로그인"}
//              onPress={handleSubmit(onSignInPressed)} />

//             <CustomButton 
//              text= "비밀번호를 잊어버리셨나요?" 
//              onPress={onForgotPasswordPressed} 
//              type = "TERTIARY"
//              />



        
//             {/* <CustomButton
//              text= "Sign In with Facebook"
//              onPress={onSignInFacebook}
//              bgColor = "#E7EAF4"
//              fgColor= "#4765A9"
//              />
//             <CustomButton 
//              text= "Sign In with Google" 
//              onPress={onSignInGoogle}
//              bgColor = "#FAE9EA"
//              fgColor= "#DD4D44"
//              />
//             <CustomButton
//              text= "Sign In with Apple"
//              onPress={onSignInApple}
//              bgColor = "#e3e3e3"
//              fgColor= "#363636"
//              /> */}

//             <CustomButton 
//              text= "회원이 아니신가요?" 
//              onPress={onSignUpPressed} 
//              type = "TERTIARY"
//              />
    
//         </View>
//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     root: {
//         alignItems: 'center',
//         padding: 20, 
//     },

//     logo: {
//         width: '70%',
//         maxWidth: 300,
//         maxHeight: 200,
//     },
// })

// export default SignInScreen;


import CustomButton from "../../components/CustomButton";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
// import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
Button,
Platform,

} from 'react-native';
// import Input from '../../utils/forms/input';

const SignUpScreen = ({goWithoutLogin}) => {
    var url = 'http://travelbusanko.com';
const [type, setType] = useState('Login');
const [loading, setLoading] = useState(false);
const [action, setAction] = useState('Login');
const [actionMode, setActionMode] = useState('새로 등록할게요~');
const [hasErrors, setHasErrors] = useState(false);
const navigation = useNavigation();
const onSignUpPressed = () => {
        axios.post(url + '/api/signup', null, {
            params: {



                // let data = {userId:form.email.value, userPw: form.password.value}

                'user_id': form.Myid.value,
                'user_pwd': form.Mypassword.value,
                'user_name': form.Myname.value,
                'user_email': form.Myemail.value,
                'user_phone': form.Myphone.value,
                'user_birth': form.Mybirth.value,

            }
        }).then((response) => {
            /*if (response.data.userId === undefined) {
                alert('입력하신 id가 일치하지 않습니다.')
            } else if (response.data.userId === null) {
                alert('입력하신 pwd가 일치하지 않습니다.')
            } else if (response.data.userId === inputId) {
                sessionStorage.setItem('user_id', inputId)
                document.location.href = url + '/'
            }*/
            console.log(response);
            // console.log(Myid);
            document.location.href = url
        }).catch()
    navigation.navigate('Home')
    
};

// const handleSubmit = () => {
// console.log('BTN')
// try{
//     let data = {userId:form.email.value, userPw: form.password.value}
//     console.log(data)
//     axios.post('http://travelbusanko.com' + "/api/login", JSON.stringify(data),
//     {
//     headers: {
//     "Content-Type": 'application/json',
//     }
//     }) 
//     .then(res =>{
    
//     if(res.data.userId === form.email.value){
//         navigation.navigate('Home')
//     }
    

//     },
    
//     ).catch(ex => {
//         console.log("login failed:  catch --> " + ex); 
//     })

// }catch(e) {
//         console.log("login failed")
//     }
// }

const [form, setForm] = useState({
Myid: {
  value: '',
  type: 'textInput',
  rules: {},
  valid: false,
},
Mypassword: {
  value: '',
  type: 'textInput',
  rules: {},
  valid: false,
},
Myname: {
    value: '',
    type: 'textInput',
    rules: {},
    valid: false,
  },
Myemail: {
    value: '',
    type: 'textInput',
    rules: {},
    valid: false,
  },
Myphone: {
    value: '',
    type: 'textInput',
    rules: {},
    valid: false,
  },
  Mybirth: {
    value: '',
    type: 'textInput',
    rules: {},
    valid: false,
  },
// confirmPassword: {
//   value: '',
//   type: 'textInput',
//   rules: {},
//   valid: false,
// },
});

//   state = {
//     type: 'Login',
//     action: 'Login',
//     actionMode: '새로 등록할게요~',
//     hasErrors: false,
//     form: {
//       email: {
//         value: '',
//         type: 'textInputRevised',
//         rules: {},
//         valid: false,
//       },
//       password: {
//         value: '',
//         type: 'textInput',
//         rules: {},
//         valid: false,
//       },
//       confirmPassword: {
//         value: '',
//         type: 'textInput',
//         rules: {},
//         valid: false,
//       },
//     },
//   };
updateInput = (name, value) => {
setHasErrors(false);
let formCopy = form;
formCopy[name].value = value;
setForm(form => {
  return {...formCopy};
});
// setForm({
//   form: formCopy,
// });
console.warn(form);
};


confirmPassword = () => {
return type != 'Login' ? (
  <TextInput
    value={form.confirmPassword.value}
    type={form.confirmPassword.type}
    secureTextEntry={true}
    placeholder="비밀번호 재입력"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('confirmPassword', value)}
  />
) : null;
};
formHasErrors = () => {
return hasErrors ? (
  <View >
    <Text>
      앗! 로그인 정보를 다시 확인해주세요~
    </Text>
  </View>
) : null;
};
return (
<View>
  <TextInput
    value={form.Myid.value}
    type={form.Myid.type}
    autoCapitalize={'none'}
    // keyboardType={'email-address'}
    placeholder="ID"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Myid', value)}
  />
  <TextInput
    value={form.Mypassword.value}
    type={form.Mypassword.type}
    secureTextEntry={true}
    placeholder="비밀번호"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Mypassword', value)}
  />


<TextInput
    value={form.Myname.value}
    type={form.Myname.type}
    placeholder="이름"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Myname', value)}
  />
  <TextInput
    value={form.Myemail.value}
    type={form.Myemail.type}
    // secureTextEntry={true}
    keyboardType={'email-address'}
    placeholder="이메일"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Myemail', value)}
  />
  <TextInput
    value={form.Myphone.value}
    type={form.Myphone.type}
    // secureTextEntry={true}
    placeholder="전화번호"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Myphone', value)}
  />
  <TextInput
    value={form.Mybirth.value}
    type={form.Mybirth.type}
    placeholder="생년월일"
    placeholderTextColor={'#ddd'}
    onChangeText={value => updateInput('Mybirth', value)}
  />


<CustomButton 
         text= {loading ? "진행중.." : "회원가입"}
         onPress={onSignUpPressed}

         />
{/* 
<CustomButton 
         text= "회원이 아니신가요?" 
         onPress={onSignUpPressed} 
         type = "TERTIARY"
         /> */}


  {/* {confirmPasswtord()} */}
  {formHasErrors()}
  <View >
    <View >
      <Button title={action} color="#48567" />
    </View>
    <View >
      <Button title={actionMode} color="#48567" />
    </View>
    <View >
      <Button
        title="비회원 로그인"
        color="#48567"
        onPress={() => goWithoutLogin()}
      />
    </View>
  </View>
</View>
);
};

// const styles = StyleSheet.create({
//   errorContainer: {
//     marginBottom: 10,
//     marginTop: 30,
//     padding: 20,
//     backgroundColor: '#ee3344',
//   },
//   errorLabel: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
//   button: {
//     …Platform.select({
//       ios: {
//         marginTop: 15,
//       },
//       android: {
//         marginTop: 15,
//         marginBottom: 10,
//       },
//     }),
//   },
// });

export default SignUpScreen;










// var url = 'http://travelbusanko.com';

// const [inputId, setInputId] = useState('');
//     const [inputPw, setInputPw] = useState('');
//     const [inputName, setInputName] = useState('');
//     const [inputEmail, setInputEmail] = useState('');
//     const [inputPhone, setInputPhone] = useState('');
//     const [inputBirth, setInputBirth] = useState('');
    
//     const handleInputId = (e) => {
//         setInputId(e.target.value)
//     };

//     const handleinputPw = (e) => {
//         setInputPw(e.target.value)
//     }
//     const handleinputName = (e) => {
//         setInputName(e.target.value)
//     }
//     const handleinputEmail = (e) => {
//         setInputEmail(e.target.value)
//     }
//     const handleinputPhone = (e) => {
//         setInputPhone(e.target.value)
//     }
//     const handleinputBirth = (e) => {
//         setInputBirth(e.target.value)
//     }

//     const checkAvailId = () => {
//         console.log(inputId)
//         Axios.post(url + '/api/checkid', null, {
//             params: {
//                 'user_id': inputId,
//             }
//         }).then((response) => {
//             if(response.data.message=='No'){
//                 alert('사용이 불가능한 아이디 입니다.')
//             }else{
//                 alert('사용이 가능한 아이디 입니다.')
//             }
//         })
//     }

//     /// login 버튼 클릭 이벤트
//     const onClickSignup = () => {
//         Axios.post(url + '/api/signup', null, {
//             params: {
//                 'user_id': inputId,
//                 'user_pwd': inputPw,
//                 'user_name': inputName,
//                 'user_email': inputEmail,
//                 'user_phone': inputPhone,
//                 'user_birth': inputBirth,

//             }
//         }).then((response) => {
//             /*if (response.data.userId === undefined) {
//                 alert('입력하신 id가 일치하지 않습니다.')
//             } else if (response.data.userId === null) {
//                 alert('입력하신 pwd가 일치하지 않습니다.')
//             } else if (response.data.userId === inputId) {
//                 sessionStorage.setItem('user_id', inputId)
//                 document.location.href = url + '/'
//             }*/
//             console.log(response);
//             document.location.href = url
//         }).catch()
//     }