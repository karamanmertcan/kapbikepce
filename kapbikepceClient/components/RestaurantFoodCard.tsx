import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

interface IRestaurantFoodCardProps {}

const RestaurantFoodCard: React.FunctionComponent<IRestaurantFoodCardProps> = (props) => {
  return (
    <View style={[styles.restaurantFoodCard]}>
      <View style={styles.container}>
        <View style={styles.foodCardLeft}>
          <Image
            style={styles.foodImage}
            source={{
              uri: 'https://freesvg.org/img/Pizza_Pepperoni.png'
            }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.foodCardRight}>
          <Text style={styles.foodTitle}>El Yapımı Pepporoni Pizza</Text>
          <Text>Özenle hazırlanmış pepperoni pizza</Text>
          <View style={styles.addToCartContainer}>
            <Text>36,99 TL</Text>
            <Button mode='contained' onPress={() => console.log('eklendi')} color='#ff4757'>
              +
            </Button>
          </View>
        </View>
      </View>
    </View>
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
    flex: 1
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
