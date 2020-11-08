import React, { useRef } from 'react';
import { PADDING } from '../../styles/MainStyle';
import { TEXTINPUT, BUTTON, DESCTEXT } from '../../styles/ComponentStyle';
import { BASIC_COLORS } from '../../styles/styleConstant';

const { MAIN_COLOR_TAKEAWAY, MAIN_TEXT_COLOR_WHITE } = BASIC_COLORS;
const colorSet = {
  main: { line: MAIN_COLOR_TAKEAWAY, bg: MAIN_TEXT_COLOR_WHITE },
  sub: { line: MAIN_TEXT_COLOR_WHITE, bg: MAIN_COLOR_TAKEAWAY },
};

function LoginForm({
  theme,
  method,
  displayinput,
  userid,
  onSubmit,
  onInputChange,
  warningMsg,
}) {
  const usernameRef = useRef(null);

  const { line, bg } = theme === 'main' ? colorSet.main : colorSet.sub;

  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onSubmit={onSubmit}
      method={method}
    >
      {displayinput && (
        <TEXTINPUT
          type="text"
          value={userid}
          placeholder="Please input play ID."
          onChange={onInputChange}
          ref={usernameRef}
        />
      )}
      <PADDING padding="0.5em" />
      <BUTTON textcolor={line} bgcolor={bg} borderColor={line}>
        {theme === 'main' ? 'SIGN UP' : 'SIGN IN'}
      </BUTTON>
      <PADDING padding="0.5em" />
      <DESCTEXT style={{ height: '1em' }}>{warningMsg}</DESCTEXT>
    </form>
  );
}

export default LoginForm;
