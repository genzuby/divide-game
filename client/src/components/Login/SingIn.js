import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signinUser } from '../../actions';
import LoginForm from './LoginForm';

export default function SignIn({ checked }) {
  const [userid, setUserid] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const loginInfo = useSelector(state => state.loginInfo);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    // insert db with user information
    if (userid.length > 0) dispatch(signinUser(userid));
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
