import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import Post from "./Post";
import { getPosts } from "../API/postAPI";
import TitleAppli from "./TitleAppli";


const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(res => {
      setPosts(res.data)
    })
  }, []
  )
  return (
    <View style={styles.Home}>
      <TitleAppli></TitleAppli>
      <Text>
        Page d'accueil
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:80
  }
});


export default Home   