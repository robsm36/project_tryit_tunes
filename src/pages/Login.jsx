/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { Redirect } from 'react-router-dom';
import playerLogo from '../imgs/pngtree.png';
import tryItLettering from '../imgs/tryitlettering1.png';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    loginEnabled: true,
    userName: '',
    isLoading: false,
    doRedirect: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.listener);
    return () => {
      document.removeEventListener('keydown', this.listener);
    };
  }

  listener = (event) => {
    const { userName } = this.state;
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      this.handleClick({ name: userName });
    }
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
    // document.body.classList.add('loginBody');

    return (
      <div className="loginContainer">
        <div>
          <img src={ tryItLettering } alt="" className="tryitLogo" />
        </div>
        <div className="loginPage">
          <h2>
            Digite seu nome
            <br />
            e clique no botão Play
          </h2>
          <form action="" className="loginPage">
            <input
              type="text"
              name="name"
              onChange={ this.checkEnable }
              autoFocus
            />
            <br />
          </form>
          {isLoading ? <p>Carregando...</p> : null}
          {doRedirect ? <Redirect to="/search" /> : null}
          <div className="playerLogoContainer">
            <button
              hidden={ isLoading }
              className="loginButton"
              type="button"
              disabled={ loginEnabled }
              onClick={ () => { this.handleClick({ name: userName }); } }
            >
              { }
            </button>
            <img src={ playerLogo } alt="" className="playerLogo" hidden={ isLoading } />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
