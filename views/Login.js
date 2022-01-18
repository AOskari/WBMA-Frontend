import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const checkToken = async () => {
    console.log('checking token');
    const {getUserByToken} = useUser();

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserByToken(userToken);
      console.log('token', userToken);
      console.log(user == true);
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        navigation.navigate('Tabs');
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log(`Error at checkToken: ${e.message}`);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.view}
    >
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <View style={styles.container}>
          <LoginForm navigation={navigation} />
          <RegisterForm navigation={navigation}></RegisterForm>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  view: {
    flex: 1,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
