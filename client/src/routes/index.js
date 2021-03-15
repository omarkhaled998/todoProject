import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/Signup/index';
import Main from '../pages/main/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact  component={SignIn} />
      <Route path="/todo" component={Main} />
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      {/* <Route path="/dashboard" component={Dashboard} isPrivate />
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      {/* <Route component={SignIn} /> */} 
    </Switch>
  );
}