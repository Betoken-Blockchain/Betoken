import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialINputs: false,
      handle: '',
      bio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      errors: {}
    };
  }

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's create your profile</p>
              <small className="d-block pb-3">* = required</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  prfile: state.profile,
  errors: state.errors
});

export default connect(null)(CreateProfile);
