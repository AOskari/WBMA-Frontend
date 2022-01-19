import React, {useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator} from 'react-native';
import {Image, Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import {useFocusEffect} from '@react-navigation/native';

const Upload = ({navigation}) => {
  const {source, setSource, uploading} = useContext(MainContext);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const [validTitle, setValidTitle] = useState(false);
  const [validDesc, setValidDesc] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useFocusEffect(React.useCallback(() => reset(), []));

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // Add fileName and mimeType to the result object:
      result.fileName = result.uri.split('/').pop();
      result.mimeType = result.fileName.split('.').pop();
      setSource(result);
    }
  };

  const onSubmit = async (data) => {
    // TODO: if image is not selected, Alert error message and stop running this function
    if (source.cancelled) {
      console.log('Image not picked, stopping onSubmit @ Upload.js');
      return;
    }

    const extension = source.mimeType ? 'jpeg' : 'jpeg';

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('file', {
      uri: source.uri,
      name: source.fileName,
      type: `image/${extension}`,
    });

    try {
      await postMedia(formData);
      setUpdate(!update);
      setTimeout(() => {
        reset();
        navigation.navigate('Home');
      }, 400);
    } catch (e) {
      console.log(`Error at onSubmit at Upload.js: ${e.message}`);
    }
  };

  const reset = () => {
    setTitle('');
    setDesc('');
    setSource('');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: source.uri}} />
      </View>
      <Button
        title="Select file"
        buttonStyle={styles.btn}
        onPress={pickImage}
      />
      <ActivityIndicator
        size="large"
        color="black"
        animating={uploading}
        style={styles.loadingAnim}
      />
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={title}
            autoCapitalize={'none'}
            placeholder="title"
            onBlur={onBlur}
            required
            onChangeText={onChange}
            errorMessage={errors.title && errors.title.message}
          />
        )}
        rules={{
          required: {value: true, message: 'this is required.'},
          minLength: {
            value: 3,
            message: 'Length must be at least 3 characters',
          },
          onChange: (e) => {
            if (e.target.value.length >= 3) setValidTitle(true);
            else setValidTitle(false);
            setTitle(e.target.value);
          },
        }}
      />
      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value, onBlur}}) => (
          <Input
            type="text"
            value={desc}
            autoCapitalize={'none'}
            placeholder="description"
            onBlur={onBlur}
            required
            onChangeText={onChange}
            errorMessage={errors.description && errors.description.message}
          />
        )}
        rules={{
          required: {value: true, message: 'this is required.'},
          minLength: {
            value: 3,
            message: 'Length must be at least 3 characters',
          },
          onChange: (e) => {
            if (e.target.value.length >= 3) setValidDesc(true);
            else setValidDesc(false);
            setDesc(e.target.value);
          },
        }}
      />
      <Button title="Reset" buttonStyle={styles.btn} onPress={reset} />
      <Button
        title="Upload"
        buttonStyle={styles.btn}
        onPress={handleSubmit(onSubmit)}
        disabled={!(validTitle && validDesc)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  btn: {
    margin: 5,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingAnim: {
    position: 'absolute',
    alignSelf: 'center',
    top: '30%',
    bottom: 0,
  },
});

Upload.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Upload;
