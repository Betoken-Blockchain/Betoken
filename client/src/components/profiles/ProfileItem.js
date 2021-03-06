import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileAvatar from '../../img/blank-profile-picture.png';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div>
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <img src={profileAvatar} alt="" className="rounded-circle" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <p>{profile.bio}</p>
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
