import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface ICategoryCardProps {}

const CategoryCard: React.FunctionComponent<ICategoryCardProps> = (props) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          margin: 10
        }}>
        <Shadow>
          <View
            style={{
              height: '80%',
              width: 200,
              overflow: 'hidden',
              margin: 10,
              borderRadius: 20
            }}>
            <Text style={{ flex: 1 }}>Zeytinyagli</Text>
          </View>
        </Shadow>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
