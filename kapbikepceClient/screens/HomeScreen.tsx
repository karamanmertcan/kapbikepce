import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';
import SeacrhBarComp from '../components/SearchBar';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25
            }}>
            Kap Bi Kepçe
          </Text>
        </View>
        <View
          style={{
            marginTop: 10
          }}>
          <SeacrhBarComp />
        </View>
        <View style={styles.categoryCard}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </ScrollView>
        </View>
        <View
          style={{
            flex: 3
          }}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  categoryCard: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4757',
    height: '10%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  }
});

export default HomeScreen;
