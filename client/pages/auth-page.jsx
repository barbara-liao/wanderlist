import React from 'react';
import AuthForm from '../components/auth-form';
import parseRoute from '../lib/parse-route';
import decodeToken from '../lib/decode-token';
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

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
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
