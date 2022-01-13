import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';
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
    <View>
      <Text>Register new user</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        name="username"
        type="text"
        value={username}
        autoCapitalize={'none'}
        placeholder={'username'}
        required
        onChangeText={(text) => setUsername(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
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
      <TextInput
        style={styles.input}
        name="email"
        type="email"
        value={email}
        autoComplete={'off'}
        autoCapitalize={'none'}
        placeholder={'email'}
        required
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
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
  input: {
    width: 300,
    height: 40,
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
