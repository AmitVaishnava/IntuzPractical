import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator } from "react-navigation-switch-transitioner";

import LoginScreen from "../screens/login/Login";
import GenreScreen from "../screens/playback/movielist/Genres";
import PopularMoviesScreen from "../screens/playback/PopularMovies";
import GenreDetailsScreen from "../screens/playback/movielist/GenreDetails";

import Colors from "../Constants/Colors";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,//header text color
};


const GenreNavigation = createStackNavigator({
    Genre: GenreScreen,
    GenreDetails: GenreDetailsScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const PopularMoviesListNavigation = createStackNavigator({
    PopularMovies: PopularMoviesScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const PlayBackTabNavigation = createBottomTabNavigator({
    MovieList: GenreNavigation,
    PopularMovieList: PopularMoviesListNavigation
}, {
    defaultNavigationOptions: defaultNavOptions
});

const BaseNavigation = createSwitchNavigator({
    Login: LoginScreen,
    Playback: PlayBackTabNavigation
});
export default createAppContainer(PlayBackTabNavigation);