import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteTracks: [],
  };

  async componentDidMount() {
    this.mytest();
  }

  mytest = async () => {
    this.setState({ isLoading: true });
    const favoriteTracks = await getFavoriteSongs();
    this.setState({ isLoading: false });
    this.setState({
      favoriteTracks,
    });
  };

  updateFavorites = () => {
    const favoriteTracks = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({ favoriteTracks });
    // JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))
  };

  render() {
    const { isLoading, favoriteTracks } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <p>Favorites</p>
          {
            isLoading ? <p> Carregando... </p> : favoriteTracks.map((track) => (
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ Number(track.trackId) }
                key={ track.trackId }
                track={ track }
                favSongs={ favoriteTracks }
                func={ this.updateFavorites }
              />))
          }
        </div>
      </>
    );
  }
}

export default Favorites;
