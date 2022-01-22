import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const List = ({navigation, styles, myFiles}) => {
  const {update} = useContext(MainContext);
  const {mediaArray, userMediaArray} = useMedia(update);

  return (
    <FlatList
      style={styles}
      data={myFiles ? userMediaArray : mediaArray}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          myFiles={myFiles}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
  styles: PropTypes.object,
  myFiles: PropTypes.bool,
};

export default List;
