import React, { useState, useEffect } from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text } from "react-native";

const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("/Users/micahglausier/careerfoundry/Chat-Demo/fonts/Poppins/Poppins-Regular.ttf"),
          // Add other font variants if needed
        });
        setFontLoaded(true);
      } catch (error) {
        console.log("Error loading fonts", error);
      }
    }
    loadFonts();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBYlOq9fOUr16zb6fpw2U0iWJ7s64wcHO0",
    authDomain: "chat-app-5c98e.firebaseapp.com",
    projectId: "chat-app-5c98e",
    storageBucket: "chat-app-5c98e.appspot.com",
    messagingSenderId: "318542091129",
    appId: "1:318542091129:web:ab5871ea5da2669cb4d5a8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
});
export default App;

