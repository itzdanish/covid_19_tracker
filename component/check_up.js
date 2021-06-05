import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/style";

const CheckUp = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SelfAssesment")}
      style={styles.container}
    >
      <View id="check_up_view" style={styles.check_up_view}>
        <View id="image_view" style={{ flex: 1 }}>
          <Image
            style={{ width: 180, height: 180, marginLeft: -40, marginTop: -40 }}
            source={require("../assets/prevention/eeee.png")}
          />
        </View>
        <View id="msg_view" style={{ flex: 2 }}>
          <Text style={styles.msg_view_text_1}>Do your own test</Text>
          <Text style={styles.msg_view_text_2}>
            Follow the intstuction to do your own test
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  check_up_view: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.primary,
    marginHorizontal: 10,
    borderRadius: 10,
    height: Math.floor(Dimensions.get("window").height) / 6,
    marginTop: 20,
  },
  msg_view_text_1: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.5,
    fontSize: 16.5,
    marginTop: 10,
  },
  msg_view_text_2: {
    color: colors.paragraph,
    letterSpacing: 0.5,
    fontSize: 14,
    marginTop: 5,
  },
});

export default CheckUp;
