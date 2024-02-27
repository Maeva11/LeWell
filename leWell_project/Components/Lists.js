import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import Post from "./Post";
import { getPosts } from "../API/postAPI";
import TitleAppli from "./TitleAppli";


const Lists = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(res => {
      setPosts(res.data)
    })
  }, []
  )
  return (
    <View style={styles.Lists}>
      <TitleAppli></TitleAppli>
      <Text>
        Page liste des puits
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Lists: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:80
  }
});


export default Lists   