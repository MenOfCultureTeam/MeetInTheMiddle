import React from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

const GoogleSigninButton = () => {
  return (
    <GoogleSigninButton //Google sigin api button object
      style={{width: 301, height: 51, top: 71}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={this.signIn}
      disabled={this.state.isSigninInProgress}
    />
  );
};

export default GoogleSigninButton;
