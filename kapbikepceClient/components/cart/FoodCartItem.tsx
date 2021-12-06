import * as React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useAtom } from 'jotai';
import { removeFromCart, decreaseQty, increaseQty } from '../../store';
import { Entypo } from '@expo/vector-icons';

interface IFoodCartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    quantity: number;
  };
}

const FoodCartItem: React.FunctionComponent<IFoodCartItemProps> = (props) => {
  const [_, setRemoveItem] = useAtom(removeFromCart);
  const [decreaseItemQty, setDecreaseItemQty] = useAtom(decreaseQty);
  const [increaseItemQty, setIncreaseItemQty] = useAtom(increaseQty);

  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemLeft}>
        <Image
          style={{
            height: 100,
            width: '100%',
            resizeMode: 'contain'
          }}
          source={{
            uri: `${props.item.image}`
          }}
        />
      </View>
      <View style={styles.cartItemRight}>
        <View
          style={{
            alignItems: 'flex-end'
          }}>
          <Entypo
            name='trash'
            size={24}
            color='black'
            onPress={() => {
              setRemoveItem(props.item);
            }}
          />
        </View>
        <View>
          <Text style={styles.cartItemRightText}>{props.item.title}</Text>
          <Text style={styles.cartItemRightDesc}>{props.item.description?.slice(0, 20)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View>
            <Text style={styles.cartItemRightText}>{props.item.price} TL</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Button title='-' color='#ff4757' onPress={() => setDecreaseItemQty(props.item)} />
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                padding: 10
              }}>
              <Text>{props.item.quantity}</Text>
            </View>
            <Button title='+' color='#ff4757' onPress={() => setIncreaseItemQty(props.item)} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10,
    width: '100%',
    minHeight: 160,
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    marginTop: 10
  },
  cartItemLeft: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flex: 2
  },
  cartItemRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 4
  },
  cartItemRightText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10
  },
  cartItemRightDesc: {
    marginLeft: 10,
    fontWeight: 'normal'
  }
});

export default FoodCartItem;
