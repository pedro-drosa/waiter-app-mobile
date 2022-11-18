import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Text } from '../Text';
import { ProductModal } from '../ProductModal';
import {
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
  ProductContainer,
} from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { useState } from 'react';
import { Product } from '../../types/Product';

export function Menu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(product) => product._id}
        renderItem={({ item: product }) => {
          return (
            <ProductContainer onPress={() => handleOpenModal(product)}>
              <ProductImage
                source={{
                  uri: `https://37f6-168-195-96-104.sa.ngrok.io/uploads/${product.imagePath}`,
                }}
              />
              <ProductDetails>
                <Text weight="600">{product.name}</Text>
                <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                  {product.description}
                </Text>
                <Text size={14} weight="600">
                  {formatCurrency(product.price)}
                </Text>
              </ProductDetails>
              <AddToCartButton>
                <PlusCircle />
              </AddToCartButton>
            </ProductContainer>
          );
        }}
      />
    </>
  );
}
