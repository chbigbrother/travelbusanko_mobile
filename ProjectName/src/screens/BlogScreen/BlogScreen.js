// import React from "react";
// import { View, Text } from 'react-native'
// import MapView from 'react-native-maps';
// import {Auth} from 'aws-amplify'
import {useNavigation} from '@react-navigation/native'
import Amplify, {Storage} from 'aws-amplify';



import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';


// import awsconfig from './src/aws-exports';
// import awsconfig from 'aws-exports'





function S3StorageUpload() {
    // Amplify.configure(awsconfig); 

    const [progressText, setProgressText] = useState('');
    const [isLoading, setisLoading] = useState(false);

    

    const navigation = useNavigation();
    
    const moveToHome = () => {
        navigation.navigate('Home')
    }

  const [asset, setAsset] = useState(null);
  const selectFile = async () => {
    await launchImageLibrary({mediaType: 'mixed'}, result => {
      if (!result.assets) {
        Alert.alert(result.errorMessage);
        return;
      }
      setAsset(result.assets[0]);
    });
  };

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };



  const uploadResource = async () => { // 사진 업로드
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);


    
    return Storage.put(asset.uri, img, {
      level: 'public',
      contentType: asset.type,
      progressCallback(uploadProgress) {
        setProgressText(
          `Progress: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100,
          )} %`,
        );
        console.log(
          `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
        );
      },
    })
      .then(res => {
        setProgressText('Upload Done: 100%');
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then(result => console.log(result))
          .catch(err => {
            setProgressText('Upload Error');
            console.log(err);
          });
      })
      .catch(err => {
        setisLoading(false);
        setProgressText('Upload Error');
        console.log(err);
      });
  };




  return (
    <View style={styles.container}>
      <Text 
            onPress = {moveToHome}
            style = {{
                width: '100%',
                textAlign: 'center',
                color: 'black',
                marginTop: 'auto',
                marginVertical: 20,
                fontSize: 20,
            }}>
            지도로 돌아가기
        </Text>

      
      <TouchableOpacity onPress={selectFile}>
        <Text style={styles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
      </TouchableOpacity>
      {asset ? (
        asset.type.split('/')[0] === 'image' ? (
          <Image
            style={styles.selectedImage}
            source={{uri: asset?.uri ?? ''}}
          />
        ) : (
          <Video
            style={styles.selectedImage}
            source={{uri: asset?.uri ?? ''}}
          />
        )
      ) : null}
      {asset && (
        <>
          <TouchableOpacity onPress={uploadResource}>
            <Text style={styles.button}>UPLOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAsset(null)}>
            <Text style={styles.cancelButton}>Remove Selected Image</Text>
          </TouchableOpacity>
        </>
      )}
      <Text>{progressText}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'blue',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    color: 'blue',
  },
  selectedImage: {
    width: 175,
    height: 200,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default S3StorageUpload;

