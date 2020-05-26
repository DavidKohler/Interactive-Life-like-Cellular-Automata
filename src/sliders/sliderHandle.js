/*
    Function to create desired slider handle for customization drawers
    Idea for this code comes from zealous-snyder-0bj4r
*/

import { Handle } from 'rc-slider';
import React from 'react';
import styled from 'styled-components';

export function SliderHandle(props) {
  const { value, dragging, index, ...rest } = props;

  return (
    <FlexHandle key={index} value={value} {...rest}>
      {dragging && <Value>{value}</Value>}
    </FlexHandle>
  );
}

const FlexHandle = styled(Handle)`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`;

const Value = styled.div`
  margin-top: -32px;
  white-space: nowrap;
  color: black;
  font-size: 14px;
  font-weight: bold;
`;
