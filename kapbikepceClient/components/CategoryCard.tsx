import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface ICategoryCardProps {}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = (props) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          height: '90%',
          width: 200,
          overflow: 'hidden',
          margin: 10,
          borderRadius: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 4,
            height: 10
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 9
        }}>
        <Text style={{ flex: 1 }}>Zeytinyagli</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
