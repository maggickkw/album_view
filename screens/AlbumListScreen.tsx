import React, { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { List } from "react-native-paper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlbums, removeAlbum, selectAlbums } from "../slices/albumSlice";
import { useNavigation } from "@react-navigation/native";

const AlbumListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums).slice(0, 10);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch albums from API and set in Redux store
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        dispatch(
          setAlbums(response.data.map((album: any) => album).slice(0, 10))
        ); // Limit to 10 results
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, [dispatch]);

  const handleAlbumPress = (album: any) => {
    // Navigate to the AlbumDetailsScreen with the selected album details
    navigation.navigate("AlbumDetails", { album });
  };

  const renderGridItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleAlbumPress(item)}>
      {/* <Image source={require('./path/to/your/image.png')} style={styles.albumImage} /> Replace with your image path */}
      <List.Item title={item.title} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={albums}
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
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default AlbumListScreen;
