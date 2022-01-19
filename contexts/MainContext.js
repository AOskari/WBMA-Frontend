import React, {useState} from 'react';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [source, setSource] = useState(ImagePicker);
  const [uploading, setUploading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [TAG] = useState('OA23');

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        source,
        setSource,
        uploading,
        setUploading,
        update,
        setUpdate,
        TAG,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
