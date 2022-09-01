import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';





// const SERVER_URL = 'http://localhost:3000';
const SERVER_URL = 'http://travelbusanko.com';



const createFormData = (photo, body = {}) => {
  // const data = new FormData();

  const fd = new FormData();

    //--------- FormData 생성
    fd.append('User_id', 'abcd');
    fd.append('imgProfile', {
      name: photo.fileName, // require, file name
      uri: 'file://' + photo.path, // require, file absoluete path
      type: photo.type, // options, if none, will get mimetype from `filepath` extension
    });
    
    

  // data.append('photo', {
  //   fileName: photo.fileName,
  //   type: photo.type,
  //   uri: photo.uri,
  //   exif: photo.exif,
  //   width: photo.width
    // uri: photo.uri.replace('file://', ''),

    // uri:
    //   Platform.OS === "android"
    //     ? photo.uri
    //     : photo.uri.replace("file://", "")
  // });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });



  return data;
};





const fetchResourceFromURI = async uri => {
  const response = await fetch(uri);
  console.log(response);
  const blob = await response.blob();
  return blob;
};


const MyServerUpload = () => {
  const [photo, setPhoto] = React.useState(null);
  const navigation = useNavigation();

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log('->',response);
        console.log('------>>>',photo);
        // console.log('>>>',photo.width);
       

       
      }
    });
  };

 
  const handleBack = () => {
    navigation.navigate('Home')
  }

  const handleUploadPhoto = () => {


    // fetch(`${SERVER_URL}/upload/profile`, {
    //   method: 'POST',
    //   body: createFormData(photo, ),
    // })
    
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log('response', response);
    //     console.log('ee', photo)
    //     console.log(createFormData(photo, ))

    //   })
    //   .catch((error) => {
    //     console.log('error1', error);
    //   });


    const fd = new FormData();

    for (var i = 0; i < fd.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
      //--------- FormData 생성
     fd.append('User_id', 'abcd');
     fd.append('imgProfile'+ i, {


      name: photo.assets[0].fileName, // require, file name
      uri:  photo.assets[0].uri, // require, file absoluete path
      type: photo.assets[0].type, // options, if none, will get mimetype from `filepath` extension
    });
    }

    

    console.log(photo.assets[0].fileName)

    // console.log('upload', fd);


      //--------- Fetch
    fetch(SERVER_URL + '/upload/profile', {
      body: fd,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log('RES: ', res)
        // console.log("FD: ", fd)
        
        
      })
      .catch(error => {
       console.log("Error", error)
      });

      


    // const nowSelectImageList = photo;
    //     const previewList = photo;
    //     let fileURL = [];

    //     let file;
    //     let maxFile = 50;
    //     let filesLength = nowSelectImageList.length > maxFile ? maxFile : nowSelectImageList.length;
        
    //     fileURL.push(nowSelectImageList);
    //     setImages(fileURL);
    //     for(var i=0; i<filesLength; i++){
    //         file = nowSelectImageList[i];
    //         if(file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png"){
    //             setImages([]);
    //             Swal.fire({
    //                 icon: "warning",
    //                 title: "사진 형식 에러",
    //                 text: `JPG 사진 파일만 가능합니다.`,
    //                 showCancelButton: true,
    //                 confirmButtonText: "확인",
    //                 cancelButtonText: "취소",
    //             })
    //             break;
    //         } else{
    //             const preview = URL.createObjectURL(nowSelectImageList[i]);
    //             previewList.push(preview);
    //         }
    //     }
    //     setPreviewImages(previewList);




  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button title="지도로 돌아가기" onPress={handleBack} />
    </View>
  );
};

export default MyServerUpload;












// import axios from 'axios';
// import { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import $ from 'jquery';
// import Swal from "sweetalert2";
// import uuid from "react-uuid"

// const url = "http://travelbusanko.com";
// function AddLocPage() {
//     const [images, setImages] = useState([]);
//     const [previewImages, setPreviewImages] = useState([]);
//     const [loctypeInput, setLoctypeInput] = useState('');
    
//     const addImage = e => {
//         const nowSelectImageList = e.target.files;
//         const previewList = [...nowSelectImageList];
//         let fileURL = [];

//         let file;
//         let maxFile = 50;
//         let filesLength = nowSelectImageList.length > maxFile ? maxFile : nowSelectImageList.length;
        
//         fileURL.push(nowSelectImageList);
//         setImages(fileURL);
//         for(var i=0; i<filesLength; i++){
//             file = nowSelectImageList[i];
//             if(file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png"){
//                 setImages([]);
//                 Swal.fire({
//                     icon: "warning",
//                     title: "사진 형식 에러",
//                     text: `JPG 사진 파일만 가능합니다.`,
//                     showCancelButton: true,
//                     confirmButtonText: "확인",
//                     cancelButtonText: "취소",
//                 })
//                 break;
//             } else{
//                 const preview = URL.createObjectURL(nowSelectImageList[i]);
//                 previewList.push(preview);
//             }
//         }
//         setPreviewImages(previewList);
//     }
    
//     axios.get(url + "/api/location/types", {
//         headers: {
//             "Content-Type": `application/json`,
//         }
//     }).then((res) => {
//         var data = res.data;
//         var innerHTML = "<option value='" + data[0].loctype_id + "'>위치 타입 선택</option>";
//         for(var i=0; i<data.length; i++){
//             innerHTML += "<option key={uuid()} value='" + data[i].loctype_id + "'>" + data[i].loctype_name + "</option>";
//         }
//         $(".selectbox").html(innerHTML);
//     })

//     useEffect(()=>{
        
//     })

//   return (
//     <div className='m-5'>
//     <Form name="form" method="post" encType='multipart/form-data' action="http://travelbusanko.com/api/add/location">
//         <Form.Label>위치 타입</Form.Label>
//         <Form.Select aria-label="Default select example" className='selectbox' name="loctype_id" >
//             {/* <option value="1">One</option>
//             <option value="2">Two</option>
//             <option value="3">Three</option> */}
//         </Form.Select>
//         <br/>
//         <Form.Control type="hidden" name="post_type" value="LOC" />
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>위치명</Form.Label>
//             <Form.Control type="text" name="loc_name" placeholder="위치명입력" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>위치 포인트</Form.Label>
//             <Form.Control type="text" name="loc_point" placeholder="위치 포인트 입력" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword" onChange={ addImage }>
//             <Form.Label>위치 사진</Form.Label>
//             <Form.Control type="file" name="uploadfile" multiple="multiple" placeholder="위치 포인트 입력" />
//         </Form.Group>
//         <div className='preview__box' style={{width:'100%', height:'300px', display:'flex'}}>
//         {previewImages.map((image, id) => (
//             <div key={id} style={{float:'left'}}>
//                 <img src={image} alt={`${image}-${id}`} style={{width:'100%', height:'300px'}}/>
//             </div>
//         ))}
//         </div>
//         <Button variant="primary" type="submit">
//             Submit
//         </Button>
//     </Form>
//     </div>
//   );
// }

// export default AddLocPage;