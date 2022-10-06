import React from 'react';
import Header from '../components/Header';

class Serch extends React.Component {
  state = {
    loginEnabled: true,
  };

  checkEnable = ({ target }) => {
    // validando quantidade caracteres sem uso de state
    const name = target.value;
    return name[1]
      ? this.setState({ loginEnabled: false }) : this.setState({ loginEnabled: true });
  };

  render() {
    const { loginEnabled } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>
          <form action="">
            <input
              type="text"
              data-testid="search-artist-input"
              name="name"
              onChange={ this.checkEnable }
            />
            <button
              type="button"
              value="Pesquisar"
              data-testid="search-artist-button"
              disabled={ loginEnabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Serch;
