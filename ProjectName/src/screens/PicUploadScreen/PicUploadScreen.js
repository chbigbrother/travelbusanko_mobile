import React,  {Component} from "react";
import { View, Text, Image, Button } from 'react-native'
import MapView from 'react-native-maps';
import {Auth} from 'aws-amplify'
import {useNavigation} from '@react-navigation/native'
import Homescreen from ".";
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'



const PicUploadScreen = () => {
    const navigation = useNavigation();

    state = {
        avatarSource: null,
    }
     
    selectImage = async() => {
        ImagePicker.showImagePicker({noData:true, mediaType: 'photo'}, (response) => {
            console.log('Response = ', response);

            if(response.didCancel) {
                console.log('User cancelled image picker.');
            } else if (response.error) {
                console.log('image picker : ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button', response.customButton);
            } else {


                this.setState({
                    avatarSource: response.uri,
                });
            }
        });
    }
    
    

    return (
        <View>

        {
            this.state.avatarSource && <Image source={{uri: this.state.avatarSource}} style = {{width: '80%', height: 200, resizeMode: 'contain'}}/>
        }

        <Button title="Select Image" onPress={launchImageLibrary}/>

        </View>
    );
   
       
}


export default PicUploadScreen;


