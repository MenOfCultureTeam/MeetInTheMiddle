import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Map from '../pages/Map'
export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="map" component={Map} title="Map" />
        </Stack>
      </Router>
    );
  }
}
