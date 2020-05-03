// Idea for this code comes from zealous-snyder-0bj4r

import React from 'react';
import styled from 'styled-components';
import { Handle } from 'rc-slider';

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
`;

const Value = styled.div`
  margin-top: -32px;
  white-space: nowrap;
  color: black;
  font-size: 14px;
  font-weight: bold;
`;
