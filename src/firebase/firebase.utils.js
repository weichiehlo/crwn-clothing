import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBga-lnF3BxGocWw_2DLpQoeJ_oaXEsEok",
    authDomain: "crwn-db-9d99d.firebaseapp.com",
    databaseURL: "https://crwn-db-9d99d.firebaseio.com",
    projectId: "crwn-db-9d99d",
    storageBucket: "crwn-db-9d99d.appspot.com",
    messagingSenderId: "292875523106",
    appId: "1:292875523106:web:9f84de84c474187ec2e67b",
    measurementId: "G-7G03R226XM"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch(error){
            console.log('error createing user', error.message)
        }
    }  

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;