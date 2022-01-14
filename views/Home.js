import React from 'react';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';
import SafeAreaView from '../components/SafeAreaView';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <ImageBackground
          source={require('../assets/cat.jpg')}
          resizeMode="cover"
          style={styles.image}
          borderRadius={10}
        >
          <Text style={styles.text}>Came to see some cats, eh?</Text>
        </ImageBackground>
      </View>

      <List navigation={navigation} styles={styles.list} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
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

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
