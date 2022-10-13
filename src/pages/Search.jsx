import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Serch extends React.Component {
  state = {
    loginEnabled: true,
    isLoading: false,
    keyword: '',
    result: [],
    savedKeyword: '',
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
          onClick={ () => { this.handleClick(keyword); } }
        >
          Pesquisar
        </button>
      </form>);

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>
          {isLoading ? <p>Carregando...</p> : searchForm}
          {result[0] ? artist : null}
          {result[0]
            ? result.map((item) => (
              <AlbumCard
                artistName={ item.artistName }
                key={ item.collectionId }
                collectionName={ item.collectionName }
                artworkUrl100={ item.artworkUrl100 }
                collectionId={ item.collectionId }
              />))
            : <p>Nenhum álbum foi encontrado</p>}
        </div>
      </>
    );
  }
}

export default Serch;
