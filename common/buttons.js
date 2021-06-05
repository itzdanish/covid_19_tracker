import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/style";

export const CustomButton = (props) => {
  const { name, icon, type, handleClick } = props;
  return (
    <TouchableOpacity
      onPress={() => handleClick()}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: type,
        width: Math.floor(Dimensions.get("window").width / 2.3),
        borderRadius: 30,
        height: 50,
        overflow: "hidden",
        paddingHorizontal: 20,
      }}
    >
      <Ionicons name={icon} size={30} color="white" />
      <Text
        style={{
          marginLeft: 10,
          marginBottom: 2,
          fontSize: 17,
          color: "white",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
