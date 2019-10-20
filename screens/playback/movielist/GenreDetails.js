import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import Card from "../../../components/ui/Card";
import axios from "axios";
import Colors from "../../../Constants/Colors";

const imagePath = "https://image.tmdb.org/t/p/w500/";

const GenreDetails = props => {

    const movieId = props.navigation.getParam("movieId");
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);

        axios.get("https://api.themoviedb.org/3/movie/" + movieId, {
            params: {
                api_key: "f17e9c5e6c34ad9dc2bf6aab852c0cc7"
            }
        })
            .then(response => {
                console.log("amit value 44" + JSON.stringify(response))
                setDetails(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log("amit error", error);
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
        <Card style={styles.form}>
            <View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: imagePath + details.backdrop_path }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>Title:{details.title}</Text>
                    <Text style={styles.price}>Popularity: {details.popularity}</Text>
                </View>
                <View style={styles.actions}>
                    <Text>Description:{details.overview}</Text>
                </View>
            </View>
        </Card >
    );
};

GenreDetails.navigationOptions = navData => {
    return {
        headerTitle: "Movie Details"
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,

    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    details: {
        alignItems: "center",
        height: "17%",
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: "open-sans-bold",
    },
    price: {
        fontSize: 14,
        color: "#888",
        fontFamily: "open-sans",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",//vertical axis, cross axis,
        height: "23%",
        paddingHorizontal: 20,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default GenreDetails;