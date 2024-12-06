import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/reducers/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { handleDeleteProduct } from "@/services/useDeleteProduct";

export default function Profile() {
  const [SignedIn, setSignedIn] = React.useState(true);
  const colorScheme = useColorScheme();
  const isDark = Colors[colorScheme ?? "light"];
  const user = useSelector((state: any) => state.user);
  const itemRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        await axios.post(
          `${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth/check-token`,
          {
            token: token,
          }
        );
      } catch (error) {
        console.log(error);
        setSignedIn(false);
      }
      const decodedToken = jwtDecode<JwtPayload>(token as string);
      dispatch(fetchUser({ userId: Number(decodedToken.sub) }) as any);
    })();
  }, []);

  const handleDelete = async (id: number) => {
    const deleted = await handleDeleteProduct(id);
    if (deleted) {
      dispatch(fetchUser({ userId: Number(user?.data?.id) }) as any);
    }
  }
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: isDark.background }]}
    >
      <View style={styles.header}>
        {user?.data?.avatar !== "null" ? (
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
        <View>
          <Text style={[styles.title, { color: isDark.text }]}>
            {user?.data?.fullName}
          </Text>
          <Text
            style={[styles.text, { color: isDark.text, fontWeight: "bold" }]}
          >
            {user?.data?.products?.length}{" "}
            <Text style={{ color: "gray" }}>products</Text>
          </Text>
        </View>
      </View>
      <View style={styles.edit}>
        <MaterialIcons
          name="edit"
          size={14}
          color={isDark.text}
          // onPress={() => router.push("/auth/edit-profile")}
        />

        <Text style={[styles.text, { color: isDark.text, fontSize: 12 }]}>
          Edit Profile
        </Text>
      </View>

      <View style={styles.products}>
        <Text style={[styles.text, { color: isDark.text, paddingLeft: 16 }]}>
          My Products
        </Text>
        <Animated.FlatList
          contentContainerStyle={[styles.list, {}]}
          itemLayoutAnimation={FadeInDown}
          ref={itemRef}
          keyExtractor={(item, index) => item.id}
          data={user?.data?.products}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image[0] }}
                style={{ width: 60, height: 60, borderRadius: 6 }}
                resizeMode="contain"
              />
              <Text style={[styles.text, { color: isDark.text }]}>
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", gap: 4, marginRight: -20 }}>
                <MaterialIcons name="edit" size={24} color={isDark.text} />
                <MaterialIcons
                  name="delete-forever"
                  size={24}
                  color={"#f0000d"}
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    height: 150,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  edit: {
    alignSelf: "baseline",
    marginLeft: 16,
    flexDirection: "row",
    gap: 4,
    padding: 3,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#b5b5b5",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  list: {
    gap: 8,
    paddingBottom: 250,
  },
  card: {
    height: 80,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    fontSize: 38,
    backgroundColor: "#b5b5b5",
    color: "#fff",
    width: 100,
    height: 100,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 100,
    fontFamily: "Poppins_500Medium",
  },
  products: {
    marginTop: 22,
    padding: 4,
    gap: 10,
    height: "100%",
  },
});
