import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const url = 'https://media.mw.metropolia.fi/wbma/media/';
  const [mediaArray, setMediaArray] = useState(JSON);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const thumbnail = await fetch(url + item.file_id);
          const thumbnailJson = await thumbnail.json();
          console.log(thumbnailJson);
          return thumbnailJson;
        })
      );

      setMediaArray(json);
      console.log(`Fetched data: ${mediaArray}`);
    } catch (e) {
      console.log(`Error at loadmedia: ${e.message}`);
    }
  };

  useEffect(async () => {
    loadMedia();
    console.log('useEffect called.');
  }, []);

  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default List;
