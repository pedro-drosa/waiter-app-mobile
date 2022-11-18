import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCacelOrder: () => void;
}

export function Header({ selectedTable, onCacelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo ao
          </Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}
      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>
            <TouchableOpacity onPress={onCacelOrder}>
              <Text color="#D73035" size={14} weight="600">
                Cancelar Pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>
          <Table>
            <Text color="#666">Mesa: {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
