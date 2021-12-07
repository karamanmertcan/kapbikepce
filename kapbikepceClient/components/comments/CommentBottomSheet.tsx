import React, { useRef } from 'react';
import { View, Button, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CommentCard from './CommentCard';

interface ICommentBottomSheet {}

const CommentBottomSheet = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}>
      <RBSheet
        ref={props.refRBSheet}
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
                  <Text>Name</Text>
                  <Text>Jane doe</Text>
                  <CommentCard />
                  <CommentCard />
                  <CommentCard />
                  <CommentCard />
                  <CommentCard />
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
  }
});

export default CommentBottomSheet;
