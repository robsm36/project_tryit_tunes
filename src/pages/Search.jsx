/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import manMusic from '../imgs/manmusic.jpg';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Serch extends React.Component {
  state = {
    loginEnabled: true,
    isLoading: false,
    keyword: '',
    result: [],
    savedKeyword: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.listener);
    return () => {
      document.removeEventListener('keydown', this.listener);
    };
  }

  listener = (event) => {
    const { keyword } = this.state;
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      this.handleClick(keyword);
    }
  };

  checkEnable = ({ target }) => {
    const keyword = target.value;
    return keyword[1]
      ? this.setState(
        { loginEnabled: false },
        () => { this.setState({ keyword }); },
      ) : this.setState({ loginEnabled: true }, () => { this.setState({ keyword }); });
  };

  handleClick = async (keyword) => {
    this.setState(
      { isLoading: true },
      () => { this.setState({ result: [] }); },
    );
    const result = await searchAlbumsAPI(keyword);
    this.setState({ isLoading: false }, () => {
      this.setState({ result,
        savedKeyword: keyword });
    });
  };

  render() {
    const { loginEnabled, isLoading, result, keyword, savedKeyword } = this.state;
    const artist = (
      <p>
        Resultado de álbuns de:
        {' '}
        {savedKeyword}
      </p>);

    const searchForm = (
      <form action="" className="searchBox">
        <input
          type="text"
          name="name"
          onChange={ this.checkEnable }
          autoFocus
        />
        <br />
        <p>Busque pelo artista que deseja escutar</p>
        <button
          className="button-50"
          type="button"
          value="Pesquisar"
          disabled={ loginEnabled }
          onClick={ () => { this.handleClick(keyword); } }
        >
          Pesquisar
        </button>
      </form>);

    return (
      <>
        <Header />
        <br />
        {/* <div> */}
        {isLoading ? <p>Carregando...</p> : searchForm}
        {result[0] ? artist : null}
        {result[0]
          ? <div className="albumcontainer">
            {result.map((item) => (
              <AlbumCard
                artistName={ item.artistName }
                key={ item.collectionId }
                collectionName={ item.collectionName }
                artworkUrl100={ item.artworkUrl100 }
                collectionId={ item.collectionId }
              />))}
          </div>
          : <p />}
        <div className="listenerimg">
          <p>Na sua hora.</p>
          <img src={ manMusic } alt="" className="manmusic" />
          <p id="p2">Do seu jeito.</p>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default Serch;
