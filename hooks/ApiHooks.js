import {useState, useEffect} from 'react';

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
      const userData = response.json();
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
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      // TODO: use fetch to send request to users endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(baseUrl + 'users', options);
      const json = await response.json();
      if (response.ok) return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {getUserByToken, postUser};
};

export {useMedia, useLogin, useUser};
