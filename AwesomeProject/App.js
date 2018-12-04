import React from 'react';
import { base64Img } from 'base64-js';
import { Text, View, TouchableOpacity, NativeModules } from 'react-native';
import { Permissions } from 'expo-permissions';
import { Camera } from 'expo-camera';
import {FileUpload} from 'react-native-file-upload';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image: false,
    };
  }


  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  onPictureSaved = async photo => {
    const data = new FormData();
    data.append('test','test1');
    data.append("pic",JSON.stringify({image: photo, type: 'image/jpeg', name: 'test.jpeg'}));
    // data.append("image", photo);
    setTimeout(function(){
      fetch("http://143.248.48.96:5050/watchData", {
        method: 'post',
        body: data
      })
      .then(res => {console.log(res)})
    }, 2000);
  }

  render() {
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {
            !image ?
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end'
                }}
                onPress={() => {
                  if (this.camera) {
                    this.camera.takePictureAsync({base64:true}).then((data) => {
                      this.onPictureSaved(data);
                    });
                  }
                }
                }>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'black', backgroundColor: 'white' }}> Snap </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          :
          <div></div>
          }
        </View>
      );
    }
  }
}