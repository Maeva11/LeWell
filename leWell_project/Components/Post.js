import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const Post = (props) => {
    const [isDetailDisplay, setIsDetailDisplayed] = useState(false);

    const _toggleDisplayDetails = () => {
        setIsDetailDisplayed(!isDetailDisplay);
    };

    const originalDate = new Date("2022-09-17T10:26:13.000000Z");
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1.
    const year = originalDate.getFullYear().toString().slice(2, 4);

    const formattedDate = `${day}/${month}/${year}`;

    return (
        <View style={styles.Post}>
            <View style={styles.card}>
                <Image source={{ uri: props.item.photoLink }} style={styles.Image} />
                <View style={styles.InfoContainer}>
                    <View style={styles.Header}>
                        <Text style={styles.Title}>{props.item.title}</Text>
                        <TouchableOpacity style={styles.HeartIcon} onPress={() => {/* Gérer les likes */ }}>
                            <Feather name="heart" size={24} color="#692FA0" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.PublishedByContainer}>
                        <Ionicons name="ios-person" size={15} color="#692FA0" />
                        <Text style={styles.PublishedBy}> Publié par {props.item.user.firstname} {props.item.user.lastname}</Text>
                    </View>
                    <View style={styles.PublishedByContainer}>
                        <Ionicons name="ios-calendar" size={15} color="#692FA0" />
                        <Text style={styles.PublishedBy}> Le {formattedDate}</Text>
                    </View> 
                        <Text style={styles.Description}>{props.item.description}</Text>
                    <TouchableOpacity
                        style={styles.SeeMoreButton}
                        onPress={() => _toggleDisplayDetailDetails()}
                    >
                        <Text style={styles.SeeMoreText}>
                            {isDetailDisplay ? "Voir moins" : "Voir plus"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Post: {
        padding: 16,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    Image: {
        width: "100%",
        aspectRatio: 1,
    },
    card: {
        backgroundColor: "#EBE3F5",
        borderRadius: 10,
        overflow: "hidden",
        minHeight: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
    },
    InfoContainer: {
        padding: 10,
    },
    NameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    Name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginRight: 5,
    },
    Header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    HeartIcon: {
        alignItems: "flex-start",
        justifyContent: "center",

    },
    Description: {
        fontSize: 16,
        marginTop: 10,
        color: "#555",
    },
    PublishedByContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    PublishedBy: {
        fontSize: 16,
        color: "#555",
        marginTop: 5,
    },
    SeeMoreButton: {
        marginTop: 10,
    },
    SeeMoreText: {
        color: "#692FA0",
        fontSize: 16,
        fontWeight: "bold",
    },
    Divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 10,
    },
});

export default Post;
