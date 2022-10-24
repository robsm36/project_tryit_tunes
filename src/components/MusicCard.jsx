import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  handleFavorite = async (track) => {
    this.setState({ isLoading: true });
    const favoriteTracks = await getFavoriteSongs();
    this.removeFavorite(favoriteTracks, track);
    await addSong(track);
    this.setState({ isLoading: false });
    return favoriteTracks;
  };

  removeFavorite = async (favoriteTracks, track) => (
    favoriteTracks.some((song) => song.trackId === track.trackId)
      ? removeSong(track) : null
  );

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
            onChange={ () => { this.handleFavorite(track); } }
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
