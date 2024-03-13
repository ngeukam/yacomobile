import React from "react";
import { StyleSheet, Image } from "react-native";

export default function ChoiseMobileOperators(x) {
	const digits = x.split("");
	const list_three_digits = digits.slice(0, 3);
	const list_two_digits = digits.slice(0, 2);
	const firstthree_digits = parseInt(list_three_digits.join(""));
	const two_digits = parseInt(list_two_digits.join(""));

	if (firstthree_digits >= 655 && firstthree_digits <= 659) {
		return (
			<>
				<Image
					source={require("../../assets/images/om.png")}
					// D:\yaco_mobile\yaco\assets\images\orange.png
					alt="App Logo"
					nresizeMode="contain"
					style={styles.headerImg}
				/>
			</>
		);
	} else if (firstthree_digits >= 690 && firstthree_digits <= 699) {
		return (
			<>
				<Image
					source={require("../../assets/images/om.png")}
					alt="App Logo"
					nresizeMode="contain"
					style={styles.headerImg}
				/>
			</>
		);
	} else if (firstthree_digits >= 650 && firstthree_digits <= 654) {
		return (
			<>
				<Image
					source={require("../../assets/images/momo.jpeg")}
					alt="App Logo"
					nresizeMode="contain"
					style={styles.headerImg}
				/>
			</>
		);
	} else if ((firstthree_digits >= 670) & (firstthree_digits <= 679)) {
		return (
			<>
				<Image
					source={require("../../assets/images/momo.jpeg")}
					alt="App Logo"
					nresizeMode="contain"
					style={styles.headerImg}
				/>
			</>
		);
	}  else if (two_digits == 66) {
		return (
			<>
				<Image
					source={require("../../assets/images/nexttel.jpeg")}
					alt="App Logo"
					nresizeMode="contain"
					style={styles.headerImg}
				/>
			</>
		);
	}
}
const styles = StyleSheet.create({
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
});
