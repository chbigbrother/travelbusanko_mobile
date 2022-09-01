// import React, {useState} from "react";
// import axios from "axios";
// import {
//      View,
//      Text,
//      Image, 
//      StyleSheet, 
//      useWindowDimensions, 
//      ScrollView,
//      TextInput,
//      Alert,
//      } from 'react-native';
// import Logo from '../../../assets/images/logo.png';
// import CustomInput from "../../components/CustomInput";
// import CustomButton from "../../components/CustomButton";
// import { useNavigation } from '@react-navigation/native'
// import {useForm, Controller} from 'react-hook-form'
// import {Auth, JS} from 'aws-amplify'

// const SignInScreen = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const {height} = useWindowDimensions();
//     const navigation = useNavigation();
//     const [loading, setLoading] = useState(false);
//     const {
//         control, 
//         handleSubmit, 
//         formState: {errors},
//     } = useForm();

//     // console.log(errors);
//     const handleUsername = (e) => {
//         console.log("hghghghghghghgh");
//         console.log(e.target.value);
//     }
    const onSignInPressed = async (data) => {
        if(loading) {
            return;
        }
        setLoading(true);
        // navigation.navigate('Home');
        try { //로그인 및 올바르지 않은 경우 오류 핸들링

            console.log("uuuusssseeerrr:" + username)

            // await Auth.signIn(data.username, data.password);
            let data = {userId:username, userPw: password}
            axios.post('http://travelbusanko.com' + "/api/login", JSON.stringify(data),
            {
                headers: {
                    "Content-Type": 'application/json',
                }
}) 
    .then(res =>{
        console.log(res)
    })


            // console.log(response)
            // navigation.navigate('Home');
        } catch(e) {
            Alert.alert('경고', e.message);
        }
        setLoading(false);
        
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

const SignInScreen = ({goWithoutLogin}) => {
  const [type, setType] = useState('Login');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('Login');
  const [actionMode, setActionMode] = useState('새로 등록할게요~');
  const [hasErrors, setHasErrors] = useState(false);
  const navigation = useNavigation();
  const onSignUpPressed = () => {
            navigation.navigate('SignUp');
        };
  const handleSubmit = () => {
    console.log('BTN')
    try{
        let data = {userId:form.email.value, userPw: form.password.value}
        console.log(data)
        axios.post('http://travelbusanko.com' + "/api/login", JSON.stringify(data),
        {
        headers: {
        "Content-Type": 'application/json',
        }
        }) 
        .then(res =>{
        
        if(res.data.userId === form.email.value){
            navigation.navigate('Home')
        }
        
    
        },
        
        ).catch(ex => {
            console.log("login failed:  catch --> " + ex); 
        })
    
    }catch(e) {
            console.log("login failed")
        }
  }

  const [form, setForm] = useState({
    email: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    password: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    confirmPassword: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
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
        value={form.email.value}
        type={form.email.type}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        placeholder="이메일 주소"
        placeholderTextColor={'#ddd'}
        onChangeText={value => updateInput('email', value)}
      />
      <TextInput
        value={form.password.value}
        type={form.password.type}
        secureTextEntry={true}
        placeholder="비밀번호"
        placeholderTextColor={'#ddd'}
        onChangeText={value => updateInput('password', value)}
      />

<CustomButton 
             text= {loading ? "진행중.." : "로그인"}
             onPress={handleSubmit(onSignInPressed)} />

<CustomButton 
             text= "회원이 아니신가요?" 
             onPress={onSignUpPressed} 
             type = "TERTIARY"
             />


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

export default SignInScreen;
