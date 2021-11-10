import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, View, Image, ActivityIndicator, TouchableOpacity, ImageBackground, InteractionManager, Text, Linking, Platform, SafeAreaView, BackHandler, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScaledSheet } from "react-native-size-matters";
import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

import * as posenet from '@tensorflow-models/posenet';



const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;


export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isLoaded, setLoaded] = React.useState(false);

    const [textureDims, setTextureDims] = useState({});


    useEffect(() => {
        let isMounted = true;
        // if (Platform.OS === 'ios') {
        //     setTextureDims({ height: 1920, width: 1080, })
      
        //   } else {
        //     setTextureDims({ height: 1200, width: 1600, })
        //   }

         (async () => {
            await tf.ready().then((tf) => { 
                setLoaded(true);
                posenet.load().then((model) => {
                    console.log('useEffect...posenet load', model)
                    // if (isMounted.current) {
                    //   setModel(model);
                    // }
                  });
                });
            // await tf.setbackend()

             
    })();

         
        // await tf.ready().then((tf) => {
        //     console.log('tf...', tf)
        //     if (isMounted) {
        //         setLoaded(true);
        //     }
        // });
        // (async () => {
        //   const { status } = await Camera.requestPermissionsAsync();
        //   setHasPermission(status === 'granted');
        // })();
    }, []);
    //   if (hasPermission === null) {
    //     return <View />;
    //   }
    //   if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   }

    

    if (!isLoaded) {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Loading Tensor Flow</Text>
                    <ActivityIndicator />
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '800%',
        backgroundColor: '#fff',
      },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

