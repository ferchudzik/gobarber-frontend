import React from 'react';

import { Container } from './styles';

interface ITooltipProps {
  message: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ message, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{message}</span>
    </Container>
  );
};

export default Tooltip;
