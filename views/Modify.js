import React, {useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useMedia} from '../hooks/ApiHooks';

const Modify = ({navigation, route}) => {
  const {title, description, fileId} = route.params;
  const {uploading} = useContext(MainContext);
  const {editMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const [validTitle, setValidTitle] = useState(true);
  const [validDesc, setValidDesc] = useState(true);

  const [titleInput, setTitleInput] = useState(title);
  const [desc, setDesc] = useState(description);

  const onSubmit = async (data) => {
    console.log(
      'Data at Modify: ',
      JSON.stringify(data),
      'route prams: ',
      title,
      description,
      fileId
    );

    const bodyData = {
      title: data.title,
      description: data.description,
      id: fileId,
    };

    try {
      await editMedia(bodyData);
      setUpdate(!update);
      setTimeout(() => {
        navigation.navigate('MyFiles');
      }, 400);
    } catch (e) {
      console.log(`Error at onSubmit at Upload.js: ${e.message}`);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: 'onBlur'});

  return (
    <SafeAreaView style={styles.container}>
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
            value={titleInput}
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
            setTitleInput(e.target.value);
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
      <Button
        title="Apply changes"
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

Modify.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Modify;
