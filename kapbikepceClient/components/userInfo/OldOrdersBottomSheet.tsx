import React, { useRef } from 'react';
import { View, Button, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LastOrderCard from '../orderCard/LastOrderCard';

interface IOldOrdersBottomSheet {}

const OldOrdersBottomSheet = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}>
      <RBSheet
        ref={props.oldOrdersRefRBSheet}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={500}
        closeOnDragDown={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }
        }}>
        <View style={{ flex: 1 }}>
          <View>
            <View style={{ height: 500 }}>
              <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.container}>
                  <View style={styles.ordersContainer}>
                    <Text style={styles.ordersContainerTitle}>Siparişlerim</Text>
                    <View>
                      {props.orders &&
                        props.orders.length > 0 &&
                        props.orders.map((order: any, index: number) => (
                          <LastOrderCard key={order.id} order={order} />
                        ))}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 8
  },
  ordersContainer: {
    padding: 16
  },
  ordersContainerTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default OldOrdersBottomSheet;
