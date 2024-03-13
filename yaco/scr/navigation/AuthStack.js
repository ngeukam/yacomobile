import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Loginscreen";
import RegisterScreen from "../screens/Registerscreen";
import OtpScreen from "../screens/Otpscreen";
import ForgotScreen from "../screens/Forgotscreen";
import AppStack from "./AppStack";
import Testscreen from "../screens/Testscreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Test"
				component={Testscreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Otp"
				component={OtpScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Forgot"
				component={ForgotScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Home"
				component={AppStack}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
