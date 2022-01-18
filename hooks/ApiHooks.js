import {useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const url = 'https://media.mw.metropolia.fi/wbma/media/';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState(JSON);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const thumbnail = await fetch(url + item.file_id);
          const thumbnailJson = await thumbnail.json();
          return thumbnailJson;
        })
      );

      setMediaArray(json);
      console.log(`Media fetch succesful.`);
    } catch (e) {
      console.log(`Error at loadmedia: ${e.message}`);
    }
  };

  useEffect(async () => {
    loadMedia();
    console.log('useEffect @ useMedia called.');
  }, []);

  return {mediaArray};
};

const useLogin = () => {
  const url = 'https://media.mw.metropolia.fi/wbma/login';
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
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
      if (response.ok) {
        return json;
      }
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
