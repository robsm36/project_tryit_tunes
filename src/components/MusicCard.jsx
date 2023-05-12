import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
  };

  handleFavorite = async (track) => {
    const favoriteTracks = await getFavoriteSongs();
    const isFav = favoriteTracks.some((ftrack) => ftrack.trackId === track.trackId);
    if (isFav) {
      await removeSong(track);
    } else if (!isFav) {
      await addSong(track);
    }
  };

  favoriteCheck = (favoriteSongs, trackId) => (
    favoriteSongs.some((track) => track.trackId === trackId)
  );

  render() {
    const { trackName, previewUrl, trackId, track, favSongs } = this.props;

    return (
      <div className="musicard">
        <p>{trackName}</p>
        <audio src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } className="favoriteCheck">
          <input
            className="favbox"
            id={ trackId }
            type="checkbox"
            onChange={ () => { this.handleFavorite(track); } }
            defaultChecked={ this.favoriteCheck(favSongs, trackId) }
          />
          <i className="fa-solid fa-heart" />
        </label>
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
