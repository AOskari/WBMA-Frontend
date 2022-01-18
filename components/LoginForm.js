import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    const {postLogin} = useLogin();
    e.preventDefault();
    console.log(username, password);

    const data = {username: username, password: password};
    try {
      console.log('Button pressed');
      const response = await postLogin(data);
      if (response.message == 'Logged in successfully') {
        await AsyncStorage.setItem('userToken', response.token);
        navigation.navigate('Tabs');
      }
    } catch (e) {
      console.log(`Error at logIn: ${e.message}`);
    }
  };

  return (
    <>
      <View style={styles.view}>
        <Text h4>Login</Text>
        <Input
          name="username"
          type="text"
          value={username}
          autoCapitalize={'none'}
          placeholder="username"
          required
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          name="password"
          type="text"
          value={password}
          autoComplete={'off'}
          autoCapitalize={'none'}
          secureTextEntry={true}
          placeholder={'password'}
          required
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Sign in" onPress={handleSubmit} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '90%',
    alignItems: 'center',
  },
});

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
