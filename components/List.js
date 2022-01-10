import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

  const [mediaArray, setMediaArray] = useState(JSON);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setMediaArray(json);
    } catch (e) {
      console.log(`Error at loadmedia: ${e.message}`);
    }
  };

  useEffect(async () => {
    console.log('useEffect called.');
  }, []);

  loadMedia();

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
