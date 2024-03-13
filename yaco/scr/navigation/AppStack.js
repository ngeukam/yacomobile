import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransactionScreen from "../screens/Transactionscreen";
import HistoryScreen from "../screens/Historyscreen";
import ProfileScreen from "../screens/Profilescreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const AppStack = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: true,
				tabBarShowLabel: true,
				// tabBarStyle: { backgroundColor: '#FFF'},
				tabBarInactiveTintColor: "#2F4F4F",
				tabBarActiveTintColor: "#44C5DB",
			}}
		>
			<Tab.Screen
				name="Send Credit"
				component={TransactionScreen}
				options={() => ({
					// tabBarStyle: {
					//   backgroundColor: '#FFFF',
					// },
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="bank-transfer-out"
							color={color}
							size={40}
						/>
					),
					headerShown: false,
				})}
			/>
			<Tab.Screen
				name="History"
				component={HistoryScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="history" color={color} size={40} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="account-outline"
							color={color}
							size={40}
						/>
					),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppStack;
