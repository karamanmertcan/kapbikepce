import * as React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAtom } from 'jotai';
import { removeFromCart, decreaseQty, increaseQty, calculateCartTotal } from '../../store';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface IFoodCartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: {
      url: string;
    };
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
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity>
      <View style={styles.cartItem}>
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
            <Text style={styles.cartItemRightDesc}>{props.item.description}</Text>
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
              <View
                style={{
                  width: 25,
                  backgroundColor: '#ff4757',
                  borderRadius: 10
                }}>
                <Button
                  title='-'
                  color='#ff4757'
                  onPress={() => {
                    setDecreaseItemQty(props.item);
                  }}
                />
              </View>
              <View
                style={{
                  height: '100%',
                  alignItems: 'center',
                  padding: 10
                }}>
                <Text>{props.item.quantity}</Text>
              </View>
              <View
                style={{
                  width: 25,
                  backgroundColor: '#ff4757',
                  borderRadius: 10
                }}>
                <Button
                  title='+'
                  color='#ff4757'
                  onPress={() => {
                    setIncreaseItemQty(props.item);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

  cartItemRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
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
