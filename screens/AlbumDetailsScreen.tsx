// screens/AlbumDetailsScreen.tsx
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { List } from 'react-native-paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotos, removePhoto, selectPhotos } from '../slices/albumSlice'; // Import from albumSlice

const AlbumDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { album } = route.params;
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos).filter((photo: any) => photo.albumId === album.id);

  useEffect(() => {
    // Fetch photos for the selected album from API and set in Redux store
    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then((response) => {
        dispatch(setPhotos(response.data));
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  }, [album.id, dispatch]);

  const handleDelete = (photoId: number) => {
    // Make delete request and update Redux store
    axios.delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then(() => {
        dispatch(removePhoto(photoId));
      })
      .catch((error) => {
        console.error('Error deleting photo:', error);
      });
  };

  const renderGridItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {}}>
      {/* <Image source={{ uri: item.thumbnailUrl }} style={styles.photoImage} /> */}
      <List.Item
        title={item.title}
        right={() => (
          <List.Icon
            icon="delete"
            color="#ff0000"
            onPress={() => handleDelete(item.id)}
          />
        )}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderGridItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  gridItem: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default AlbumDetailsScreen;
