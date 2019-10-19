import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import Colors from "../../Constants/Colors";

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(email) === false) {
            showErrorAlert("Invalid Email Address! Please check.")

        } else if (email.toLowerCase() !== "amit@gmail.com") {
            showErrorAlert("Email Address is not correct")
        }
        else if (password !== "amit") {
            showErrorAlert("Password is not correct!")
        }
        else {
            props.navigation.navigate("Playback");
        }

    };

    const showErrorAlert = (msg) => {
        Alert.alert("Error ?", msg, [
            { text: "Ok", style: "default" },
        ])
    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input}
                value={email}
                placeholder="Email Address"
                onChangeText={text => setEmail(text)}
                autoCorrect
                returnKeyType="next" />
            <TextInput style={styles.input}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                autoCorrect
                returnKeyType="next" />
            <View style={styles.button}>
                <Button
                    color={Colors.primaryColor}
                    title="Login"
                    onPress={loginHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey"
    },
    title: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold"
    },
    input: {
        width: "80%",
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    button: {
        margin: 10,
        width: "40%"
    }
});

Login.navigationOptions = navData => {
    return {
        headerTitle: "LoginScreen"
    };
};

export default Login;