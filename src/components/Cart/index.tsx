import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Button } from '../Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { api } from '../../libs/axios';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';
import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from './styles';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = cartItems.reduce((sum, cartItem) => {
    sum += cartItem.quantity * cartItem.product.price;
    return sum;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };
    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `https://37f6-168-195-96-104.sa.ngrok.io/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text color="#666" size={14}>
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                  <Text></Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  onPress={() => onAdd(cartItem.product)}
                  style={{ marginRight: 24 }}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho est?? vazio!</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
