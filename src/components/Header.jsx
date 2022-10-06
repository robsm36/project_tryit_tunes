import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: false,
    userName: '',
  };

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser = async () => {
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState({ userName: name }, () => {
      this.setState({ isLoading: false });
    });
    // console.log(name);
  };

  render() {
    const { userName, isLoading } = this.state;

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
