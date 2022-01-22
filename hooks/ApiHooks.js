import {useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://media.mw.metropolia.fi/wbma/media/';
const urlWithTag = 'https://media.mw.metropolia.fi/wbma/tags/OA23';

const useMedia = (update) => {
  const [mediaArray, setMediaArray] = useState(JSON);
  const {setUploading, TAG, isLoggedIn} = useContext(MainContext);
  const [userMediaArray, setUserMediaArray] = useState(JSON);

  const loadMedia = async () => {
    try {
      const response = await fetch(urlWithTag);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const thumbnail = await fetch(url + item.file_id);
          const thumbnailJson = await thumbnail.json();

          // Getting the likes of the image.
          const likes = await getFavourites(item.file_id);
          thumbnailJson.likes = likes;
          return thumbnailJson;
        })
      );
      if (isLoggedIn) {
        // Get user's own posts.
        console.log('Fetching user media.');
        const userToken = await AsyncStorage.getItem('userToken');
        const options = {
          method: 'GET',
          headers: {
            'x-access-token': userToken,
          },
        };

        const userResponse = await fetch(url + 'user', options);
        const userJson = await userResponse.json();
        setUserMediaArray(userJson);
      }

      setMediaArray(json);
      console.log(`Media fetch succesful.`);
    } catch (e) {
      console.log(`Error at loadmedia: ${e.message}`);
    }
  };

  const getFavourites = async (id) => {
    const response = await fetch(
      `https://media.mw.metropolia.fi/wbma/favourites/file/${id}`
    );

    const favourites = await response.json();
    return Object.keys(favourites).length;
  };

  const postMedia = async (data) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const options = {
      headers: {'x-access-token': userToken},
      method: 'POST',
      body: data,
    };

    try {
      setUploading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      setUploading(false);
      if (response.ok) {
        console.log(`File upload succesful: ${JSON.stringify(json)}`);
      } else return;

      // Adding tag after uploading the file.

      const tagBody = {
        file_id: json.file_id,
        tag: TAG,
      };

      const tagOptions = {
        method: 'POST',
        headers: {
          'x-access-token': userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagBody),
      };

      const addTag = await fetch(
        `https://media.mw.metropolia.fi/wbma/tags`,
        tagOptions
      );

      const tagJson = await addTag.json();
      if (addTag.ok) console.log('Adding tag succesful:', tagJson);
    } catch (e) {
      console.log(`Error at postMedia: ${e.message}`);
    }
  };

  const deleteMedia = async (id) => {
    const userToken = await AsyncStorage.getItem('userToken');
    const options = {
      headers: {'x-access-token': userToken},
      method: 'DELETE',
    };

    try {
      setUploading(true);
      const response = await fetch(url + id, options);
      const json = await response.json();
      setUploading(false);
      if (response.ok) {
        console.log(`File delete succesful: ${JSON.stringify(json)}`);
      }
    } catch (e) {
      console.log(`Error at deleteMedia: ${e.message}`);
    }
  };

  const editMedia = async (data) => {
    const bodyData = {
      title: data.title,
      description: data.description,
    };

    const userToken = await AsyncStorage.getItem('userToken');
    const options = {
      headers: {
        'x-access-token': userToken,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(bodyData),
    };

    try {
      setUploading(true);
      const response = await fetch(url + data.id, options);
      const json = await response.json();
      if (response.ok) {
        console.log(`File modify succesful: ${JSON.stringify(json)}`);
      }
    } catch (e) {
      console.log(`Error at deleteMedia: ${e.message}`);
    }
  };

  useEffect(async () => {
    loadMedia();
    console.log('useEffect @ useMedia called.');
  }, [update]);

  return {
    mediaArray,
    postMedia,
    getFavourites,
    userMediaArray,
    deleteMedia,
    editMedia,
  };
};

const useLogin = () => {
  const url = 'https://media.mw.metropolia.fi/wbma/login';

  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(baseUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(baseUrl + 'users', options);
      const json = await response.json();
      if (response.ok) return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken, postUser, getUserImage};
};

const getUserImage = () => {
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {user} = useContext(MainContext);

  const getImg = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const uri =
        'https://media.mw.metropolia.fi/wbma/tags/avatar_' + user.user_id;

      const response = await fetch(uri, options);
      const json = await response.json();

      const src =
        'https://media.mw.metropolia.fi/wbma/uploads/' + json[0].filename;

      setAvatar(src);
    } catch (e) {
      console.log(`Error at getUserImage: ${e.message}`);
    }
  };

  useEffect(async () => {
    getImg();
    console.log('getUserImage useEffect called.');
  }, [user]);

  return {avatar};
};

export {useMedia, useLogin, useUser, getUserImage};
