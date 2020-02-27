// @author DABELOPER
import React, { Component } from 'react';
import './App.css';

// import { features } from './assets/features.json';

import Feature from './components/Feature';
import Head from './components/Head';
import Foot from './components/Foot';
import Popup from './components/Popup';

import firebase from 'firebase';
import {CONFIG} from './firebase';

class App extends Component {
  
  constructor() {
    super();
    this.state = { features: [] , control: "", feature: {} };
    this.goToFeature = this.goToFeature.bind(this);
    this.backToHome = this.backToHome.bind(this);
    if (!firebase.apps.length) {
      try {
        this.app = firebase.initializeApp(CONFIG);
        this.db = this.app.firestore();
      } catch (err) {
          console.error("Firebase initialization error raised", err.stack)
      }
  }
  }

  componentDidMount() {
    //Firebase Logic
    this.db.collection("features").get().then( (data) => {

      const newFeatures = [];
      Promise.all(data.docs.map(item => newFeatures.push( item.data() ))).then( () => {
        this.setState( { features: newFeatures });
      });

      // data.docs. map( item => {
      //   const feature = item.data();
      //   // console.log( 'feature' , feature);
      //   return this.setState( state => {
      //     const fts = state.features.push(feature);
      //     return {fts};
      //   });
      // });
    });
    
  }

  goToFeature( f ) {
    this.setState({control: 'show'});
    this.setState({feature: f});
  }

  backToHome() {
    this.setState({control: ''});
    this.setState({feature: {}});
  }

  render() {
    return (
      <div>
        < Head/>
        < Popup feature={this.state.feature} control={this.state.control} onClose={this.backToHome}/>
        <div id="main">
          <div className="inner">
            <div className="columns">
              { this.state.features.map( feature => {
                return ( <Feature key={feature.id} data={feature} onClick={this.goToFeature}/> );
              } )}
            </div>
          </div>
        </div>
        < Foot/>
        <div ref={el => (this.instance = el)}></div>
      </div>
    );
  }
}

export default App;
