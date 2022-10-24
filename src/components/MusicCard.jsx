import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  setFavorite = async (track) => {
    this.setState({ isLoading: true });
    await addSong(track);
    const favoriteTracks = await getFavoriteSongs();
    this.setState({ isLoading: false });
    return favoriteTracks;
  };

  favoriteCheck = (favoriteSongs, trackId) => (
    favoriteSongs.some((track) => track.trackId === trackId)
  );

  render() {
    const { trackName, previewUrl, trackId, track, favSongs } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteCheck">
          Favorita
          <input
            id="favoriteCheck"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => { this.setFavorite(track); } }
            defaultChecked={ this.favoriteCheck(favSongs, trackId) }
          />
        </label>
        {isLoading ? <p>Carregando...</p> : null}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.objectOf(String).isRequired,
  favSongs: PropTypes.arrayOf(Object).isRequired,
};

export default MusicCard;
