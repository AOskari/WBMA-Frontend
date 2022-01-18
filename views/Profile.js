import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button, Card, Icon, Image, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {getUserImage} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const {avatar} = getUserImage();
  console.log('profile isLoggedIn', isLoggedIn);
  console.log(`User data: ${JSON.stringify(user)}, avatar uri: ${avatar}`);
  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(`Error at logout: ${e.message}`);
    }
  };

  /*   useEffect(() => {
    checkToken();
  }, []);
   */

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} h2>
        Profile
      </Text>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>
          <Icon name="person" color="black" containerStyle={styles.icon} />
          Username: {user.username}
        </Card.Title>
        <Card.Divider />
        <View style={styles.imageContainer}>
          <Image source={{uri: avatar}} style={styles.image} />
        </View>
        <Text>Fullname: {user.full_name || 'not found'}</Text>
        <Text>email:{user.email}</Text>
        <Card.Divider />
        <Button title={'Logout'} onPress={logout} />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: '100%',
    height: '70%',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  title: {
    textAlign: 'left',
    color: '#0F52BA',
  },
  icon: {
    marginRight: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    maxHeight: 600,
    marginBottom: 20,
  },
});
Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
