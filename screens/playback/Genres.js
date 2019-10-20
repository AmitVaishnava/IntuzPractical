import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import GenreItems from "../../components/Genre";

const Genres = () => {

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
            params: {
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                setGenre(response.data.genres)
            })
            .catch(error => {
                // console.log("amit error", error);
            });
    }, [genre]);

    return (
        <View>
            <FlatList
                data={genre}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <GenreItems id={itemData.item.id} />
                )} />
        </View>
    );
};

const styles = StyleSheet.create({

});
export default Genres;