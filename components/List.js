import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => (
        <ListItem singleMedia={item} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
