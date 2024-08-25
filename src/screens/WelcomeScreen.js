import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";


export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 2500)
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      <StatusBar style="light" />
      <ImageBackground source={require("../../assets/welcome.png")} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }} className="w-full">

      <Animated.View entering={FadeIn.delay(250)} className="flex justify-center items-center h-screen px-4">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(6) }}
        >
          News App
        </Text>
        <Text
          className="font-medium text-white tracking-widest capitalize mb-6"
          style={{ fontSize: hp(3) }}
        >
          Terpercaya, Terlengkap, Teraktual
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} className="bg-white px-2.5 py-1.5 rounded-md">
          <Text className="text-neutral-700 font-semibold" style={{ fontSize: hp(2.5) }}>Baca Sekarang</Text>
        </TouchableOpacity>
      </Animated.View>

      </ImageBackground>
    </View>
  );
}
