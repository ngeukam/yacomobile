import React, { useState, useContext } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	Image,
	Text,
	TextInput,
	Pressable,
	TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
	const [form, setForm] = useState({
		phone: "",
		password: "",
	});
	const { Login, isLoading } = useContext(AuthContext);

	const HandleLogin = () => {
		Login(form.phone, form.password);
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Image
						source={require("../../assets/images/yaco-logo.png")}
						alt="App Logo"
						resizeMode="stretch"
						style={styles.headerImg}
					/>

					<Text style={styles.title}>
						Sign in to <Text style={{ color: "#44C5DB" }}>yaco</Text>
					</Text>

					<Text style={styles.subtitle}>
						Your phone credit top-ups in one place
					</Text>
				</View>
				<KeyboardAwareScrollView>
					<View style={styles.form}>
						<View style={styles.input}>
							<Text style={styles.inputLabel}>Phone number</Text>
							<PhoneInput
								defaultValue={form.phone}
								defaultCode="CM"
								layout="first"
								// onChangeText={phone => setForm({ ...form, phone })}
								onChangeFormattedText={(phone) => setForm({ ...form, phone })}
								withDarkTheme
								withShadow
								// autoFocus
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
								onChangeText={(password) => setForm({ ...form, password })}
								placeholder="********"
								placeholderTextColor="#6b7280"
								style={styles.inputControl}
								secureTextEntry={true}
								value={form.password}
							/>
						</View>

						<View style={styles.formAction}>
							<TouchableOpacity
								onPress={() => {
									HandleLogin();
								}}
								disabled={isLoading ? true : false}
							>
								<View style={styles.btn}>
									<Text style={styles.btnText}>Sign in</Text>
								</View>
							</TouchableOpacity>
						</View>

						<View>
							<Pressable
								onPress={() => {
									navigation.navigate("Forgot");
								}}
							>
								<Text style={styles.formLink}>Forgot password?</Text>
							</Pressable>
						</View>
					</View>
				</KeyboardAwareScrollView>

				<Pressable
					onPress={() => {
						navigation.navigate("Register");
					}}
					style={{ marginTop: "auto" }}
				>
					<Text style={styles.formFooter}>
						Don't have an account?{" "}
						<Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
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
	title: {
		fontSize: 31,
		fontWeight: "700",
		color: "#1D2A32",
		marginBottom: 6,
		marginTop: 10,
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "500",
		color: "#929292",
	},
	/** Header */
	header: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 30,
	},
	headerImg: {
		width: 80,
		height: 80,
		alignSelf: "center",
		marginBottom: 36,
		borderRadius: 50,
		marginTop: 40,
	},
	/** Form */
	form: {
		marginBottom: 24,
		paddingHorizontal: 24,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	formAction: {
		marginTop: 4,
		marginBottom: 16,
	},
	formLink: {
		fontSize: 16,
		fontWeight: "600",
		color: "#44C5DB",
		textAlign: "center",
	},
	formFooter: {
		fontSize: 15,
		fontWeight: "600",
		color: "#222",
		textAlign: "center",
		letterSpacing: 0.15,
	},
	/** Input */
	input: {
		marginBottom: 16,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "600",
		color: "#222",
		marginBottom: 8,
	},
	inputControl: {
		height: 50,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		borderWidth: 1,
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
	/** Phone Input */
	textInputStyle: {
		color: "#222",
		fontSize: 15,
	},
	containerStyle: {
		borderRadius: 12,
		fontWeight: "500",
		backgroundColor: "#FFF",
		width: "100%",
		// position:'relative',
	},
	codeTextStyle: {
		fontSize: 15,
		color: "#222",
	},
	textContainerStyle: {
		borderRadius: 12,
		height: 50,
		backgroundColor: "#FFF",
		paddingVertical: 2,
	},
	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		backgroundColor: "#44C5DB",
		borderColor: "#44C5DB",
	},
	btndisabled: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: "#CCC",
		borderColor: "#CCC",
	},
	btnText: {
		fontSize: 18,
		lineHeight: 26,
		fontWeight: "600",
		color: "#fff",
	},
});
export default LoginScreen;
