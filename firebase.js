import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAkTrdH5tRMoBChl39u4RevzaB07VXaLtA",
    authDomain: "signal-clone-ba47e.firebaseapp.com",
    projectId: "signal-clone-ba47e",
    storageBucket: "signal-clone-ba47e.appspot.com",
    messagingSenderId: "745792250592",
    appId: "1:745792250592:web:132508ccbff7c0424ea685"
  };

  let app;

  if (firebase?.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const db = app.firestore ();
  const auth = firebase.auth ()

  export {db, auth};

 