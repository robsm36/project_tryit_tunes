import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100, collectionId } = this.props;
    return (
      <Link
        className="albumlinks"
        to={ `/album/${collectionId}` }
      >
        <div className="albumcard">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className="albumdata">
            <h4>{artistName}</h4>
            <p>{collectionName}</p>
          </div>
        </div>
      </Link>

    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
