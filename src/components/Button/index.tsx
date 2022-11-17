import { Container } from './styles';
import { Text } from '../Text';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Text weight="600" color="#fff">
        {children}
      </Text>
    </Container>
  );
}
