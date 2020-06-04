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
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'



const app = new Clarifai.App({
 apiKey: 'd217f992ade146028bc4a1412d15eecc'
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
      imageUrl : '',
      box: {},
      route:'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: new Date()
      }
    }
  }

  // this.setState(user:{
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   password: user.password,
  //   entries: user.entries,
  //   joined: user.joined

  // })

  loadUser = (data)=>{ 
    this.setState({user:{
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined

    }})
    
  }


  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    console.log('test to check if function is running');
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event)=>{
    this.setState({input : event.target.value})
   // console.log(this.input);
  }

  onButtonSubmit = ()=>{
    //console.log('click');
    this.setState({imageUrl: this.state.input});
   // console.log(this.imageUrl);

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
    .then(response=>{

      if(response){
        fetch('http://localhost:3000/image',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(err=>console.log(err));
     
  }

  onRouteChange = (route)=>{
    if (route ==='signout'){
      this.setState({isSignedIn: false})
    } else if(route ==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  


  render(){

    const {isSignedIn, route, imageUrl, box} = this.state
    return (

     
      <div className="App">

        <Particles className = 'particles'
                params={particlesOptions} />

        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        { 
        route === 'home'?
        <div>
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <Logo/>
            <ImageLinkForm onInputChange = {this.onInputChange } onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {box} imageUrl = {imageUrl}/>
          </div>
        
        : (this.state.route === 'signIn'? 
        <SignIn loadUser={this.loadUser}  onRouteChange = {this.onRouteChange}/> :
        <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
          )
          
       
        }
      </div>
    );
  }
}

export default App;
