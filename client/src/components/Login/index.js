import React, { useState } from 'react';
import { GAMEBODY, PADDING } from '../../styles/MainStyle';
import {
  IMAGE,
  CHECKINPUT,
  TITLE,
  DESCTEXT,
} from '../../styles/ComponentStyle';
import SignUp from './SignUp';
import SingIn from './SingIn';

function Login() {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(prev => !prev);
  };

  return (
    <GAMEBODY data-test="loginComponent">
      <IMAGE
        height="2.6em"
        src="/assets/takeaway_logo.webp"
        alt="Takeaway head logo"
      />
      <PADDING padding="5em" />
      <TITLE>Do You Wanna Play?</TITLE>
      <PADDING padding="2em" />
      <SignUp />
      <PADDING padding="3.5em" />
      <label style={{ display: 'flex' }}>
        <CHECKINPUT
          type="checkbox"
          defaultChecked={checked}
          onChange={handleCheckbox}
        />
        <PADDING wpadding="0.3em" />
        <DESCTEXT>Do you already have a ID?</DESCTEXT>
      </label>
      <PADDING padding="0.5em" />
      <SingIn checked={checked} />
    </GAMEBODY>
  );
}

export default Login;
