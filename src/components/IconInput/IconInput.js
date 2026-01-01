import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const InputLabel = styled.label.attrs(
  props => {
    return {
      "data-size": props.size,
    }
  }
)`
  --primary: ${COLORS.primary};
  display: flex;
  gap: 1ch;
  align-items: center;
  flex: none;

  &[data-size="small"] {
    padding-right: 8px;
    padding-block: 4px 3px;
  }

  &[data-size="large"] {
    padding-right: 12px;
    padding-block: 6px 4px;
  }
`;

const InternalInput = styled.input.attrs(
  props => {
    return {
      "data-size": props.size,
    }
  }
)`
  --gray-500: ${COLORS.gray500};

  border: none;
  outline: none;
  font-weight: inherit;
  font-size: inherit;
  line-height: 1em;
  padding-block: 0;
  // Input should preferably be as wide as its content - 
  // If container is fit-content, the fit-content value here should be resolvable.
  // If container shrinks (e.g. shrink-to-fit or set width) and input can't fit, 
  // the input should shrink to fit. flex-shrink is not necessary.
  width: fit-content;
  // Input should grow and shrink to fill the available space
  flex-grow: 1;
  // Input should shrink unconditionally
  min-width: 0;
  
  &::placeholder {
    font-weight: 400;
    color: var(--gray-500);
  }

  &[data-size="small"] {
    padding-block: 4px 3px;
  }

  &[data-size="large"] {
    padding-block: 6px 5px;
  }
`;

const IconInputWrapper = styled.div.attrs(
  props => {
    return {
      "data-size": props.size,
    }
  }
)`
  --black: ${COLORS.black};
  --primary: ${COLORS.primary};
  --gray-700: ${COLORS.gray700};
  width: ${props => {
    if (typeof props.width === "number") {
      return `${props.width}px`;
    }
    return props.width || "var(--width, fit-content)";
  }};
  position: relative;
  border-radius: 2px;  
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  color: var(--gray-700);
  isolation: isolate;

  &[data-size="small"] {
    font-size: 0.875em;
  }

  &[data-size="large"] {
    font-size: 1.125em;
  }

  &:has(${InternalInput}:focus) {
    outline: 2px solid;
    outline-color: var(--black);
    outline-color: Highlight; 
    outline-color: -webkit-focus-ring-color;
    outline-offset: 2px;
  }
`;

const IconInputInnerWrapper = styled.div.attrs(
  props => {
    return {
      "data-size": props.size,
    }
  }
)`
  display: flex;
  align-items: flex-end;
  border-bottom: solid var(--black);

  &[data-size="small"] {
    border-bottom-width: 1px;
  }

  &[data-size="large"] {
    border-bottom-width: 2px;
  }
`;

const LabelContent = styled.span`
  margin-left: 4px;
`;


const IconInput = ({
  id,
  label,
  icon,
  width,
  size,
  className,
  ...props
}) => {
  const defaultId = React.useRef(crypto.randomUUID()).current;
  const inputId = id ?? defaultId;

  return (<>
    <IconInputWrapper size={size} width={width} className={className}>
      <IconInputInnerWrapper size={size}>
        {/* Accessiblity label */}
        <InputLabel htmlFor={inputId} size={size}>
          <VisuallyHidden>
            <LabelContent>
              {label}
            </LabelContent>
          </VisuallyHidden>
          {/* Icon for sighted users only */}
          <Icon id={icon} size={size === "small" ? 16 : 24} aria-hidden={true} />
        </InputLabel>
        {/* The actual input element with accessibility perks */}
        <InternalInput id={inputId} {...props} size={size} />
      </IconInputInnerWrapper>
    </IconInputWrapper>
  </>);
};

export default IconInput;