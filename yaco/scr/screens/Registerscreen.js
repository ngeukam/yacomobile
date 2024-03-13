import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	Pressable,
	TextInput,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { instance, IntercepRq, IntercepRep, generateToken } from "../../config";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone_number: "",
		password: "",
	});
	const [otp_code, setOTPCode] = useState(null);

	useEffect(() => {
		setOTPCode(generateToken);
	}, []);

	const FormDataStore = (key, value) => {
		SecureStore.setItemAsync(key, value);
	};
	const CodeOtpStore = (key, value) => {
		SecureStore.setItemAsync(key, value);
	};
	const [send, setSend] = useState(false);
	// const [password, setPassword] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [strength, setStrength] = useState("");

	const validatePassword = (input) => {
		setForm({ ...form, password: input });
		console.log(form);

		let newSuggestions = [];
		if (input?.length < 8) {
			newSuggestions.push("Password should be at least 8 characters long");
		}
		if (!/\d/.test(input)) {
			newSuggestions.push("Add at least one number");
		}

		if (!/[A-Z]/.test(input || !/[a-z]/.test(input))) {
			newSuggestions.push("Include both upper and lower case letters");
		}

		if (!/[^A-Za-z0-9]/.test(input)) {
			newSuggestions.push("Include at least one special character");
		}

		setSuggestions(newSuggestions);

		// Determine password strength based on suggestions
		if (newSuggestions.length === 0) {
			setStrength("Very Strong");
		} else if (newSuggestions.length <= 1) {
			setStrength("Strong");
		} else if (newSuggestions.length <= 2) {
			setStrength("Moderate");
		} else if (newSuggestions.length <= 3) {
			setStrength("Weak");
		} else {
			setStrength("Too Weak");
		}
	};

	const handleRegister = async () => {
		if (
			form.name == "" ||
			form.email == "" ||
			form.phone_number == "" ||
			form.password == ""
		) {
			Alert.alert("Empty field", "All fields are required", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else if (form?.phone_number.length < 13) {
			Alert.alert("Alert phone number", "9 digits are waiting", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else {
			setSend(true);
			instance
				.post("/send-otp/", {
					phone_number: form.phone_number,
					otp_code: otp_code,
				})
				.then(() => {
					FormDataStore("FormData", JSON.stringify(form));
					CodeOtpStore("OTPcode", JSON.stringify(otp_code));
					navigation.navigate("Otp");
					// setSend(false);
				})
				.catch((error) => {
					// Handle errors
					setSend(false);
					console.error(error);
				})
				.finally(() => {
					// Eject the interceptor to prevent it from affecting other requests
					axios.interceptors.request.eject(IntercepRq);
					axios.interceptors.response.eject(IntercepRep);
					setSend(false);
				});
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text style={styles.title}>Getting Started</Text>
						<Image
							source={require("../../assets/images/yaco-logo.png")}
							alt="App Logo"
							resizeMode="contain"
							style={styles.headerImg}
						/>
					</View>
					<Text style={styles.subtitle}>Create an account to continue</Text>
				</View>

				<KeyboardAwareScrollView>
					<View style={styles.form}>
						<View style={styles.input}>
							<Text style={styles.inputLabel}>Full name</Text>

							<TextInput
								autoCapitalize="none"
								onChangeText={(name) => setForm({ ...form, name })}
								placeholder="Theo Don"
								placeholderTextColor="#6b7280"
								style={styles.inputControl}
								value={form.name}
							/>
						</View>

						<View style={styles.input}>
							<Text style={styles.inputLabel}>Email address</Text>

							<TextInput
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="email-address"
								onChangeText={(email) => setForm({ ...form, email })}
								placeholder="theo@example.com"
								placeholderTextColor="#6b7280"
								style={styles.inputControl}
								value={form.email?.toLocaleLowerCase()}
							/>
						</View>

						<View style={styles.input}>
							<Text style={styles.inputLabel}>Phone number</Text>
							<PhoneInput
								defaultValue={form.phone_number}
								defaultCode="CM"
								layout="first"
								onChangeFormattedText={(phone_number) =>
									setForm({ ...form, phone_number })
								}
								withDarkTheme
								withShadow
								containerStyle={styles.containerStyle}
								textInputStyle={styles.textInputStyle}
								codeTextStyle={styles.codeTextStyle}
								textContainerStyle={styles.textContainerStyle}
							/>
						</View>

						<View style={styles.input}>
							<Text style={styles.inputLabel}>Password</Text>
							<TextInput
								autoCorrect={false}
								onChangeText={(input) => validatePassword(input)}
								placeholder="********"
								placeholderTextColor="#6b7280"
								style={styles.inputControl}
								secureTextEntry={true}
								value={form.password}
							/>
						</View>
						<View style={styles.strengthMeter}>
							<View
								style={{
									width: `${
										strength === "Very Strong"
											? 100
											: strength === "Strong"
											? 75
											: strength === "Moderate"
											? 50
											: strength === "Weak"
											? 25
											: 0
									}%`,
									height: 20,
									backgroundColor:
										strength === "Too Weak"
											? "red"
											: strength === "Weak"
											? "orange"
											: strength === "Moderate"
											? "yellow"
											: strength === "Strong"
											? "green"
											: "limegreen",
								}}
							></View>
						</View>

						{/* <View style={styles.input}>
							<Text style={styles.inputLabel}>Confirm Password</Text>

							<TextInput
								autoCorrect={false}
								onChangeText={confirmPassword =>
								setForm({ ...form, confirmPassword })
								}
								placeholder="********"
								placeholderTextColor="#6b7280"
								style={styles.inputControl}
								secureTextEntry={true}
								value={form.confirmPassword} />
						</View> */}

						<View style={styles.formAction}>
							<TouchableOpacity
								onPress={() => handleRegister()}
								disabled={send ? true : false}
							>
								<View style={styles.btn}>
									<View style={{ width: 32 }} />
									<Text style={styles.btnText}>Continue</Text>
									<MaterialCommunityIcons
										color="#fff"
										name="arrow-right"
										size={20}
										style={{ marginLeft: 12 }}
									/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAwareScrollView>
				<Pressable
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					<Text style={styles.formFooter}>
						Already have an account?{" "}
						<Text style={{ textDecorationLine: "underline", color: "#44C5DB" }}>
							Sign in
						</Text>
					</Text>
				</Pressable>
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
	},
	header: {
		marginVertical: 24,
		paddingHorizontal: 24,
	},
	headerImg: {
		width: 30,
		height: 30,
		// alignSelf: "center",
		// marginBottom: 20,
		borderRadius: 50,
		// marginTop: 10,
		marginRight: 150,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#1D2A32",
		marginBottom: 1,
	},
	subtitle: {
		fontSize: 14,
		fontWeight: "500",
		color: "#929292",
	},
	/** Form */
	form: {
		paddingHorizontal: 24,
	},
	formAction: {
		marginVertical: 10,
		marginBottom: 20,
	},
	formFooter: {
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		textAlign: "center",
		letterSpacing: 0.15,
	},
	/** Input */
	input: {
		marginBottom: 12,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "600",
		color: "#222",
		marginBottom: 8,
	},
	inputControl: {
		height: 44,
		backgroundColor: "#f1f5f9",
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
	},
	strengthMeter: {
		width: "100%",
		height: 10,
		backgroundColor: "#ccc",
		borderRadius: 10,
		overflow: "hidden",
	},

	/** Phone Input */
	textInputStyle: {
		color: "#222",
		fontSize: 15,
	},
	containerStyle: {
		borderRadius: 12,
		fontWeight: "500",
		backgroundColor: "#f1f5f9",
		// width: 310,
		width: "100%",
	},
	codeTextStyle: {
		fontSize: 15,
		color: "#222",
	},
	textContainerStyle: {
		borderRadius: 12,
		height: 44,
		backgroundColor: "#f1f5f9",
		paddingVertical: 2,
	},

	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: "#1D2A32",
		borderColor: "#1D2A32",
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: "#fff",
	},
});

export default RegisterScreen;
