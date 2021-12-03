import * as React from 'react';
import { View, useWindowDimensions, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RestaurantFoodCard from './RestaurantFoodCard';

const FirstRoute = () => (
  <View style={{ flex: 1, paddingTop: 10 }}>
    <ScrollView>
      <RestaurantFoodCard />
      <RestaurantFoodCard />
      <RestaurantFoodCard />
      <RestaurantFoodCard />
      <RestaurantFoodCard />
      <RestaurantFoodCard />
    </ScrollView>
  </View>
);

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor: '#fff', color: 'black' }}
    labelStyle={{ color: 'black' }}
  />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Kepçeler' },
    { key: 'second', title: 'Yorumlar' }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
