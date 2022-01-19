import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';

const RegisterForm = () => {
  const onSubmit = async (user) => {
    const {postUser} = useUser();
    console.log(user);
    const data = {
      username: user.username,
      password: user.password,
      email: user.email,
      full_name: user.fullName,
    };
    try {
      console.log('Register Button pressed');
      const response = await postUser(data);
      console.log(`Registered user: ${response}`);
    } catch (e) {
      console.log(`Error at Register: ${e.message}`);
    }
  };

  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
    getValues,
  } = useForm({mode: 'onBlur'});

  return (
    <View style={styles.view}>
      <Text h4>Register</Text>
      <Controller
        control={control}
        name="username"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={value}
            autoCapitalize={'none'}
            placeholder={'username'}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.username && errors.username.message}
          />
        )}
        rules={{
          required: {value: true, message: 'this is required.'},
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
          validate: async (value) => {
            try {
              const options = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              };

              const response = await fetch(
                `https://media.mw.metropolia.fi/wbma/users/username/${value}`,
                options
              );
              const json = await response.json();
              console.log(json);
              return json.available;
            } catch (e) {
              console.log(`Error at username validation: ${e.message}`);
            }
          },
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={value}
            name="password"
            autoComplete={'off'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder={'password'}
            required
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        rules={{
          required: {value: true, message: 'this is required.'},
          minLength: {
            value: 5,
            message: 'Password must be at least 5 characters',
          },
        }}
      />
      <Controller
        control={control}
        name="confirm_password"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={value}
            autoComplete={'off'}
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder={'retype password'}
            required
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={
              errors.confirm_password && errors.confirm_password.message
            }
          />
        )}
        rules={{
          required: {value: true, message: 'Please retype your password.'},
          validate: async (value) => {
            const pass = getValues('password');
            console.log(value, pass);
            if (pass == value) {
              console.log('Passwords match, returning true.');
              return true;
            } else {
              console.log('Passwords dont match, returning false.');
              return false;
            }
          },
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="email"
            value={value}
            autoComplete={'off'}
            autoCapitalize={'none'}
            placeholder={'email'}
            required
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.email && errors.email.message}
          />
        )}
        rules={{
          required: {value: true, message: 'this is required.'},
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        }}
      />
      <Controller
        control={control}
        name="full_name"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={value}
            autoComplete={'off'}
            autoCapitalize={'none'}
            placeholder={'full name'}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.fullName && errors.fullName.message}
          />
        )}
        rules={{
          minLength: {
            value: 3,
            message: 'Full name must be at least 3 characters',
          },
        }}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
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
