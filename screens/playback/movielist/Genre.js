import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import Card from "../../../components/ui/Card";
import Colors from "../../../Constants/Colors";

const Genre = props => {

    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("https://api.themoviedb.org/3/genre/" + props.id + "/movies", {
            params: {
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                console.log("amit value2" + JSON.stringify(response.data.results))
                setMovieList(response.data.results)
                setIsLoading(false);
            })
            .catch(error => {
                // console.log("amit error", error);
                setIsLoading(false);
            });

    }, []);

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.progressBarColor} />
            </View>
        );
    }

    return (
        <FlatList
            data={movieList}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={itemData => (
                <TouchableOpacity onPress={() => props.onDetails(itemData.item.id)}>
                    <Card style={styles.form}>
                        <Text> {itemData.item.id}</Text>
                        <Text> {itemData.item.title}</Text>
                    </Card>
                </TouchableOpacity>
            )} />
    );
};

const styles = StyleSheet.create({
    form: {
        width: 200,
        margin: 20,
        padding: 10,
        alignItems: "center"
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default Genre;