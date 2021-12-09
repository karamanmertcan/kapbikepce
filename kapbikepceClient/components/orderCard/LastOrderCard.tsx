import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useAtom } from 'jotai';
import { addItemToCart } from '../../store';
import { useNavigation } from '@react-navigation/native';

interface ILastOrderCardProps {
  order: {
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
  };
}

const LastOrderCard: React.FunctionComponent<ILastOrderCardProps> = (props) => {
  const [_, setAddItem] = useAtom(addItemToCart);
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.lastOrderCard]}>
      <View style={styles.container}>
        <View style={styles.foodCardLeft}>
          <Image
            style={styles.foodImage}
            source={{
              uri: `${props.order.image}`
            }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.foodCardRight}>
          <Text style={styles.foodTitle}>{props.order.title}</Text>
          <Text>{props.order?.description?.slice(0, 20)}...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lastOrderCard: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    overflow: 'hidden',
    minHeight: 140,
    padding: 10,
    borderRadius: 15,
    marginTop: 10
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '90%'
  },
  foodImage: {
    height: 100,
    width: '100%'
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodCardLeft: {
    flex: 2,
    justifyContent: 'center'
  },
  foodCardRight: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  addToCartContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addCartButton: {
    fontSize: 16
  }
});

export default LastOrderCard;
