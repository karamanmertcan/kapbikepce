import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface IRestaurantCardProps {}

const RestaurantCard: React.FunctionComponent<IRestaurantCardProps> = (props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('RestaurantDetails');
      }}>
      <View style={styles.restaurantCard}>
        <View style={styles.restaurantContainer}>
          <Image
            style={{
              height: 60,
              width: 60,
              resizeMode: 'contain'
            }}
            source={{
              uri: 'https://freesvg.org/img/Pizza_Pepperoni.png'
            }}
          />
          <View
            style={{
              flexDirection: 'row'
            }}>
            <View style={styles.rateBox}>
              <Text>8.9</Text>
            </View>
            <View style={styles.addressBox}>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: 'bold'
                }}>
                Kapbikepçeci
              </Text>
              <Text
                style={{
                  marginLeft: 10
                }}>
                Address
              </Text>
              <View
                style={{
                  flexDirection: 'row'
                }}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 10,
                    marginTop: 10
                  }}>
                  Min 25.00 USD
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 10,
                    marginTop: 10
                  }}>
                  20-30 DK
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    flex: 1,
    width: '100%',
    minHeight: 100,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    marginTop: 10
  },
  restaurantContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  rateBox: {
    height: 50,
    width: 50,
    borderRadius: 20,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default RestaurantCard;
