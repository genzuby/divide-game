import styled, { keyframes } from 'styled-components';
import { BASIC_COLORS, ACTION_COLORS } from './styleConstant';

export const TEXTINPUT = styled.input`
  width: 90%;
  height: 2.5em;
  border: 1px solid ${BASIC_COLORS.LIGHT_GRAY};
  border-radius: 2px;
  outline: none;
  font-family: inherit;
  font-size: 1.02rem;
  padding: 0.5em 1em;
`;

export const CHECKINPUT = styled.input`
  height: 1.2em;
  width: 1.2em;
`;

export const BUTTON = styled.button`
  width: 90%;
  height: 2.4em;
  font-family: inherit;
  font-size: 1.1rem;
  padding: 0.5em;
  border: 1px solid ${props => props.borderColor};
  outline: none;
  border-radius: 2px;
  letter-spacing: 0.1em;
  cursor: pointer;
  color: ${props => props.textcolor};
  background-color: ${props => props.bgcolor};
`;

export const IMAGE = styled.img`
  height: ${props => props.height};
  width: auto;
`;

export const ICONBG = styled.div`
  height: ${props => props.size};
  width: ${props => props.size};
  background-color: ${BASIC_COLORS.MAIN_COLOR_TAKEAWAY};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${BASIC_COLORS.MAIN_TEXT_COLOR_WHITE};
`;

export const TITLE = styled.div`
  font-size: 1.6rem;
`;

export const DESCTEXT = styled.div`
  font-size: 0.9rem;
`;

export const ROUNDDIV = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.bgcolor};
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const _waiting = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const WAITING = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 1em;
  animation: ${_waiting} 2s infinite linear;
`;

export const SWITCH = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 24px;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 20px;
    opacity: 0;
    z-index: 0;
  }

  // Unchecked
  label {
    display: block;
    padding: 0 0 0 44px;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 5px;
      left: 0;
      width: 36px;
      height: 14px;
      background-color: ${ACTION_COLORS.ACTION_COLOR_OFF_MAIN};
      border-radius: 14px;
      z-index: 1;
      transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:after {
      content: '';
      position: absolute;
      top: 2px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: ${ACTION_COLORS.ACTION_COLOR_OFF_SUB};
      border-radius: 14px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      z-index: 2;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: left, background-color;
    }
  }

  // Checked
  input:checked + label {
    &:before {
      background-color: ${ACTION_COLORS.ACTION_COLOR_ON_MAIN};
    }

    &:after {
      left: 16px;
      background-color: ${ACTION_COLORS.ACTION_COLOR_ON_SUB};
    }
  }
`;
