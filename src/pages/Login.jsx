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
    document.body.classList.add('loginBody');

    return (
      <div className="loginContainer">
        <div>
          <img src={ tryItLettering } alt="" className="tryitLogo" />
        </div>
        <div className="loginPage">
          <h2>
            Digite seu nome
            <br />
            e clique Play
          </h2>
          <form action="" className="loginPage">
            <input
              type="text"
              name="name"
              onChange={ this.checkEnable }
            />
            <br />
          </form>
          <button
            hidden={ isLoading }
            className="loginButton"
            type="button"
            disabled={ loginEnabled }
            onClick={ () => { this.handleClick({ name: userName }); } }
          >
            {}
          </button>
          {isLoading ? <p>Carregando...</p> : <p> </p>}
          {doRedirect ? <Redirect to="/search" /> : null}
          <img src={ playerLogo } alt="" className="playerLogo" hidden={ isLoading } />
        </div>
      </div>
    );
  }
}

export default Login;
