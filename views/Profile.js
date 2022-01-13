import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);

  console.log('profile isLoggedIn', isLoggedIn);
  console.log(`User data: ${JSON.stringify(user)}`);
  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(`Error at logout: ${e.message}`);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.full_name || 'Full name not found'}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});
Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
