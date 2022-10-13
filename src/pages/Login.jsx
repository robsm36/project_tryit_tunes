import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    loginEnabled: true,
    userName: '',
    isLoading: false,
    doRedirect: false,
  };

  checkEnable = ({ target }) => {
    const name = target.value;
    return name[2]
      ? this.setState(
        { loginEnabled: false },
        () => { this.setState({ userName: name }); },
      )
      : this.setState(
        { loginEnabled: true },
        () => { this.setState({ userName: name }); },
      );
  };

  handleClick = async (nameObject) => {
    this.setState({ isLoading: true });
    await createUser(nameObject);
    this.setState({ isLoading: false }, () => {
      this.setState({ doRedirect: true });
    });
  };

  render() {
    const { loginEnabled, userName, isLoading, doRedirect } = this.state;

    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form action="">
          <input
            type="text"
            data-testid="login-name-input"
            name="name"
            onChange={ this.checkEnable }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ loginEnabled }
            onClick={ () => { this.handleClick({ name: userName }); } }
          >
            Entrar
          </button>
        </form>
        {isLoading ? <p>Carregando...</p> : <p> </p>}
        {doRedirect ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
