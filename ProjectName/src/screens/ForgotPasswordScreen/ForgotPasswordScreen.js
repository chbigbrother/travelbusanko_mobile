import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {Auth} from 'aws-amplify'



const ForgotPasswordScreen = () => {
    
    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

   
    const onSendPressed = async data => {
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword')
        } catch(e) {
            Alert.alert('경고', e.message);
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

   
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.root}>
            <Text style = {styles.title}>비밀번호 재설정하기</Text>

            <CustomInput
             name="username"
             control={control}
             placeholder="UserID"
             rules={{
                required: '사용자 ID가 필요해요.'
             }}
            />

            <CustomButton text= "Send" onPress={handleSubmit(onSendPressed)} />
            

            <CustomButton 
             text= "회원가입으로 돌아가기" 
             onPress={onSignInPressed} 
             type = "TERTIARY"
             />
        
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
})

export default ForgotPasswordScreen