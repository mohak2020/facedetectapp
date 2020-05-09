import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './components/navigation/Navigation';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';



const app = new Clarifai.App({
 apiKey: '48bc3d2df4dc4525851b63c89dcbd593'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input : '',
      imageUrl : ''
    }
  }

  onInputChange = (event)=>{
    this.setState({input : event.target.value})
    console.log(this.input);
  }

  onButtonSubmit = ()=>{
    //console.log('click');
    this.setState({imageUrl: this.state.input});
    console.log(this.imageUrl);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
       console.log(err);
    }
  );
  }
  


  render(){
    return (
      <div className="App">

        <Particles className = 'particles'
                params={particlesOptions} />

        <Navigation/>
        <Rank/>
        <Logo/>
        <ImageLinkForm onInputChange = {this.onInputChange } onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition imageUrl = {this.imageUrl}/>

      </div>
    );
  }
}

export default App;
