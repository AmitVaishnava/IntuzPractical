import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import axios from "axios";
import Card from "../components/ui/Card";

const Genre = props => {

    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        console.log("amit id:" + props.id);
        axios.get("https://api.themoviedb.org/3/genre/" + props.id + "/movies", {
            params: {
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                // console.log("amit value" + JSON.stringify(response.data.results))
                setMovieList(response.data.results)
            })
            .catch(error => {
                // console.log("amit error", error);
            });

    }, [movieList]);

    return (
        <FlatList
            data={movieList}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={itemData => (
                <Card style={styles.form}>
                    <Text> {itemData.item.id}</Text>
                    <Text> {itemData.item.title}</Text>
                </Card>
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
});
export default Genre;