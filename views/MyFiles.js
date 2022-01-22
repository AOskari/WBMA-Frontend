import React from 'react';
import {StyleSheet, View} from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import List from '../components/List';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <List navigation={navigation} styles={styles.list} myFiles={true} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  viewContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    elevation: 20,
    borderRadius: 100,
  },
  list: {
    height: '65%',
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginTop: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  view: {
    height: '35%',
    maxHeight: 400,
    width: '100%',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'transparent',
  },
});

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
