import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

interface IHeaderProps {
  routeName?: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.header}>
      {props.routeName === 'RestaurantDetails' ? (
        <View style={styles.goBackButton}>
          <AntDesign name='back' size={24} color='white' onPress={() => navigation.goBack()} />
        </View>
      ) : null}
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25
        }}>
        Kap Bir Kepçe
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4757',
    minHeight: 70,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0
  },
  goBackButton: {
    position: 'absolute',
    padding: 8,
    left: 10
  }
});

export default Header;
