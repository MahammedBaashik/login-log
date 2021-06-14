import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyAD5uop6Na_4fOrvaFf7rrY9DXdpPgQP9M",
  authDomain: "login1-316e3.firebaseapp.com"
})


class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
      console.log("user", user)
    })

  }


  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In</div>
            <button onClick={() =>firebase.auth().signOut()}>Sign Out</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App;
