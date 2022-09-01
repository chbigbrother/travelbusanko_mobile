import React, { useState } from "react";
import { View, Text, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import Homescreen from '../screens/Homescreen'
import { useEffect } from 'react';
import { Auth, Hub } from "aws-amplify";
import BlogScreen from "../screens/BlogScreen";
import PicUploadScreen from "../screens/PicUploadScreen";
import MyServerUpload from "../screens/ServerUpload/MyServerUpload";



const Stack = createNativeStackNavigator();

const Navigation = () => {

  const [user, setUser] = useState(undefined);

  const checkUser = async() => {
    try{
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch(e) {
      setUser(null);
    }
    
  }
  
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if(data.payload.event == 'signIn' || data.payload.event == 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);


  // if(user == undefined) {
  //   return (
  //     <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator />
  //     </View>
  //   )
  // }
  
    return (
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown: false}}>
             {user ? (
              <>
              <Stack.Screen name = "Home" component = {Homescreen} />
              <Stack.Screen name = "Picture" component = {PicUploadScreen} />
              <Stack.Screen name = "Blog" component = {BlogScreen} />
              <Stack.Screen name = "Server" component = {MyServerUpload} />

              </>
             ) : (
              <>
             <Stack.Screen name = "SignIn" component = {SignInScreen} />
             <Stack.Screen name = "SignUp" component = {SignUpScreen} />
             <Stack.Screen name = "ConfirmEmail" component = {ConfirmEmailScreen} />
             <Stack.Screen name = "ForgotPassword" component = {ForgotPasswordScreen} />
             <Stack.Screen name = "NewPassword" component = {NewPasswordScreen} />
             <Stack.Screen name = "Home" component = {Homescreen} />
              <Stack.Screen name = "Picture" component = {PicUploadScreen} />
              <Stack.Screen name = "Blog" component = {BlogScreen} />
              <Stack.Screen name = "Server" component = {MyServerUpload} />
             
             </>

             )

             }
             
             


           </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;