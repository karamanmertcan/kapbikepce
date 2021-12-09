import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    flex: 1
  }
});

export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} height={240} showsPagination={false} loop>
          <View style={styles.slide}>
            <Image
              resizeMode='stretch'
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg'
              }}
            />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode='stretch'
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg'
              }}
            />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode='stretch'
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg'
              }}
            />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode='stretch'
              style={styles.image}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg'
              }}
            />
          </View>
        </Swiper>
      </View>
    );
  }
}
