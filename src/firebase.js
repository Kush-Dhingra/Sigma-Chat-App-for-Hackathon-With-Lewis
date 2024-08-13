import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebase_config'
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth