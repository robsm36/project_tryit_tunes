import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  setFavorite = async (track) => {
    // console.log('foi');
    this.setState({ isLoading: true });
    await addSong(track);
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId, track } = this.props;
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
            onClick={ () => { this.setFavorite(track); } }
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
};

export default MusicCard;
