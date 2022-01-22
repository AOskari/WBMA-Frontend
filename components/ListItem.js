import React, {useContext} from 'react';
import {ListItem as NBListItem, Avatar, Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
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
  const {update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia(update);
  return (
    <NBListItem bottomDivider>
      {!props.myFiles && (
        <Avatar
          source={{
            uri: props.myFiles ? '' : url + props.singleMedia.thumbnails.w160,
          }}
        />
      )}
      <NBListItem.Content>
        <NBListItem.Title style={styles.title}>
          {props.singleMedia.title || '404 title not found'}
        </NBListItem.Title>
        <NBListItem.Subtitle style={styles.subtitle} numberOfLines={1}>
          {props.singleMedia.description || '404 description not found'}
        </NBListItem.Subtitle>
      </NBListItem.Content>
      {props.myFiles && (
        <Button
          title="Delete"
          onPress={() => {
            deleteMedia(props.singleMedia.file_id);
            setUpdate(true);
          }}
        />
      )}
      {props.myFiles && (
        <Button
          title="Edit"
          onPress={() => {
            props.navigation.navigate('Modify', {
              likes: props.singleMedia.likes,
              title: props.singleMedia.title,
              filename: props.singleMedia.filename,
              fileId: props.singleMedia.file_id,
              url: props.myFiles
                ? url + props.singleMedia.filename
                : url + props.singleMedia.thumbnails.w640,
              description: props.singleMedia.description,
            });
          }}
        />
      )}
      <Button
        title="View"
        onPress={() => {
          props.navigation.navigate('Single', {
            likes: props.singleMedia.likes,
            title: props.singleMedia.title,
            filename: props.singleMedia.filename,
            url: props.myFiles
              ? url + props.singleMedia.filename
              : url + props.singleMedia.thumbnails.w640,
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
  myFiles: PropTypes.bool,
};

export default ListItem;
