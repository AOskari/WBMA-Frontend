import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const List = ({navigation, styles}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      style={styles}
      data={mediaArray}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={footer}
      renderItem={({item}) => (
        <ListItem singleMedia={item} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const footer = () => <View style={styles.footer} />;

const styles = StyleSheet.create({
  footer: {width: '100%', height: 75},
});

List.propTypes = {
  navigation: PropTypes.object,
  styles: PropTypes.object,
};

export default List;
