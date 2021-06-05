import React from "react";
import { View, Linking, Image, BackHandler, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/style";

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <View
        id="stay_home_image"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={{ width: 140, height: 140 }}
          source={require("../assets/prevention/stay_home.png")}
        />
      </View>

      <DrawerItem
        label="Home"
        labelStyle={styles.drawer_label}
        icon={() => (
          <Ionicons name="md-home" size={23} color={colors.primary} />
        )}
        onPress={() => navigation.navigate("Home")}
      />
      <DrawerItem
        label="FAQS"
        labelStyle={styles.drawer_label}
        icon={() => (
          <MaterialCommunityIcons
            name="frequently-asked-questions"
            size={20}
            color={colors.primary}
          />
        )}
        onPress={() => Linking.openURL("https://www.mohfw.gov.in/pdf/FAQ.pdf")}
      />
      <DrawerItem
        label="Exit"
        labelStyle={styles.drawer_label}
        icon={() => (
          <Ionicons name="md-exit" size={20} color={colors.primary} />
        )}
        onPress={() => BackHandler.exitApp()}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer_label: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.primary,
  },
});

export default CustomDrawerContent;
