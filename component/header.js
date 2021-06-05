import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const Bar = ({ width, height }) => (
  <View style={{ ...styles.bar, width, height }}></View>
);

class Header extends Component {
  render() {
    const { drawer_navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ display: "flex", width: 40 }}
          onPress={() => drawer_navigation.openDrawer()}
        >
          <Bar width={35} height={4} />
          <Bar width={30} height={4} />
          <Bar width={25} height={4} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  bar: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
  },
});

export default Header;
