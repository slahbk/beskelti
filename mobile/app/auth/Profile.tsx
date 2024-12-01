import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/reducers/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function Profile() {
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode<JwtPayload>(token as string);
      dispatch(fetchUser({ userId: Number(decodedToken.sub) }) as any);
    })();
  }, []);
  return (
    <Animated.ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark.background },
      ]}
    >
      <View style={styles.background}>
        {user?.data?.avatar !== "" ? (
          <Image
            source={{ uri: user?.data?.avatar }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
            resizeMode="cover"
          />
        ) : (
          <Text style={[styles.avatar]}>
            {(
              user?.data?.fullName?.split(" ")[0][0] +
              user?.data?.fullName?.split(" ")[1][0]
            ).toUpperCase()}
          </Text>
        )}
        <Text style={[styles.text, { color: isDark.text }]}>
          {user?.data?.fullName}
        </Text>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    marginTop: 50,
    height: 150,
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  avatar: {
    fontSize: 26,
    backgroundColor: "#b5b5b5",
    color: "#fff",
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 50,
    fontFamily: "Poppins_500Medium",
  },
});
