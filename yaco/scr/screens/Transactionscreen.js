import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	Pressable,
	TextInput,
	Image,
	StatusBar,
	Alert,
	ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChoiseOperators from "../components/ChoiseOperators";
import ChoiseMobileOperators from "../components/ChoiseMobileOperators";
import { useIsFocused } from "@react-navigation/native";

const INPUT_OFFSET = 50;
const TransactionScreen = () => {
	const [form, setForm] = useState({
		recipient_number: "",
		amount: "",
		mobile_money_number: "",
	});
	const HandleCancel = () => {
		setForm({
			recipient_number: "",
			amount: "",
			mobile_money_number: "",
		});
	};
	const [transfert, setTransfert] = useState(false);
	const isfocused = useIsFocused();

	useEffect(() => {
		setForm({ recipient_number: "", amount: "", mobile_money_number: "" });
	}, [isfocused]);

	const HandleSend = () => {
		if (
			form.recipient_number == "" ||
			form.amount == "" ||
			form.mobile_money_number == ""
		) {
			Alert.alert("Required fields", "All fields are required", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else {
			Alert.alert(
				"Confirm",
				"Are you sure to transfert " +
					form.amount +
					" XAF to " +
					form.recipient_number +
					" ?",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{ text: "OK", onPress: () => setTransfert(true) },
				]
			);
		}
	};
	if (transfert) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: "#FFF",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<StatusBar animated={true} backgroundColor="#44C5DB" />
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							fontSize: 16,
							color: "#44C5DB",
							fontFamily: "Roboto-Regular",
						}}
					>
						Your are credit transfet in progress...
					</Text>
					<ActivityIndicator size={32} color="#44C5DB" />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
				<StatusBar animated={true} backgroundColor="#44C5DB" />
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.title}>Send Credit</Text>
					</View>

					<KeyboardAwareScrollView>
						<View style={styles.form}>
							<View style={styles.input}>
								<Text style={styles.inputLabel}>Recipient phone</Text>
								<MaterialCommunityIcons
									color="#44C5DB"
									name="book-account"
									size={30}
									style={styles.iconPhonebook}
								/>

								{ChoiseOperators(form.recipient_number)}

								<TextInput
									keyboardType="phone-pad"
									onChangeText={(recipient_number) =>
										setForm({ ...form, recipient_number })
									}
									placeholderTextColor="#505060"
									returnKeyType="done"
									style={styles.inputControl}
									value={form.recipient_number}
								/>
							</View>

							<View style={styles.input}>
								<Text style={styles.inputLabel}>Amount</Text>
								{/* <MaterialCommunityIcons
									color="tomato"
									name="wallet"
									size={30}
									style={styles.iconPhonebook}
								/> */}
								<TextInput
									keyboardType="numeric"
									onChangeText={(amount) => setForm({ ...form, amount })}
									placeholderTextColor="#6b7280"
									returnKeyType="done"
									style={styles.inputControl}
									value={form.amount}
								/>
								<Text style={styles.currency}>xaf</Text>
							</View>

							<View style={styles.input}>
								<Text
									style={styles.inputLabel}
								>{`Your mobile money \nphone`}</Text>
								{/* <MaterialCommunityIcons
									color="#2F4F4F"
									name="account-cash"
									size={30}
									style={styles.iconPhonebook}
								/> */}
								{ChoiseMobileOperators(form.mobile_money_number)}
								<TextInput
									keyboardType="phone-pad"
									onChangeText={(mobile_money_number) =>
										setForm({ ...form, mobile_money_number })
									}
									placeholderTextColor="#505060"
									returnKeyType="done"
									style={styles.inputControl}
									value={form.mobile_money_number}
								/>
							</View>

							<View style={styles.formAction}>
								<Pressable
									onPress={() => {
										HandleSend();
									}}
								>
									<View style={styles.btn}>
										<Text style={styles.btnText}>Validate</Text>
									</View>
								</Pressable>

								<Pressable
									onPress={() => {
										HandleCancel();
									}}
								>
									<View style={styles.btn2}>
										<Text style={styles.btnText}>Cancel</Text>
									</View>
								</Pressable>
							</View>
						</View>
					</KeyboardAwareScrollView>
				</View>
			</SafeAreaView>
		);
	}
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
		marginVertical: 30,
		paddingHorizontal: 15,
		// marginBottom:24
	},

	title: {
		fontSize: 30,
		fontWeight: "bold",
		// color: '#1d1d1d',
		color: "#1D2A32",
		marginBottom: 1,
	},
	/** Form */
	form: {
		paddingHorizontal: 15,
	},
	formAction: {
		marginVertical: 24,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	/** Input */
	input: {
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	inputLabel: {
		fontSize: 15,
		fontWeight: "400",
		color: "#222",
		marginBottom: 8,
	},
	inputControl: {
		height: 44,
		paddingLeft: INPUT_OFFSET,
		backgroundColor: "#f1f5f9",
		// paddingHorizontal: 16,
		paddingLeft: 40,
		borderWidth: 1,
		borderColor: "#44C5DB",
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "600",
		color: "#222",
		width: 205,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
	},
	iconPhonebook: {
		position: "absolute",
		width: INPUT_OFFSET,
		lineHeight: 44,
		top: 0,
		left: 110,
		bottom: 0,
		marginHorizontal: 30, //12
		alignItems: "center",
		justifyContent: "center",
		// paddingLeft: 10,
		zIndex: 9,
		elevation: 5,
	},
	headerImg: {
		position: "absolute",
		width: 20,
		height: 20,
		alignSelf: "center",
		borderRadius: 50,
		top: 11,
		// left: 295,
		left: "100%",
		bottom: 0,
		marginHorizontal: -20, //12
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 10,
		zIndex: 9,
		// elevation: 5,
	},
	currency: {
		position: "absolute",
		width: INPUT_OFFSET,
		lineHeight: 44,
		top: 0,
		left: "100%",
		bottom: 0,
		marginHorizontal: -40, //12
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 10,
		zIndex: 9,
		fontSize: 15,
		fontWeight: "600",
		color: "#222",
		elevation: 5,
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
		backgroundColor: "#61CA91",
		borderColor: "#61CA91",
	},
	btn2: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: "tomato",
		borderColor: "tomato",
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: "#fff",
	},
});
export default TransactionScreen;
