import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ICommentCardProps {}

const CommentCard: React.FunctionComponent<ICommentCardProps> = (props) => {
  return (
    <View style={styles.commentCard}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quidem, sit molestiae
        eum beatae possimus magni, iusto harum necessitatibus eligendi, dicta ipsum fugiat nemo? Vel
        eos quos, blanditiis facere fugit, eligendi itaque expedita tempora voluptatem iure eum
        sunt. Omnis id fuga commodi, accusantium praesentium deleniti velit autem dolore perferendis
        quo voluptas voluptate ab. Dolorum sequi libero officia. Est nesciunt aspernatur harum iste,
        illum sequi! Ducimus laboriosam omnis, nobis obcaecati expedita optio unde harum nisi porro
        sapiente velit fuga placeat dolores est vitae quod facilis repellendus, quasi neque
        doloribus commodi quia sit nostrum. Autem eaque, delectus quam natus provident cum eius.
      </Text>
      <View style={styles.commentOwner}>
        <Text style={styles.commentOwnerName}>Mertcan Karaman</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCard: {
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 10,
    backgroundColor: '#ecf0f1',
    margin: '5%',
    minHeight: 120,
    width: '90%',
    borderRadius: 20
  },
  commentOwner: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  commentOwnerName: {
    fontWeight: 'bold'
  }
});

export default CommentCard;
