import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface ICategoryCardProps {}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = (props) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: '80%',
          width: 200,
          overflow: 'hidden',
          margin: 10,
          borderRadius: 20,
          backgroundColor: '#ecf0f1'
        }}>
        <Text style={{ flex: 1 }}>Zeytinyagli</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
