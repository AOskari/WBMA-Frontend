import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const itemMarginSize = 10;
const url = 'https://media.mw.metropolia.fi/wbma/uploads/';
const styles = StyleSheet.create({
  rowItem: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: itemMarginSize,
    marginTop: itemMarginSize / 2,
    marginBottom: itemMarginSize / 2,
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 'auto',
    minHeight: 200,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  rowItemImage: {
    flex: 1,
    height: '100%',
    flexGrow: 0.5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rowItemTitle: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'left',
  },
  rowItemInfo: {
    flex: 1,
    height: '100%',
    flexGrow: 0.5,
    padding: 10,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

const ListItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.rowItem}
      onPress={(item) => {
        props.navigation.navigate('Single', {
          title: props.singleMedia.title,
          url: url + props.singleMedia.thumbnails.w160,
        });
      }}
    >
      <Image
        style={styles.rowItemImage}
        source={{uri: url + props.singleMedia.thumbnails.w160}}
      />
      <View style={styles.rowItemInfo}>
        <Text style={styles.rowItemTitle}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
