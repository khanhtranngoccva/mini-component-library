/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const ProgressBarWrapper = styled.div.attrs(
  (props) => {
    return {
      "data-size": props.size,
    }
  }
)`
  --transparent-gray-15: ${COLORS.transparentGray15};
  background-color: var(--transparent-gray-15);
  box-shadow: inset 0px 2px 4px 0px var(--transparent-gray-15);
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: height padding border-radius;
  position: relative;
  pointer-events: none;

  &[data-size="small"] {
    border-radius: 4px;
    height: 8px;
  }

  &[data-size="medium"] {
    border-radius: 4px;
    height: 12px;
  }

  &[data-size="large"] {
    border-radius: 8px;
    height: 24px;
    padding: 4px;
  }
`;

const ProgressBarTrackOuter = styled.div.attrs(
  (props) => {
    return {
      "data-size": props.size,
    }
  }
)`
  overflow: hidden;
  overflow: clip;
  height: 100%;
  width: 100%;
  border-radius: 4px;
`

const ProgressBarTrackInner = styled.div.attrs(
  (props) => {
    return {
      "data-size": props.size,
    }
  }
)`
  --primary: ${COLORS.primary};
  background-color: var(--primary);
  display: block;
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.2s ease-in-out;
`;

const ProgressBarInnerElement = styled.progress.attrs()`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
`;


const ProgressBar = ({ value, size, className, max = 100, ...props }) => {
  const percentage = (value / max) * 100;

  return <>
    <ProgressBarWrapper size={size} className={className}>
      {/* The track and fill for the progress bar (for sighted users only) */}
      <ProgressBarTrackOuter size={size} aria-hidden={true}>
        <ProgressBarTrackInner percentage={percentage} size={size}></ProgressBarTrackInner>
      </ProgressBarTrackOuter>
      {/* The actual progress bar element with accessibility perks */}
      <ProgressBarInnerElement value={value} max={max} {...props}></ProgressBarInnerElement>
    </ProgressBarWrapper>
  </>;
};

export default ProgressBar;
