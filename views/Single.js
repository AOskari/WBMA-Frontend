import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Single = ({route}) => {
  const {title, url, description, filename, likes} = route.params;
  let video = false;

  // Getting the last portion of the file, i.e. jpg, mp4, etc.
  const extension = filename.split('.').pop();

  let source = `https://media.mw.metropolia.fi/wbma/uploads/${url}`;
  video = false;

  if (extension == ('mp4' || 'mov')) {
    source = `https://media.mw.metropolia.fi/wbma/uploads/${filename}`;
    video = true;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text h3 style={styles.title}>
          {title || 'Title not found'}
        </Text>
      </View>

      {video && (
        <Video
          useNativeControls
          isLooping
          resizeMode="cover"
          style={styles.media}
          source={{uri: source}}
        />
      )}
      {!video && (
        <Image
          containerStyle={styles.media}
          source={{uri: url}}
          PlaceHolderContent={<ActivityIndicator />}
        />
      )}
      <View style={styles.lowerContainer}>
        <View style={styles.statusBar}>
          <View style={styles.statusUpper}>
            <View style={styles.userHolder}>
              <Text>Posted by mattimeikalainen02</Text>
            </View>
            <View style={styles.upvoteContainer}>
              <Ionicons name="thumbs-up" color="#2596be" size={30} />
              <Text style={styles.upvoteCount}>{likes}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.desc}>
          {description || 'Description not found'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
  },
  media: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  desc: {
    fontWeight: 'bold',
    marginTop: 3,
    padding: 10,
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f2f3f4',
    elevation: 10,
  },
  lowerContainer: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f2f3f4',
    elevation: 10,
  },
  title: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  statusBar: {
    width: '100%',
    backgroundColor: 'whitesmoke',
    height: 50,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f2f3f4',
    elevation: 10,
  },
  upvoteContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: 10,
  },
  upvoteCount: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userHolder: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  statusUpper: {
    flexDirection: 'row',
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
