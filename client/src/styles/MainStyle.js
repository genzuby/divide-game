import styled from 'styled-components';
import { BASIC_COLORS } from './styleConstant';

export const GAMEBODY = styled.div`
  background-color: ${BASIC_COLORS.MAIN_COLOR_TAKEAWAY};
  color: ${BASIC_COLORS.MAIN_TEXT_COLOR_WHITE};
  font-family: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 640px;
  border-radius: 1em;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em 2em;
`;

export const PADDING = styled.div`
  height: ${props => props.padding};
  width: ${props => props.wpadding};
`;

export const FLEXGROUPROW = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
