import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';
import LoginForm from './LoginForm';

function SignIn({ checked, signinUser, loginInfo }) {
  const [userid, setUserid] = useState('');
  const [warningMsg, setWarningMsg] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // insert db with user information
    if (userid.length > 0) signinUser(userid);
    else setWarningMsg('Please input user id');
  };

  const handleInput = e => {
    e.preventDefault();
    setUserid(e.target.value);
  };

  useEffect(() => {
    if (loginInfo.noId) {
      setUserid('');
      setWarningMsg('Not exist id!');
      return;
    }

    if (loginInfo.isPlaying) {
      setUserid('');
      setWarningMsg('This id is playing!');
      return;
    }
  }, [loginInfo]);

  return (
    <LoginForm
      theme="sub"
      displayinput={checked}
      userid={userid}
      onSubmit={handleSubmit}
      onInputChange={handleInput}
      warningMsg={warningMsg}
    />
  );
}

const mapStateToProps = ({ loginInfo }) => {
  return { loginInfo };
};

export default connect(mapStateToProps, { signinUser })(SignIn);
