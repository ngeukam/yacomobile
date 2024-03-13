import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { instance, IntercepRq, IntercepRep } from "../../config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [authPhone, setAuthphone] = useState(null);

	//SET
	const TokenStore = (key, value) => {
		SecureStore.setItemAsync(key, value);
	};
	const PhoneStore = (key, value) => {
		SecureStore.setItemAsync(key, value);
	};
	const RefreshTokenStore = (key, value) => {
		SecureStore.setItemAsync(key, value);
	};

	// DEL
	const DeleteKey = (key) => {
		SecureStore.deleteItemAsync(key);
	};

	const Login = (phone_number, password) => {
		if (phone_number == "" || password == "") {
			Alert.alert("Error", "All fields are required", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else {
			setIsLoading(true);
			instance
				.post(`/login/`, { phone_number, password })
				.then((res) => {
					TokenStore("authToken", res.data.access);
					PhoneStore("Phone", JSON.stringify(phone_number));
					setUserToken(res.data.access);
					RefreshTokenStore("refreshToken", res.data.refresh);
					setIsLoading(false);
					navigation.navigate("Home");
				})
				.catch((e) => {
					if (e.response?.status === 401) {
						Alert.alert("Error", "Please return back and check your credentials", [
							{
								text: "Ok",
								onPress: () => console.log("Ok Pressed"),
								style: "default",
							},
						]);
						setIsLoading(false);
					}
				})
				.finally(() => {
					axios.interceptors.request.eject(IntercepRq);
					axios.interceptors.request.eject(IntercepRep);
					setIsLoading(false);
				});
		}
	};

	const Logout = () => {
		setIsLoading(true);
		DeleteKey("authToken");
		DeleteKey("Phone");
		DeleteKey("Iduser");
		setUserToken(null);
		setIsLoading(false);
	};
	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			let phoneStore = await SecureStore.getItemAsync("Phone");
			let tokenStore = await SecureStore.getItemAsync("authToken");
			if (phoneStore) {
				setUserToken(tokenStore);
				setAuthphone(JSON.parse(phoneStore));
			}
		} catch (error) {
			console.log(`isLoggedIn error ${error}`);
		}
		setIsLoading(false);
	};
	useEffect(() => {
		isLoggedIn();
	}, []);
	return (
		<AuthContext.Provider
			value={{ Login, Logout, isLoading, userToken, authPhone }}
		>
			{children}
		</AuthContext.Provider>
	);
};
