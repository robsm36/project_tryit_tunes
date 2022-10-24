import React from 'react';
import { Link } from 'react-router-dom';
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
    const { description, email, image, name } = user;
    const userProfile = (
      <div>
        <p>
          {' '}
          {name}
        </p>
        <p>
          {email}
        </p>
        <img src={ image } alt="" data-testid="profile-image" />
        <p>
          {description}
        </p>
      </div>
    );

    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h2>Perfil</h2>
          {isLoading ? <p>Carregando...</p> : userProfile}
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
