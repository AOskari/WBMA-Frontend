import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const RegisterForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    const {postUser} = useUser();
    e.preventDefault();
    console.log(username, password, email, fullName);

    const data = {
      username: username,
      password: password,
      email: email,
      full_name: fullName,
    };
    try {
      console.log('Register Button pressed');
      const response = await postUser(data);
      console.log(`Registered user: ${response}`);
    } catch (e) {
      console.log(`Error at Register: ${e.message}`);
    }
  };

  return (
    <View style={styles.view}>
      <Text h4>Register</Text>
      <Input
        name="username"
        type="text"
        value={username}
        autoCapitalize={'none'}
        placeholder={'username'}
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
      <Input
        name="email"
        type="email"
        value={email}
        autoComplete={'off'}
        autoCapitalize={'none'}
        placeholder={'email'}
        required
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        name="full_name"
        type="text"
        value={fullName}
        autoComplete={'off'}
        autoCapitalize={'none'}
        placeholder={'full name'}
        onChangeText={(text) => setFullName(text)}
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '90%',
    alignItems: 'center',
  },
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
