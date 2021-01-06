import firebase from 'firebase/app'
import 'firebase/auth'

import config from './config'
if(firebase.apps.length){
   var firebaseApp = firebase.initializeApp(config)
}

export default firebaseApp.auth()
export default firebaseApp.firestore()