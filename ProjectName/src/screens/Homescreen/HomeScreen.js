import React, { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { View, Text, Platform } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
import {Auth, Geo} from 'aws-amplify'
import {useNavigation} from '@react-navigation/native'
import Homescreen from ".";
import axios from "axios";



async function requestPermission() {
    try {
        if(Platform.OS == "ios") {
            return await Geolocation.requestAuthorization("always");
        }
        // 안드로이드 위치 정보 수집 권한 요청
         if (Platform.OS === "android") {
             return await PermissionsAndroid.request(
                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch(e) {
        console.log(e);
    }
}


const HomeScreen = () => {
    const navigation = useNavigation();
    
    const signOut = () => {
        axios.post('http://travelbusanko.com/api/logout', {
          headers: {'Content-Type': 'app;ication/json'},
          withCredentials: true,
        }).then((
          navigation.navigate('SignIn')
        ))
    }

    const goToBlog = () => {
        navigation.navigate('Server')
    }

    const [location, setLocation] = useState();
    useEffect(() => {
    requestPermission().then(result => {
      if (result === "granted") {
        Geolocation.getCurrentPosition(
          pos => {
            setLocation(pos.coords)
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, []);

  if (!location) {
    return (
      <View>
        <Text>위치 사용 권한설정을 허용해 주세여.</Text>
      </View>
    );
  }


    return (
        <>
        <View style = {{flex: 1}}>
        <MapView 
            style={{flex: 1}}
            provider = {PROVIDER_GOOGLE}
            initialRegion = {{

                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,

            }}            
        />
        <Text 
            onPress = {goToBlog}
            style = {{
                width: '100%',
                textAlign: 'center',
                color: 'black',
                marginTop: '1%',
                marginVertical: 20,
                fontSize: 20,
            }}>
            게시판으로 가기
        </Text>
        <Text 
            onPress = {signOut}
            style = {{
                width: '100%',
                textAlign: 'center',
                color: 'red',
                marginTop: 'auto',
                marginVertical: 20,
                fontSize: 20,
            }}>
            로그아웃
        </Text>
        </View>
        </>
        // {/* <Text 
        //     onPress = {goToBlog}
        //     style = {{
        //         width: '100%',
        //         textAlign: 'center',
        //         color: 'black',
        //         marginTop: '1%',
        //         marginVertical: 20,
        //         fontSize: 20,
        //     }}>
        //     게시판으로 가기
        // </Text>
        // <Text 
        //     onPress = {signOut}
        //     style = {{
        //         width: '100%',
        //         textAlign: 'center',
        //         color: 'red',
        //         marginTop: 'auto',
        //         marginVertical: 20,
        //         fontSize: 20,
        //     }}>
        //     로그아웃
        // </Text> */}


    );
}


export default HomeScreen;

