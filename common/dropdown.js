import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Item({ title, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(title)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

class DropDown extends Component {
  state = {
    selected_item: this.props.selected_item,
    list_view: false,
    DATA: this.props.data,
  };

  toggleView = () => {
    let list_view = !this.state.list_view;
    this.setState({ list_view });
  };

  onSelect = (selected_item) => {
    this.setState({ selected_item });
    this.toggleView();
    try {
      if (selected_item !== "Choose country")
        this.props.handleSelect(selected_item);
    } catch (error) {
      console.log("You have to pass the function that handled on select");
    }
  };

  render() {
    const { selected_item, list_view, DATA } = this.state;

    return (
      <View id="conatiner">
        <View id="dropdown_button_view">
          <TouchableOpacity
            id="dropdown_button"
            onPress={this.toggleView}
            style={styles.dropdown_button}
          >
            <View id="counrty_view">
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {selected_item}
              </Text>
            </View>
            <View id="arrow">
              <Ionicons
                name="md-arrow-dropdown"
                style={{ marginTop: -2.5 }}
                color={"white"}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View id="item_list_view" style={styles.item_list_view}>
          <FlatList
            style={{
              ...styles.flat_list,
              display: list_view ? "flex" : "none",
            }}
            data={DATA}
            renderItem={({ item }) => (
              <Item title={item.title} onSelect={this.onSelect} handleView />
            )}
            keyExtractor={(item) => item.ISO2}
            initialNumToRender={5}
            removeClippedSubviews={false}
            windowSize={5}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_list_view: {
    backgroundColor: "#f5f3f2",
    borderRadius: 1,
    zIndex: 1,
    position: "absolute",
  },
  dropdown_button: {
    display: "flex",
    flexDirection: "row",
    width: 130,
    justifyContent: "space-between",
  },
  flat_list: {
    height: 150,
  },
  item: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingVertical: 7,
  },
  title: {
    paddingHorizontal: 20,
  },
});

export default DropDown;
