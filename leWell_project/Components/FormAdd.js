import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { createPost } from '../API/postAPI';
import { ImageManipulator } from 'expo';


export default function FormAdd() {
  const [hasCameraPermission,setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

const takePicture = async () => {
  if (camera) {
    const options = {
      quality: 0.5, // Ajustez la qualité selon vos besoins (0.0 - 1.0)
      width: 800,   // Largeur souhaitée de l'image
      height: 800,  // Hauteur souhaitée de l'image
    };

    const data = await camera.takePictureAsync(options);
    setImage(data.uri);
    setIsTakingPicture(false);
  }
};
  const startTakingPicture = () => {
    setImage(null);
    setIsTakingPicture(true);
  };

  const sendFormData = () => {
    let data = new FormData(); 
    data.append('photo', {
      name: image.fileName, 
      type : image.type, 
      uri : Platform.OS === 'ios' ? image.replace('file://', '') :image.uri,
    })
    data.append('title', title)
    data.append('description', description)  

    createPost(data).then(res => {
        console.log('ok')
    }).catch(error => {
        console.log(error)
    })
  }

  
  return (
    <View style={styles.container}>
      {isTakingPicture ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fullScreenCamera}
            type={type}
            ratio={'1:1'}
          />
          <View style={styles.cameraButtons}>
            <Button
              title="Flip Image"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <Button title="Prendre la photo" onPress={() => takePicture()} />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.bigTitle}> Ajouter un post </Text>
          <Text style={styles.label}>Titre :</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez un titre"
            value={title}
            onChangeText={(text) => setTitle(text)} 
          />
          <Text style={styles.label}>Description :</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez une description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          /> 
          <Button
            title="Prendre une photo"
            onPress={() => startTakingPicture()}
          />
        </View>
      )}

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      {image && (
        <View style={styles.buttonContainer}>
          <Button title="Envoyer" onPress={() => sendFormData()} />
        </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EBE3F5',
    padding: 20,
  },
  bigTitle: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 4,
  },
  cameraContainer: {
    flex: 1,
  },
  fullScreenCamera: {
    flex: 1,
  },
  cameraButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'transparent',
  },
  imagePreview: {
    flex: 1,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

