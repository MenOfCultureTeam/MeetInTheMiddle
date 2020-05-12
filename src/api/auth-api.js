// import firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


export const logoutUser = () => {
  firebase.auth().signOut();
  console.log('user logged out');
};


var getRef = () => {
  return firebase.database().ref();
};

export const getUid = () => {
return firebase.auth().currentUser.uid;
};


export const signInUser = async ({Name ,username, email, password}) => {
  try {
   getRef().child("UserIDs/").orderByChild('username').equalTo(username).once("value").then(snapshot => {
    if (snapshot.exists()) {
    let userData = snapshot.val()
    console.log(userData)
    return userData;
        } 
else {
    
  console.log('not found');
     
    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>
      {

      }).catch(() => {
        Alert.alert('There was an error');
       })
      
      let newUser = firebase.database().ref().child("/UserIDs").child(getUid).set({
        Username: username,
      }).then(() => console.log('Username attached to Id'))
      console.log('Auto generated key', newUser);
      console.log(Name);

      //Combines Username node with UserId value
      let newID = firebase.database().ref().child("/Usernames").child(username).set({
        UserID: getUid,
      }).then(() => console.log('New Id created'))
      console.log('Auto generated key', newID);

      let createUserAccount = firebase.database().ref().child("/Users").child(getUid).set({
        Username: username,
        Name: Name,
        Email: email,
        Photo: 'https://i.ytimg.com/vi/F-ptQ3wIuKw/hqdefault.jpg'
      }).then(() => console.log('Account created'))
      console.log('Auto generated key', createUserAccount);
      }
     });
   
    
    return 'hello';
    
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return {
          error: 'E-mail already in use.',
        };
      case 'auth/invalid-email':
        return {
          error: 'Invalid e-mail address format.',
        };
      case 'auth/weak-password':
        return {
          error: 'Password is too weak.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};

export const loginUser = async ({email, password}) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('logging in');
    return {};
  } catch (error) {
    console.log(error.code);
    switch (error.code) {
      case 'auth/invalid-email':
        return {
          error: 'Invalid email address format.',
        };
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return {
          error: 'Invalid email address or password.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};

export const sendEmailWithPassword = async ({email}) => {
  try {
    console.log('Resetting password');
    console.log(email);
    await firebase.auth().sendPasswordResetEmail(email, null);
    return {};
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return {
          error: 'Invalid email address format.',
        };
      case 'auth/user-not-found':
        return {
          error: 'User with this email does not exist.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }

};


