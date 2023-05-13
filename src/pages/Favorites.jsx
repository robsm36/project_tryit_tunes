import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteTracks: [],
  };

  async componentDidMount() {
    this.mytest();
  }

  mytest = async () => {
    const favoriteTracks = await getFavoriteSongs();
    this.setState({
      favoriteTracks,
    });
  };

  updateFavorites = () => {
    const favoriteTracks = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({ favoriteTracks });
  };

  render() {
    const { favoriteTracks } = this.state;

    return (
      <>
        <Header />
        <div className="favoritescontainer">
          {
            favoriteTracks.map((track) => (
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
