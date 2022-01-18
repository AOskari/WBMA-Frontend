import React from 'react';
import {ListItem as NBListItem, Avatar, Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const url = 'https://media.mw.metropolia.fi/wbma/uploads/';
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    color: 'black',
  },
});

const ListItem = (props) => {
  return (
    <NBListItem bottomDivider>
      <Avatar source={{uri: url + props.singleMedia.thumbnails.w160}} />
      <NBListItem.Content>
        <NBListItem.Title style={styles.title}>
          {props.singleMedia.title || '404 title not found'}
        </NBListItem.Title>
        <NBListItem.Subtitle style={styles.subtitle} numberOfLines={1}>
          {props.singleMedia.description || '404 description not found'}
        </NBListItem.Subtitle>
      </NBListItem.Content>
      <Button
        title="View"
        onPress={() => {
          props.navigation.navigate('Single', {
            title: props.singleMedia.title,
            url: url + props.singleMedia.thumbnails.w160,
            description: props.singleMedia.description,
          });
        }}
      />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
