import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';

const SafeAreaView = (props) => {
  return (
    <View {...props} style={styles.androidSafeArea}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});

export default SafeAreaView;