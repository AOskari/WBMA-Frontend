import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Button, Card, Icon, Image, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {getUserImage} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const {avatar} = getUserImage();

  const logout = async () => {
    try {
      console.log('Logout called, setting isLoggedIn false');
      setIsLoggedIn(false);
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log(`Error at logout: ${e.message}`);
    }
  };
  const showMyFiles = async () => {
    try {
      navigation.navigate('MyFiles');
    } catch (e) {
      console.log(`Error at logout: ${e.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>
          <Icon name="person" color="black" containerStyle={styles.icon} />
          Username: {user.username}
        </Card.Title>
        <Card.Divider />
        <View style={styles.imageContainer}>
          <Image source={{uri: avatar}} style={styles.image} />
        </View>
        <Card.Divider />
        <Text>Fullname: {user.full_name || 'not found'}</Text>
        <Text>email:{user.email}</Text>
        <Button
          title={'My files'}
          buttonStyle={styles.btn}
          onPress={showMyFiles}
        />
        <Button title={'Logout'} onPress={logout} buttonStyle={styles.btn} />
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
    resizeMode: 'contain',
  },
  card: {
    width: '100%',
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
    maxHeight: 200,
    marginBottom: 20,
  },
  btn: {
    marginTop: 10,
  },
});
Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
