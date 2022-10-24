import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumTracks: [],
    albumInfo: {},
    favoriteSongs: [],
    isLoading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const collectionId = match.params.id;
    const trackList = await getMusics(collectionId);
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false });
    const albumInfo = trackList[0];
    const albumTracks = trackList.slice(1, trackList.length);
    this.setState({
      albumTracks,
      albumInfo,
      favoriteSongs,
    });
  }

  render() {
    const { albumTracks, albumInfo, isLoading, favoriteSongs } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p>Album</p>
          {albumInfo
            ? <p data-testid="artist-name">{albumInfo.artistName}</p>
            : null}
          {albumInfo
            ? <p data-testid="album-name">{albumInfo.collectionName}</p>
            : null}
          {albumTracks ? albumTracks.map((track) => (
            <MusicCard
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              key={ track.trackId }
              track={ track }
              favSongs={ favoriteSongs }
            />)) : null}
        </div>
        {isLoading ? <p>Carregando...</p> : null}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
