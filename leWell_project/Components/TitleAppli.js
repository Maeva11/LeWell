import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TitleAppli = () => {
    return (
        <View style={styles.titleAppli}>
            <Text style={styles.title}>LeWell</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleAppli: {
        paddingTop: 45,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 50,
    }
});

export default TitleAppli