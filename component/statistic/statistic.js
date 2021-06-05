import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../header";
import { AllStats } from "./all_stats";
import { DropDownView } from "./dropdown_view";
import { colors } from "../../styles/style";
import { country_list as DATA } from "../../common/data";
import {
  getCurrentGlobalData,
  getCurrentDateCountryData,
} from "../../utils/functions";
import Loading from "../../common/loading_screen";
import PieChartComponent from "../../common/pie_chart";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

class Statistic extends Component {
  state = {
    yesterday_data: "",
    date: new Date().toLocaleDateString(),
    total: "",
    selected_item: "Global",
    loading: true,
    refreshing: false,
  };

  handleSelect = async (selected_item) => {
    this.setState({ selected_item, loading: true });
    if (selected_item === "Global") {
      this.setState({ loading: false });
      return this.setGlobalData();
    }
    const data = await getCurrentDateCountryData(selected_item);
    if (data != undefined && !data.err) {
      this.setState({ loading: false });
      return this.setState({ total: data });
    }
    return console.log("server error");
  };

  setGlobalData = async () => {
    const data = await getCurrentGlobalData();
    if (!data.err) this.setState({ total: data });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    const { selected_item } = this.state;
    wait(2000).then(() => {
      this.handleSelect(selected_item);
      this.setState({ refreshing: false });
    });
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.setGlobalData();
    this.setState({ loading: false });
  }

  render() {
    const { date, loading, total, yesterday_data } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#152a73"
          translucent={true}
          hidden={false}
        ></StatusBar>
        <View style={styles.upper}>
          <Header drawer_navigation={this.props.drawer_navigation} />
          <DropDownView
            date={date}
            handleSelect={this.handleSelect}
            data={DATA}
          />
          <View id="horizontal_line" style={styles.horizontal_line}></View>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View>
              {loading ? (
                <Loading width={100} height={100} />
              ) : (
                <AllStats data={total} />
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.lower}>
          <View style={{ display: "flex" }} id="chart">
            {loading ? (
              <Loading width={100} height={100} />
            ) : (
              <PieChartComponent data={total} />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 24,
  },
  upper: {
    flex: 1.2,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  horizontal_line: { height: 1, marginTop: 6, backgroundColor: "#5c5c5c" },
  lower: {
    flex: 1,
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  item: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  title: {
    paddingHorizontal: 20,
  },
});

export default Statistic;
