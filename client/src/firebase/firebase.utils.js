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

export const addCartToFireStore = async (userAuth, cartItems)=>{
    if(!userAuth) return;
    const userRef = firestore.doc(`carts/${userAuth.uid}`)

    cartItems = {...{userId:userAuth.uid},...{cartItems:cartItems}}
    const snapShot = await userRef.get()
    if(!snapShot.exists){
        
        try{
            await userRef.set(cartItems)

        } catch(error){
            console.log('error saving cart', error.message)
        }
    }else{
        try{
            await userRef.set(cartItems)

        } catch(error){
            console.log('error updating cart', error.message)
        }
    }
}

export const loadCartFromFireStore= async(userAuth) =>{
    const cartsRef = firestore.collection('carts');
    const query = cartsRef.where("userId", "==", userAuth.uid);
    const snapshot = await query.get()
    const cartItems = snapshot.docs.map(doc =>{
        return doc.data()['cartItems']
    })
    return cartItems
    
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap= (collections) =>{
    const transformedCollection = collections.docs.map(doc  =>{
        const { title, items} = doc.data()

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    }
    )
    
    return transformedCollection.reduce((accumulator, collection) =>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    },{});
}

export const getCurrentUser = ()  =>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth =>{
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;