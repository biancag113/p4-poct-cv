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
      Storage.put('example.png', file, {
          contentType: 'image/png'
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
            <div style={style.captureButton} />
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

//////

// class S3ImageUpload extends React.Component {
  // onChange(e) {
  //     const file = e.target.files[0];
  //     Storage.put('example.png', file, {
  //         contentType: 'image/png'
  //     })
  //     .then (result => console.log(result))
  //     .catch(err => console.log(err));
  // }

//   render() {
//       return (
//           <input
//               type="file" accept='image/png'
//               onChange={(evt) => this.onChange(evt)}
//           />
//       )
//   }
// }
//////


const style = {
  container: {
    margin: 'auto',
    width: '50%',
  },
  preview: {
    margin: 'auto',
    width: '50%',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    bottom: '10px',
    width: '50%'
  },
  captureButton: {
    margin: 'auto',
    width: '50%',
    backgroundColor: 'white',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderRadius: '30%',
    height: 56,
    width: 56
  },
  captureImage: {
    margin: 'auto',
    width: '50%',
  }
};
