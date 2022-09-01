import React, {useState} from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {Auth} from 'aws-amplify'




const NewPasswordScreen = () => {
    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

   
    const onSubmitPressed = async data => {
        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn')
        } catch(e) {
            Alert.alert('경고', e.message);
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.root}>
            <Text style = {styles.title}>비밀번호 재설정하기</Text>


            <CustomInput
             placeholder= "ID"
             name="username"
             control={control}
             rules={{required: 'ID를 입력해주세요.'}}
            />

            <CustomInput
             placeholder= "Code"
             name="code"
             control={control}
             rules={{required: '코드를 입력해주세요.'}}
            />

            <CustomInput
             placeholder= "설정할 비밀번호"
             name="password"
             secureTextEntry
             control={control}
             rules={{
                required: '새로 설정할 비밀번호를 입력해주세요.',
                minLength : {
                    value: 8,
                    message: '비밀번호는 8자 이상이어야 해요.'
                },
            }}
            />


            <CustomButton text= "Submit" onPress={handleSubmit(onSubmitPressed)} />
            

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

export default NewPasswordScreen