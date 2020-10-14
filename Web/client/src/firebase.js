//firebase.js
import * as firebase from "firebase/app"
import 'firebase/firestore';
// ...



//firebase.js
const firebaseConfig = {
	apiKey: "AIzaSyBqdvaUqNByD_R0zIhLMRPDQ677iwSetMc",
    authDomain: "scrum-game-uade.firebaseapp.com",
    databaseURL: "https://scrum-game-uade.firebaseio.com",
    projectId: "scrum-game-uade",
    storageBucket: "scrum-game-uade.appspot.com",
    messagingSenderId: "919500917072",
    appId: "1:919500917072:web:0018ded1ca394039a70455",
    measurementId: "G-ES5W27SK2R"
}

firebase.initializeApp(firebaseConfig);

export default firebase;