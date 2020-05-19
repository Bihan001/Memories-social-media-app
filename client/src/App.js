import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import PeopleNearby from './components/PeopleNearby/PeopleNearby';
import PrivateRoute from './components/PrivateRouting/PrivateRoute';
import Alert from './components/layouts/Alert';
import { MDBContainer } from 'mdbreact';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import ProfileFollowing from './components/Profile/ProfileFollowing';
import ProfileFollowers from './components/Profile/ProfileFollowers';
import ProfileAbout from './components/Profile/ProfileAbout';
import ProfileEdit from './components/Profile/ProfileEdit';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <MDBContainer
            style={{
              width: 300,
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: 9999,
            }}
          >
            <Alert />
          </MDBContainer>
          <Switch>
            <PrivateRoute exact path="/newsfeed" component={Newsfeed} />
            <PrivateRoute exact path="/profile/:userName" component={Profile} />
            <PrivateRoute exact path="/people-nearby" component={PeopleNearby} />
            <PrivateRoute exact path="/following/:userName" component={ProfileFollowing} />
            <PrivateRoute exact path="/followers/:userName" component={ProfileFollowers} />
            <PrivateRoute exact path="/profile/about/:userName" component={ProfileAbout} />
            <PrivateRoute exact path="/profile/edit/:userName" component={ProfileEdit} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
