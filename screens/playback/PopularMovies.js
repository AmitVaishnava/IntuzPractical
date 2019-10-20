import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator
} from "react-native";
import axios from "axios";
import Colors from "../../Constants/Colors";

const numColumns = 2;

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const PopularMovies = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
                sort_by: "popularity.desc",
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                // console.log("amit popular" + JSON.stringify(response))
                setPopularMovies(response.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                // console.log("amit error", error);
                setIsLoading(false);
            });

    }, []);

    const renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.progressBarColor} />
            </View>
        );
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={formatData(popularMovies, numColumns)}
            style={styles.container}
            renderItem={renderItem}
            numColumns={numColumns}
        />
    );
};

PopularMovies.navigationOptions = {
    headerTitle: "Movies Categoery"
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: Colors.popularMovie,
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get("window").width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: "transparent",
    },
    itemText: {
        color: "white",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default PopularMovies;