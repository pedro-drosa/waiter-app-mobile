import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Text } from '../Text';
import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ItemSeparatorComponent={Separator}
      keyExtractor={(product) => product._id}
      renderItem={({ item: product }) => {
        return (
          <Product>
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
          </Product>
        );
      }}
    />
  );
}
