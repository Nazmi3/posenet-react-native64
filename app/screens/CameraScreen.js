import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  InteractionManager,
  Text,
  Linking,
  Platform,
  SafeAreaView,
  BackHandler,
  StatusBar,
  Alert,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Camera} from 'expo-camera';
import {ready, dispose, loadGraphModel, getBackend} from '@tensorflow/tfjs';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import Tts from 'react-native-tts';
// import '@tensorflow/tfjs-backend-webgl';

const TensorCamera = cameraWithTensors(Camera);

const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
  const [useCamera2, setUseCamera2] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isLoaded, setLoaded] = React.useState(false);

    const [textureDims, setTextureDims] = useState({});


    useEffect(() => {
        let isMounted = true;
        if (Platform.OS === 'ios') {
            setTextureDims({ height: 1920, width: 1080, })
      
          } else {
            setTextureDims({ height: 1200, width: 1600, })
          }

         (async () => {
            await tf.ready().then((tf) => { 
                setLoaded(true);
                loadBlazefaceModel()
                loadPosenetModel()
                });
            // await tf.setbackend()

             
    })();

     const loadPosenetModel = async () => {
      const model =  await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: inputTensorWidth, height: inputTensorHeight },
        multiplier: 0.75,
        quantBytes: 2
      });
      setUseCamera2(false);
      return model;
    }
  
    const loadBlazefaceModel = async () => {
      setUseCamera2(true);
      return model;
    }

         
    setTimeout(() => {
      setLoaded(true);
    }, 5000);
    }, []);
    //   if (hasPermission === null) {
    //     return <View />;
    //   }
    //   if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   }

    const handleImageTensorReady = (tensors) => {
      console.log('tensors.handleImageTensorReady.', tensors);
      if (!tensors) {
        console.log('Image not found!');
      }
      
    //   images: IterableIterator<tf.Tensor3D>;
    //   updatePreview: () => void, gl: ExpoWebGLRenderingContext) {
    //   const loop = async () => {
    //     const {modelName} = this.state;
    //     if(!AUTORENDER) {
    //       updatePreview();
    //     }
  
    //     if(modelName === 'posenet') {
    //       if (this.state.posenetModel != null) {
    //         const imageTensor = images.next().value;
    //         const flipHorizontal = Platform.OS === 'ios' ? false : true;
    //         const pose = await this.state.posenetModel.estimateSinglePose(
    //           imageTensor, { flipHorizontal });
    //         this.setState({pose});
    //         tf.dispose([imageTensor]);
    //       }
    //     } else {
    //       if (this.state.faceDetector != null) {
    //         const imageTensor = images.next().value;
    //         const returnTensors = false;
    //         const faces = await this.state.faceDetector.estimateFaces(
    //           imageTensor, returnTensors);
  
    //         this.setState({faces});
    //         tf.dispose(imageTensor);
    //       }
    //     }
  
    //     if(!AUTORENDER) {
    //       gl.endFrameEXP();
    //     }
    //     this.rafID = requestAnimationFrame(loop);
    //   };
  
    //   loop();
    // }
  }
  
    const camView = () => {
      return ( 
          <TensorCamera
            // Standard Camera props
            style={styles.camera}
            type={Camera.Constants.Type.back}
            zoom={0}
            // tensor related props
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={inputTensorHeight}
            resizeWidth={inputTensorWidth}
            resizeDepth={3}
            onReady={tensors => handleImageTensorReady(tensors)}
            autorender={true}
          />
      )
    }

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
            useCamera2Api={useCamera2}
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
          </Camera> */}
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

