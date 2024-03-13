import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	StatusBar,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { instance } from "../../config";

const HistoryScreen = () => {
	const [load, setLoad] = useState(false);
	const [usertransaction, setUserTransaction] = useState(undefined);

	const getUserTransaction = () => {
		setLoad(false);
		instance
			.post("/current-user-transaction/")
			.then((res) => {
				setUserTransaction(res.data[0]);
				setLoad(true);
			})
			.catch((error) => {
				setLoad(true);
				console.error(error);
			});
	};

	useEffect(() => {
		getUserTransaction();
	}, []);

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
						History is loading...
					</Text>
					<ActivityIndicator size={32} color="#44C5DB" />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
				<View style={styles.container}>
					<KeyboardAwareScrollView>
						<View style={styles.cardlist}>
							{usertransaction?.transaction_status ? (
                usertransaction?.map((item) =>
                <>
									<View style={styles.blocktext}>
										<MaterialCommunityIcons name="moon-full" color="green" />
										<Text style={{ fontFamily: "Roboto-Bold" }}> Success </Text>
									</View>
									<Text
										style={styles.text}
									>{`Mobile money number ${item?.mobile_money_number} transfert succesfully ${item?.amout} XAF to ${item?.recipient_number} at ${item?.created_at}`}</Text>
								</>
                )
								
							) : (
                usertransaction?.map((item) =>
								<>
									<View style={styles.blocktext}>
										<MaterialCommunityIcons name="moon-full" color="tomato" />
										<Text style={{ fontFamily: "Roboto-Bold" }}> Failed </Text>
									</View>
									<Text
										style={styles.text}
									>{`Mobile money number ${item?.mobile_money_number} transfert failed ${item?.amout} XAF to ${item?.recipient_number} at ${item?.created_at}`}</Text>
								</>
                )
							)}
						</View>
					</KeyboardAwareScrollView>
				</View>
			</SafeAreaView>
		);
	}
};

export default HistoryScreen;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		paddingHorizontal: 0,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	cardlist: {
		flexDirection: "flex-end",
		paddingHorizontal: 24,
	},

	blocktext: {
		marginBottom: 40,
		flexDirection: "row",
		marginBottom: 2,
	},
	text: {
		paddingHorizontal: 1,
		marginBottom: 10,
		fontFamily: "Roboto-Regular",
	},
});
