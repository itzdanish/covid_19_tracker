import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/style";
const SingleStats = (props) => {
  return (
    <View
      style={{
        ...styles.single_stats_view,
        backgroundColor: colors[props.color],
      }}
    >
      <Text style={styles.single_stats_view_text_1}>{props.num_of_case}</Text>
      <Text style={styles.single_stats_view_text_2}>{props.name}</Text>
    </View>
  );
};

export const AllStats = (props) => {
  const { data } = props;
  const { TotalConfirmed, TotalDeaths, TotalRecovered, NewRecovered } = data;

  return (
    <View style={{ display: "flex" }}>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <SingleStats
          name={"affected"}
          color={"affected"}
          num_of_case={TotalConfirmed}
        />
        <SingleStats name={"death"} color={"death"} num_of_case={TotalDeaths} />
      </View>

      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <SingleStats
          name={"recover"}
          color={"recover"}
          num_of_case={TotalRecovered}
        />
        <SingleStats
          name={"active"}
          color={"active"}
          num_of_case={TotalConfirmed - (TotalRecovered + TotalDeaths)}
        />
        <SingleStats
          name={"new recovered"}
          color={"new_recovered"}
          num_of_case={NewRecovered}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  single_stats_view: {
    flex: 1,
    marginRight: 7,
    height: 100,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  single_stats_view_text_1: {
    color: "white",
    fontSize: 19,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  single_stats_view_text_2: {
    textTransform: "capitalize",
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
