import React from 'react';
import styled from 'styled-components/macro';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';
import VisuallyHidden from '../VisuallyHidden';

// Overlays the select element to make it invisible to the user but still accessible with a mouse or keyboard
const SelectInternal = styled.select.attrs()`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  appearance: none;
`;

const SelectLabel = styled.div`
  --transparent-gray-15: ${COLORS.transparentGray15};
  --gray-700: ${COLORS.gray700};
  --black: ${COLORS.black};
  --primary: ${COLORS.primary};
  width: fit-content;
  border-radius: 8px;
  padding: 12px 16px;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: var(--transparent-gray-15);
  color: var(--gray-700);
  pointer-events: none;

  ${SelectInternal}:focus + & {
    outline: 2px solid;
    outline-color: var(--black);
    outline-color: Highlight; 
    outline-color: -webkit-focus-ring-color;
  }

  ${SelectInternal}:hover + & {
    color: var(--black);
  }
`

const SelectCurrentValue = styled.span`
  --gray-700: ${COLORS.gray700};
  line-height: 1em;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
`

const SelectWrapper = styled.div`
  position: relative;
  isolation: isolate;
  width: fit-content;
`

const Select = ({ label, value, onChange, children, id, className, ...props }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <SelectWrapper className={className}>
      {/* The actual select element with accessibility perks (including the label) */}
      <SelectInternal label={label} id={id} value={value} onChange={onChange} {...props}>
        {children}
      </SelectInternal>
      {/* Display the label to sighted users only */}
      <SelectLabel aria-hidden={true}>
        <SelectCurrentValue>
          {displayedValue ?? label}
        </SelectCurrentValue>
        <Icon id="chevron-down" size={24} />
      </SelectLabel>
    </SelectWrapper>
  );
};

export default Select;
