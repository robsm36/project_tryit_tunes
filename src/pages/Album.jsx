/* eslint-disable indent */
/* eslint-disable react/jsx-closing-tag-location */
import PropTypes from 'prop-types';
import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

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
    document.body.classList.add('loginBody');
    return (
      <>
        <Header />
        {/* <p>clique no ❤ para marcar uma música como favorita</p> */}
        <div className="albumpage">
          {albumInfo
            ? <AlbumCard
                artistName={ albumInfo.artistName }
                key={ albumInfo.collectionId }
                collectionName={ albumInfo.collectionName }
                artworkUrl100={ albumInfo.artworkUrl100 }
                collectionId={ albumInfo.collectionId }
            /> : null}
          {albumTracks ? <div className="musicscontainer">
            {albumTracks.map((track) => (
              <MusicCard
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                key={ track.trackId }
                track={ track }
                favSongs={ favoriteSongs }
              />))}
          </div> : null}
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
