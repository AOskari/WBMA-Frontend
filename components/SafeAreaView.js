import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import PropTypes from 'prop-types';

const SafeAreaView = (props) => {
  return (
    <View {...props} style={styles.androidSafeArea}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
SafeAreaView.propTypes = {
  children: PropTypes.object,
};

export default SafeAreaView;
