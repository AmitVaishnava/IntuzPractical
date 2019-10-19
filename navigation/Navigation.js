import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/login/Login";

const BaseNavigation = createStackNavigator({
    Login: LoginScreen,
});
export default createAppContainer(BaseNavigation);