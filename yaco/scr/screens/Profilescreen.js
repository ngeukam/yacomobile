import React, { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	TextInput,
	Alert,
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { instance, IntercepRep, IntercepRq } from "../../config";

const ProfileScreen = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible2, setIsModalVisible2] = useState(false);
	const [form, setForm] = useState({
		name: "",
	});
	const [form2, setForm2] = useState({
		password: "",
		password2: "",
	});
	const handleModalOpen = () => {
		setIsModalVisible2(true);
		setForm2({ password: "", password2: "" });
	};
	const handleModalClose = () => {
		setIsModalVisible2(false);
	};

	const handleModal = () => setIsModalVisible(() => !isModalVisible);
	const [userData, setUserData] = useState();
	const [load, setLoad] = useState(false);
	const { Logout } = useContext(AuthContext);
	const getUserData = () => {
		setLoad(false);
		instance
			.post("/current-user-data/")
			.then((res) => {
				setUserData(res.data[0]);
				setLoad(true);
			})
			.catch((error) => {
				setLoad(true);
				console.error(error);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	const signOut = () => {
		instance
			.post("/logout/")
			.then(() => {
				// Handle the response
				Alert.alert("You're disconnected", "See you soon !", [
					{
						text: "Ok",
						onPress: () => Logout(),
						style: "default",
					},
				]);
			})
			.catch((error) => {
				// Handle errors
				console.error(error);
			})
			.finally(() => {
				// Eject the interceptor to prevent it from affecting other requests
				axios.interceptors.request.eject(IntercepRq);
				axios.interceptors.response.eject(IntercepRep);
			});
	};
	if (load==false) {
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
						Your profile is loading...
					</Text>
					<ActivityIndicator size={32} color="#44C5DB" />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerContent}>
						<Image
							style={styles.avatar}
							source={require("../../assets/images/yaco-logo.png")}
							alt="App Logo"
							resizeMode="contain"
						/>

						<Text style={styles.name}>{userData?.name} </Text>
						<Text style={styles.userInfo}>{userData?.email} </Text>
					</View>
				</View>

				<View style={styles.body}>
					<View style={styles.item}>
						<View style={styles.iconContent}>
							<Text style={styles.info}>Modified full name</Text>
						</View>
						<View style={styles.infoContent}>
							<MaterialCommunityIcons
								color="#2F4F4F"
								name="arrow-right"
								size={30}
								onPress={() => {
									handleModal();
								}}
							/>
						</View>
					</View>

					{/* <View style={styles.item}>
						<View style={styles.iconContent}>
							<Text style={styles.info}>Modified password</Text>
						</View>
						<View style={styles.infoContent}>
							<MaterialCommunityIcons
								color="#2F4F4F"
								name="arrow-right"
								size={30}
								onPress={() => {
									handleModalOpen();
								}}
							/>
						</View>
					</View> */}

					<View style={styles.item}>
						<View style={styles.iconContent}>
							<Text style={styles.info}>Disconnect</Text>
						</View>
						<View style={styles.infoContent}>
							<MaterialCommunityIcons
								color="tomato"
								name="logout"
								size={30}
								onPress={() => {
									signOut();
								}}
							/>
						</View>
					</View>
					{/* FIRST MODAL */}
					<Modal isVisible={isModalVisible}>
						<View style={styles.form}>
							<View style={styles.input}>
								<Text style={styles.inputLabel}>Full name</Text>

								<TextInput
									autoCapitalize="none"
									autoCorrect={false}
									onChangeText={(name) => setForm({ ...form, name })}
									placeholderTextColor="#6b7280"
									style={styles.inputControl}
									value={form.name}
									placeholder={userData?.name}
								/>
							</View>

							<View style={styles.formAction}>
								<Pressable
									onPress={() => {
										// handle onPress
									}}
								>
									<View style={styles.btn}>
										<Text style={styles.btnText}>Submit</Text>
									</View>
								</Pressable>
								<Pressable
									onPress={() => {
										handleModal();
									}}
								>
									<View style={styles.btn2}>
										<Text style={styles.btnText}>Cancel</Text>
									</View>
								</Pressable>
							</View>
						</View>
					</Modal>

					<Modal isVisible={isModalVisible2}>
						{/* SECOND MODAL */}
						<View style={styles.form}>
							<View style={styles.input}>
								<Text style={styles.inputLabel}>Actual password</Text>

								<TextInput
									autoCorrect={false}
									onChangeText={(password) => setForm2({ ...form2, password })}
									placeholder="********"
									placeholderTextColor="#6b7280"
									style={styles.inputControl}
									secureTextEntry={true}
									value={form2.password}
								/>
							</View>
							<View style={styles.input}>
								<Text style={styles.inputLabel}>New password</Text>

								<TextInput
									autoCorrect={false}
									onChangeText={(password2) =>
										setForm2({ ...form2, password2 })
									}
									placeholder="********"
									placeholderTextColor="#6b7280"
									style={styles.inputControl}
									secureTextEntry={true}
									value={form2.password2}
								/>
							</View>

							<View style={styles.formAction}>
								<Pressable
									onPress={() => {
										// handle onPress
									}}
								>
									<View style={styles.btn}>
										<Text style={styles.btnText}>Submit</Text>
									</View>
								</Pressable>
								<Pressable
									onPress={() => {
										handleModalClose();
									}}
								>
									<View style={styles.btn2}>
										<Text style={styles.btnText}>Cancel</Text>
									</View>
								</Pressable>
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	header: {
		backgroundColor: "#44C5DB",
	},
	headerContent: {
		padding: 30,
		alignItems: "center",
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
	},
	name: {
		fontSize: 22,
		color: "#1D2A32",
		fontWeight: "600",
	},
	userInfo: {
		fontSize: 16,
		color: "#778899",
		fontWeight: "600",
	},
	body: {
		backgroundColor: "#FFFFFF",
		height: 500,
		alignItems: "center",
		paddingHorizontal: 16,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	infoContent: {
		paddingTop: 20,
	},
	iconContent: {
		flex: 1,
		paddingRight: 5,
	},

	info: {
		fontSize: 18,
		marginTop: 20,
		fontSize: 15,
		fontWeight: "400",
		color: "#222",
	},
	/** Form */
	form: {
		marginBottom: 24,
		paddingHorizontal: 24,
		justifyContent: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	formAction: {
		marginTop: 4,
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	/** Input */
	input: {
		marginBottom: 16,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "400",
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
	/** Button */
	btn: {
		alignItems: "center",
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderWidth: 1,
		backgroundColor: "#44C5DB",
		borderColor: "#44C5DB",
	},
	btn2: {
		alignItems: "center",
		borderRadius: 12,
		paddingVertical: 10,
		borderWidth: 1,
		backgroundColor: "tomato",
		borderColor: "tomato",
		paddingHorizontal: 15,
	},
	btnText: {
		fontSize: 18,
		lineHeight: 26,
		fontWeight: "600",
		color: "#fff",
	},
});

export default ProfileScreen;
