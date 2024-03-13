import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SwipeButton from "rn-swipe-button";
import arrowRight from "../../assets/images/arrow-right.png";

export default function Testscreen() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFF",
				paddingTop:50
			}}
		>
			<View style={styles.container}>
				<View
					style={{
						backgroundColor: "#F5F5F5",
						justifyContent: "center",
						paddingHorizontal: 5,
						borderRadius: 10,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							// marginBottom: 54,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View>
							<Image
								source={require("../../assets/images/carton.jpg")}
								resizeMode="contain"
								style={styles.headerImg}
							/>
						</View>
						<View style={{ flexDirection: "column" }}>
							<View style={{ flexDirection: "row", marginBottom: 15 }}>
								<MaterialCommunityIcons
									color="#44C5DB"
									name="weight"
									size={25}
								/>
								<Text
									style={{ fontSize: 17, fontWeight: "500", color: "#222" }}
								>
									100kg
								</Text>
							</View>
							<Text style={{ fontSize: 14, fontWeight: "400", color: "#222" }}>
								Réf: CUJDLJUE
							</Text>
						</View>
					</View>

					<View style={{ flexDirection: "row", marginBottom: 16 }}>
						<View style={{ flexDirection: "column", flexGrow: 2 }}>
							<View
								style={{
									flexDirection: "row",
									marginBottom: 16,
									justifyContent: "flex-start",
								}}
							>
								<View
									style={{ justifyContent: "flex-end", alignItems: "center" }}
								>
									<MaterialCommunityIcons
										color="green"
										name="map-marker-right"
										size={30}
									/>
									<Text
										style={{ fontSize: 17, fontWeight: "400", color: "#222" }}
									>
										Bonaberie...
									</Text>
								</View>
								<View
									style={{
										justifyContent: "flex-end",
										alignItems: "center",
										paddingLeft: 30,
									}}
								>
									<MaterialCommunityIcons
										color="tomato"
										name="flag-checkered"
										size={30}
									/>
									<Text
										style={{ fontSize: 17, fontWeight: "400", color: "#222" }}
									>
										Bonaberie...
									</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "flex-start",
								}}
							>
								<View>
									<Text
										style={{
											fontSize: 17,
											fontWeight: "400",
											color: "#222",
										}}
									>
										Qté:10
									</Text>
								</View>
								<View style={{ paddingLeft: 100 }}>
									<MaterialCommunityIcons
										color="#000"
										name="car"
										size={30}
										//truck-outline
										//taxi
										//car
									/>
								</View>
							</View>
						</View>

						<View
							style={{
								flexDirection: "column",
								// flexGrow: 2,
								alignItems: "center",
							}}
						>
							<View
								style={{
									justifyContent: "flex-end",
									marginBottom: 25,
									alignItems: "center",
								}}
							>
								<MaterialCommunityIcons color="#a493d6" name="cash" size={30} />
								<Text
									style={{ fontSize: 15, fontWeight: "500", color: "#222" }}
								>
									13.000 xaf
								</Text>
							</View>
							<View>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "500",
										color: "#000",
										// fontFamily: "Roboto-Regular",
										textDecorationLine: "underline"
									}}
								>
									Détails
								</Text>
							</View>
						</View>
						{/* <View
							style={{ flexDirection: "column", alignItems: "center" }}
						></View> */}
					</View>
					<View
						style={{
							flexDirection: "row",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<View>
							<SwipeButton
								disabled={false}
								//disable the button by doing true (Optional)
								swipeSuccessThreshold={100}
								height={30}
								//height of the button (Optional)
								width={150}
								//width of the button (Optional)
								title="Accepté"
								titleStyles={{
									fontSize: 15,
									fontWeight: "500",
									color: "#FFF",
									// textAlign: "right",
								}}
								//Text inside the button (Optional)
								//thumbIconImageSource={thumbIcon}
								//You can also set your own icon (Optional)
								onSwipeSuccess={() => {
									alert("Submitted Successfully!");
								}} //After the completion of swipe (Optional)
								thumbIconImageSource={arrowRight}
								railFillBackgroundColor="rgba(0, 0, 0, 0.5)" //(Optional)
								railFillBorderColor="rgba(0, 0, 0, 0.5)" //(Optional)
								thumbIconBackgroundColor="#FFFFFF" //(Optional)
								thumbIconBorderColor="#FFFFFF" //(Optional)
								railBackgroundColor="#a493d6" //(Optional)
								railBorderColor="#CCC" //(Optional)
							/>
						</View>
					</View>
				</View>
			</View>
			
		</SafeAreaView>
	);
}

// export default Testscreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		// paddingTop: 50,
		marginBottom: 15,
	},
	headerImg: {
		width: 80,
		height: 80,
		borderRadius: 15,
		// position: "absolute",
	},
});
