import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import GenreItems from "./Genre";
import Colors from "../../../Constants/Colors";

const Genres = (props) => {

    const [genre, setGenre] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
            params: {
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                console.log("amit value1" + JSON.stringify(response))
                setGenre(response.data.genres)
                setIsLoading(false)
            })
            .catch(error => {
                // console.log("amit error", error);
                setIsLoading(false)
            });
    }, []);

    const onDetailsClickEvent = (id) => {
        props.navigation.navigate("GenreDetails", {
            movieId: id
        })
    }

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.progressBarColor} />
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={genre}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <View>
                        <Text style={styles.text}>Genre Name: {itemData.item.name}</Text>
                        <GenreItems
                            id={itemData.item.id}
                            name={itemData.item.name}
                            onDetails={(id) => {
                                // console.log("amit hey -------------" + id)
                                onDetailsClickEvent(id)
                            }} />
                    </View>
                )} />
        </View>
    );
};

Genres.navigationOptions = {
    headerTitle: "Movies"
};

const styles = StyleSheet.create({
    text: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        padding: 10,
        color: "white",
        backgroundColor: Colors.popularMovie
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

});
export default Genres;