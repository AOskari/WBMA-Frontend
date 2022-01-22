import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  const onSubmit = async (user) => {
    const {postLogin} = useLogin();

    const data = {username: user.username, password: user.password};
    try {
      const response = await postLogin(data);
      setUser(response.user);
      setIsLoggedIn(true);
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
        <Controller
          control={control}
          name="username"
          render={({field: {onChange, value, onBlur}}) => (
            <Input
              type="text"
              value={value}
              autoCapitalize={'none'}
              placeholder="username"
              onBlur={onBlur}
              required
              onChangeText={onChange}
              errorMessage={errors.username && errors.username.message}
            />
          )}
          rules={{
            required: {value: true, message: 'this is required.'},
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value, onBlur}}) => (
            <Input
              name="password"
              type="text"
              value={value}
              autoComplete={'off'}
              autoCapitalize={'none'}
              secureTextEntry={true}
              placeholder={'password'}
              onBlur={onBlur}
              required
              onChangeText={onChange}
              errorMessage={errors.password && errors.password.message}
            />
          )}
          rules={{
            required: {value: true, message: 'this is required.'},
          }}
        />

        <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
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
