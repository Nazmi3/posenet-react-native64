import * as posenet from '@tensorflow-models/posenet';
import { Camera } from 'expo-camera';
import { ActivityIndicator, Button, StyleSheet, View, Platform } from 'react-native';
import Svg, { Circle, Rect, G, Line } from 'react-native-svg';

import * as tf from '@tensorflow/tfjs';
import { LoadingView } from './LoadingView';
import { useTensorFlowModel } from './useTensorFlow';

import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import React, { Component, useEffect, useState } from 'react';

const TensorCamera = cameraWithTensors(Camera);

const inputTensorWidth = 152;
const inputTensorHeight = 200;

const AUTORENDER = true;



export function ModelView() {
  const model = useTensorFlowModel(posenet);
  console.log('model..', model)
  const [predictions, setPredictions] = React.useState([]);
  const [textureDims, setTextureDims] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    // (async () => {
    //   const { status } = await Camera.requestPermissionsAsync();
    //   setHasPermission(status === 'granted');
    // })();

    if (Platform.OS === 'ios') {
      setTextureDims({ height: 1920, width: 1080, })

    } else {
      setTextureDims({ height: 1200, width: 1600, })
    }


  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  if (!model) {
    return <LoadingView>Loading TensorFlow model</LoadingView>;
  }

  const handleImageTensorReady = (tensors) => {
    console.log('tensors..', tensors);
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
      <View style={styles.cameraContainer}>
        <TensorCamera
          // Standard Camera props
          style={styles.camera}
          // type={Camera.Constants.Type.front}
          // zoom={0}
          // // tensor related props
          // cameraTextureHeight={textureDims.height}
          // cameraTextureWidth={textureDims.width}
          // resizeHeight={inputTensorHeight}
          // resizeWidth={inputTensorWidth}
          // resizeDepth={3}
          // onReady={tensors => handleImageTensorReady(tensors)}
          // autorender={true}
        />
        {/* <View style={styles.modelResults}>
          {modelName === 'posenet' ? this.renderPose() : this.renderFaces()}
        </View> */}
      </View>
    )
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      {/* <PredictionList predictions={predictions} /> */}
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        {/* <ModelCamera model={model} setPredictions={setPredictions} /> */}
        {/* {camView()} */}
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
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cameraContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '800%',
    backgroundColor: '#fff',
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
  // camera: {
  //   position: 'absolute',
  //   left: 50,
  //   top: 100,
  //   width: 600 / 2,
  //   height: 800 / 2,
  //   zIndex: 1,
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   borderRadius: 0,
  // }
});
