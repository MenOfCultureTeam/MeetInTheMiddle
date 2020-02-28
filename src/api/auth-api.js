// import firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
export const logoutUser = () => {
  firebase.auth().signOut();
  console.log('user logged out');
};

export const signInUser = async ({name, email, password}) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // firebase.auth().currentUser.updateProfile({
    //   displayName: name,
    // });
    console.log(email);
    return {};
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

export const sendEmailWithPassword = async (email) => {
  try {
    console.log(email);
    await firebase.auth().sendPasswordResetEmail(email);
    
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
