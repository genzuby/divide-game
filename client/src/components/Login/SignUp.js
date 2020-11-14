import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../actions';
import { v4 as uuidV4 } from 'uuid';
import LoginForm from './LoginForm';

export default function SignUp() {
  const [userid, setUserid] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const loginInfo = useSelector(state => state.loginInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginInfo.isExistId) {
      setUserid('');
      setWarningMsg('This ID already exists!');
    }
  }, [loginInfo]);

  const handleSubmit = e => {
    e.preventDefault();
    if (userid.length < 4) {
      setWarningMsg('Please input more than 4 chars!');
      setUserid('');
      return;
    }
    // insert db with user information
    createNewPlayer();
  };

  const createNewPlayer = () => {
    const messageBody = {
      userId: userid,
      userKey: uuidV4(),
      isAvailable: true,
    };

    dispatch(signupUser(messageBody));
  };

  const handleInput = e => {
    e.preventDefault();
    setUserid(e.target.value);
  };

  return (
    <LoginForm
      theme="main"
      method="POST"
      displayinput="true"
      userid={userid}
      onSubmit={handleSubmit}
      onInputChange={handleInput}
      warningMsg={warningMsg}
    />
  );
}
