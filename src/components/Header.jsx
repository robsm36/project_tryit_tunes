import React from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component">
        <p>Header</p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        {userName
          ? <p data-testid="header-user-name">{userName}</p>
          : <p>Carregando...</p>}
      </header>
    );
  }
}

export default Header;
