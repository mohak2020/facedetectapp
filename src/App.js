import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import './components/navigation/Navigation';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'

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
  render(){
    return (
      <div className="App">

        <Particles className = 'particles'
                params={particlesOptions} />

        <Navigation/>
        <Rank/>
        <Logo/>
        <ImageLinkForm/>
        
      
      {/* 
      
      <FaceRecognition/> */}

      </div>
    );
  }
}

export default App;
