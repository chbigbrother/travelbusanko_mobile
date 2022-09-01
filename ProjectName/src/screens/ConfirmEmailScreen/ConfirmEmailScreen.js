import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {useRoute} from '@react-navigation/native'
import {Auth} from 'aws-amplify'


const ConfirmEmailScreen = () => {
    const route = useRoute();
    const {control, handleSubmit} = useForm({defaultValues: {username: route?.params?.username}});

    const navigation = useNavigation();
   
    const onConfirmPressed = async data => {
        // console.warn(data);
        // navigation.navigate('Home')
        try {
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn')
        } catch(e) {
            Alert.alert('경고', e.message);
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onResendPressed = async () => {
        try {
            await Auth.confirmSignUp(username);
            Alert.alert('성공', '이메일로 재전송 되었어요.');
        } catch(e) {
            Alert.alert('경고', e.message);
        }
    } 


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.root}>
            <Text style = {styles.title}>이메일 인증하기</Text>


            <CustomInput
             name="username"
             control={control}
             placeholder= "ID"
             rules={{
                required: 'ID가 필요해요.'
             }}
            />

            <CustomInput
             name="code"
             control={control}
             placeholder= "이메일로 전송된 인증코드를 입력해주세요."
             rules={{
                required: '인증코드가 필요해요.'
             }}
            />

            <CustomButton text= "인증하기" onPress={handleSubmit(onConfirmPressed)} />

            


            <CustomButton 
             text= "인증코드 재전송하기" 
             onPress={onResendPressed} 
             type = "SECONDARY"
             />
            

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

export default ConfirmEmailScreen