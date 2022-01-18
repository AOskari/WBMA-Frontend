import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Image, Text} from 'react-native-elements';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const {title, url, description} = route.params;
  console.log(`Title and url at Single: ${title}, ${url}`);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        containerStyle={styles.image}
        source={{uri: url}}
        PlaceHolderContent={<ActivityIndicator />}
      />
      <Text h3 style={styles.text}>
        {title || '404 title not found'}
      </Text>
      <Text style={styles.text}>
        {description || '404 description not found'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 40,
    width: '80%',
  },
  image: {
    flex: 1,
    flexWrap: 'wrap',
    width: '100%',
    height: 'auto',
    maxHeight: '50%',
  },
  text: {
    margin: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
