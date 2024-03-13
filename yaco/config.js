import axios from "axios";
import { Platform, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";

export const instance = axios.create();

export const IntercepRq = instance.interceptors.request.use(async (config) => {
	const authToken = await SecureStore.getItemAsync("authToken");
	if (authToken) {
		config.headers.Authorization = `Bearer ${authToken}`;
	}
	config.baseURL = `http://${localhost}:8000`;
	return config;
});

// Response interceptor for API calls
export const IntercepRep = instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const access_token = await SecureStore.getItemAsync("refreshToken");
			axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
			return instance(originalRequest);
		} else if (error.response?.status === 401) {
			// Handle not found errors
			console.log("Not Authorized");
			Alert.alert("Not Authorized", "You are not Authorized", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else if (error.response?.status === 404) {
			// Handle not found errors
			console.log("Not found");
			Alert.alert("Not found", "Is not found", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		} else {
			// console.error("An error occurred:", error);
			Alert.alert("Error", "Something is wrong", [
				{
					text: "Ok",
					onPress: () => console.log("Ok Pressed"),
					style: "default",
				},
			]);
		}
		return Promise.reject(error);
	}
);

export const generateToken = () => {
	const randomNum = Math.random() * 9000;
	return Math.floor(1000 + randomNum);
};


// import ContactsWrapper from 'react-native-contacts-wrapper';

// export async function getPhoneNumber() {
//     // on android we need to explicitly request for contacts permission and make sure it's granted
//     // before calling API methods
//     if (Platform.OS === 'android') {
//       const request = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//       );

//       // denied permission
//       if (request === PermissionsAndroid.RESULTS.DENIED) throw Error("Permission Denied");

//       // user chose 'deny, don't ask again'
//       else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) throw Error("Permission Denied");
//     }

//     // Here we are sure permission is granted for android or that platform is not android
//     ContactsWrapper.getContact()
//     .then((contact) => {
//         // Replace this code
//         // this.setState({
//         //     importingContactInfo:true,
//         //     guest:contact.name,
//         //     email:contact.email,
//         //     phone:contact.phone
//         // });
//         console.log(contact);
//     })
//     .catch((error) => {
//         console.log("ERROR CODE: ", error.code);
//         console.log("ERROR MESSAGE: ", error.message);
//     });
// }

{
	/*ADD THIS TO ANDROID MANIFEST.XML <uses-permission android:name="android.permission.READ_PROFILE" />   
<uses-permission android:name="android.permission.READ_CONTACTS" />  
<uses-permission android:name="android.permission.WRITE_CONTACTS" /> */
}

//LIEN A SUIVRE https://github.com/LynxITDigital/react-native-contacts-wrapper?tab=readme-ov-file
