import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    user: {},
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ user });
    this.setState({ isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    const { name } = user;
    const userProfile = (
      <div>
        <p>
          Nome:
          {' '}
          {name}
        </p>
      </div>
    );

    return (
      <>
        <Header />
        <div>
          <h2>Perfil</h2>
          {isLoading ? <p>Carregando...</p> : userProfile}
        </div>
      </>
    );
  }
}

export default Profile;
