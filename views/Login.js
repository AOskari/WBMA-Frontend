import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [, setIsLoggedIn] = useContext(MainContext);

  const logIn = async () => {
    try {
      console.log('Button pressed');
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', 'abc');
      navigation.navigate('Tabs');
    } catch (e) {
      console.log(`Error at logIn: ${e.message}`);
    }
  };

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token', userToken);
      if (JSON.parse(userToken) == 'abc') {
        setIsLoggedIn(true);
        navigation.navigate('Tabs');
      }
    } catch (e) {
      console.log(`Error at checkToken: ${e.message}`);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
