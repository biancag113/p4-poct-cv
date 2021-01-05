import React, { Component } from 'react';
import Camera from 'react-camera';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './../../aws-exports';

Amplify.configure(awsconfig);

export default class AddTest extends Component {

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {

        //creates image blob
      this.img.src = URL.createObjectURL(blob);  

      //uploads image blob to S3 bucket
      const file = this.blob;
      Storage.put(`${Date.now()}.jpg`, file, {
          contentType: 'image/jpg'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
  
        //removes Blob reference from the internal mapping, Blob deleted 
      this.img.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }

  render() {
    return (        
      <div style={style.container}>

        {/* <input
              type="file" accept='image/png'
              onChange={(evt) => this.onChange(evt)}
          /> */}

        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div id='imgbutton' style={style.captureButton} />
          </div>
        </Camera>
        <img
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />
      </div>
    );
  }
}


const style = {
  container: {
    margin: '20px',
    width: '50%',
  },
  preview: {
    marginLeft: '500px',
    marginTop: '20px',
    width: '50%',
  },
  captureContainer: {
    margin: '10px',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    width: '50%',
    height: '50%'
  },
  captureButton: {
    marginTop: '10px',
    width: '50%',
    backgroundColor: 'green',
    borderColor: 'lightgreen',
    borderStyle: 'solid',
    borderRadius: '30%',
    height: 56,
    width: 56
  },
  captureImage: {
    marginTop: '10px',
    width: '50%',
  }
};
