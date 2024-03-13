import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View, Text } from "react-native";
import AppStack from "./AppStack";

const AppNav = () => {
	const { isLoading, userToken } = useContext(AuthContext);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection:'row' }}>
				<Text style={{fontSize:32, color:'#44C5DB', fontFamily:'Roboto-Regular'}}>yac</Text><ActivityIndicator size={32} color="#44C5DB" />
			</View>
		);
	} else {
		return (
			<NavigationContainer>
				{userToken !== null ? (
					<AppStack />
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		);
	}
};

export default AppNav;
