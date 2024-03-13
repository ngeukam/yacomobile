import React, { useState, useEffect, useContext } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	SafeAreaView,
	Pressable,
	Text,
	Image,
	Alert,
	ActivityIndicator,
	TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { instance, IntercepRq, IntercepRep } from "../../config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";

const OtpScreen = ({ navigation }) => {
	const inputs = [];
	const [otp, setOtp] = useState(["", "", "", ""]);
	const handleOtpChange = (value, index) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		// Move focus to the next box if the current one has a value
		if (value && index < newOtp.length - 1) {
			inputs[index + 1].focus();
		}
	};
	const { Login } = useContext(AuthContext);

	const [d1, setD1] = useState();
	const [c1, setC1] = useState();
	const [otpbol, setOtpBol] = useState(false);

	const join_otp = otp.join("");

	const GetFormDataStore = (key) => {
		SecureStore.getItemAsync(key).then((response) => {
			setD1(response);
		});
	};
	const GetCodeOtpStore = (key) => {
		SecureStore.getItemAsync(key).then((response) => {
			setC1(response);
		});
	};

	const DeleteKey = (key) => {
		SecureStore.deleteItemAsync(key);
	};

	useEffect(() => {
		GetFormDataStore("FormData");
		GetCodeOtpStore("OTPcode");
	}, []);
	const handleSubmitRegister = async () => {
		if (JSON.parse(c1) == join_otp) {
			setOtpBol(true);
			instance
				.post("/register/", JSON.parse(d1))
				.then(() => {
					// Handle the response
					setOtp(["", "", "", ""]);
					DeleteKey("OTPcode");
					// setOtpBol(false);
					Login(JSON.parse(d1).phone_number, JSON.parse(d1).password);
				})
				.catch((error) => {
					setOtpBol(false);
					console.error(error);
				})
				.finally(() => {
					// Eject the interceptor to prevent it from affecting other requests
					axios.interceptors.request.eject(IntercepRq);
					axios.interceptors.response.eject(IntercepRep);
					setOtpBol(false);
				});
		} else {
			Alert.alert("OTP Error", "Code does not match", [
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
			]);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
			<View style={styles.container}>
				<KeyboardAwareScrollView>
					<View style={styles.header}>
						<Image
							source={require("../../assets/images/yaco-logo.png")}
							alt="App Logo"
							nresizeMode="contain"
							style={styles.headerImg}
						/>

						<Text style={styles.title}>OTP</Text>

						<Text style={styles.subtitle}>
							Please enter the code received by sms
						</Text>
					</View>
					<View style={styles.opt}>
						{otp.map((digit, index) => (
							<TextInput
								key={index}
								style={styles.box}
								maxLength={1}
								keyboardType="numeric"
								onChangeText={(value) => handleOtpChange(value, index)}
								value={digit}
								ref={(input) => {
									inputs[index] = input;
								}}
							/>
						))}
					</View>
					<View style={styles.formAction}>
						<TouchableOpacity
							onPress={() => {
								handleSubmitRegister();
							}}
							disabled={otpbol ? true : false}
						>
							<View style={styles.btn}>
								<Text style={styles.btnText}>Submit </Text>

								{/* <ActivityIndicator size={32} color="#FFF" /> */}
							</View>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		paddingHorizontal: 0,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		marginVertical: 24,
		paddingHorizontal: 24,
	},
	headerImg: {
		width: 80,
		height: 80,
		alignSelf: "center",
		marginBottom: 20,
		borderRadius: 50,
		marginTop: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#1d1d1d",
		marginBottom: 1,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 14,
		fontWeight: "500",
		color: "#929292",
	},
	opt: {
		flexDirection: "row",
		marginBottom: 16,
		paddingHorizontal: 24,
	},
	box: {
		width: 50,
		height: 50,
		margin: 5,
		textAlign: "center",
		fontSize: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
		fontWeight: "500",
		color: "#222",
		borderWidth: 2,
		borderColor: "#C9D3DB",
		borderStyle: "solid",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
	},
	formAction: {
		marginBottom: 16,
		alignItems: "center",
	},
	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 1,
		borderWidth: 1,
		backgroundColor: "#44C5DB",
		borderColor: "#44C5DB",
		width: 150,
	},
	btnText: {
		fontSize: 17,
		// lineHeight: 24,
		fontWeight: "600",
		color: "#fff",
	},
});
export default OtpScreen;
