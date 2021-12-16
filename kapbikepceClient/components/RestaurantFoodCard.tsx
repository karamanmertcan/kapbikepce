import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useAtom } from 'jotai';
import { addItemToCart } from '../store';
import { useNavigation } from '@react-navigation/native';

interface IRestaurantFoodCardProps {
  food: {
    restaurantName: string;
    image: {
      url: string;
    };
    items: Array<any>;
    rating: Array<any>;
    _id: string;
  };
}

const RestaurantFoodCard: React.FunctionComponent<IRestaurantFoodCardProps> = (props) => {
  const [_, setAddItem] = useAtom(addItemToCart);
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FoodDetailsScreen', {
          itemId: props.food.id
        });
      }}>
      <View style={[styles.restaurantFoodCard]}>
        <View style={styles.container}>
          <View style={styles.foodCardLeft}>
            <Image
              style={styles.foodImage}
              source={{
                uri: `${props.food.image.url}`
              }}
              resizeMode='contain'
            />
          </View>
          <View style={styles.foodCardRight}>
            <Text style={styles.foodTitle}>{props.food.text}</Text>
            <Text>{props.food.description}...</Text>
            <View style={styles.addToCartContainer}>
              <Text>{props.food.price} TL</Text>
              <View
                style={{
                  width: 30
                  // marginRight: 50
                }}>
                <Button mode='contained' onPress={() => setAddItem(props.food)} color='#ff4757'>
                  +
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantFoodCard: {
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

export default RestaurantFoodCard;
