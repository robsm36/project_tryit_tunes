/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
import React from 'react';
import { Link } from 'react-router-dom';
import tryitLetter from '../imgs/tryitlettering1.png';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    const { name } = await getUser();
    this.setState({ userName: name });
  };

  render() {
    const { userName } = this.state;

    return (
      <>
        <div className="tryitcontainer">
          <img src={ tryitLetter } alt="" className="tryitletter" />
        </div>
        <div className="headercontainer">
          <header className="header">
            {userName
          ? <p className="username">
            Olá,
            {' '}
            {userName}
            !
          </p>
          : null}
            <Link to="/search">Buscar</Link>
            <br />
            <Link to="/favorites">Favoritos</Link>
            <br />
            <Link to="/profile">Perfil</Link>
          </header>
        </div>
      </>
    );
  }
}

export default Header;
