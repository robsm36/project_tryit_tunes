import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <p>Login</p>
        </div>
      </>
    );
  }
}

export default Favorites;
