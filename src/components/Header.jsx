import React from 'react';
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
        {userName
          ? <p data-testid="header-user-name">{userName}</p>
          : <p>Carregando...</p>}
      </header>
    );
  }
}

export default Header;
