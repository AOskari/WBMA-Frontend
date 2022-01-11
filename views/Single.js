import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const {title, url} = route.params;
  console.log(`Title and url at Single: ${title}, ${url}`);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: url}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    backgroundColor: 'green',
    flex: 1,
    flexWrap: 'wrap',
    width: '80%',
    height: 'auto',
    maxHeight: '50%',
  },
  title: {
    height: 50,
    fontSize: 20,
    fontWeight: '700',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
