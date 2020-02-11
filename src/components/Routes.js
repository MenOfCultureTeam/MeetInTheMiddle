import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Map from '../pages/Map'
import Edit_profile from '../pages/Edit_Profile'
import Profile_Welcome from '../pages/Profile_Welcome'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login"  />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="map" component={Map} title="Map"  />
          <Scene key="Edit_Profile" component={Edit_profile} title="Edit_Profile"   />
          <Scene key="Profile_Welcome" component={Profile_Welcome} title="Profile_Welcome"initial={true}   />
        </Stack>
      </Router>
    );
  }
}
