import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDown from "../../common/dropdown";
import { colors } from "../../styles/style";
export const DropDownView = (props) => {
  const { handleSelect, date, data } = props;
  return (
    <View id="dropdown_view" style={styles.dropdown_view}>
      <View id="dropdown" style={{ flex: 1 }}>
        <DropDown
          data={data}
          selected_item={"Choose country"}
          handleSelect={handleSelect}
        />
      </View>
      <View id="date_view" style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            marginRight: 20,
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown_view: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
});
