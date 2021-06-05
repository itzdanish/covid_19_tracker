import React from "react";
import { Text, StyleSheet } from "react-native";
import { onSelect } from "./functions";

const Option = ({ option, handleSelect, handleDisplay }) => {
  return (
    <Text
      key={option}
      style={styles.option}
      onPress={() => {
        onSelect(option, handleSelect);
        handleDisplay(true);
      }}
    >
      {option}
    </Text>
  );
};

const styles = StyleSheet.create({
  option: {
    backgroundColor: "white",
    padding: 10,
    borderColor: "#e8e8e3",
    borderWidth: 1,
    borderRadius: 5,
    textTransform: "capitalize",
    letterSpacing: 0.5,
    fontWeight: "900",
  },
});

export default Option;
