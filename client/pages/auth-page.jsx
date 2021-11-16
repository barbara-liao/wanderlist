import React from 'react';
import AuthForm from '../components/auth-form';
import parseRoute from '../lib/parse-route';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  render() {
    const { user, route, handleSignIn } = this.context;
    if (user) return <Redirect to="trips" />;
    return (
      <AuthForm onSignIn={handleSignIn} action={route.path} />
    );
  }
}

AuthPage.contextType = AppContext;
