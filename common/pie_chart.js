import React, { Component } from "react";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { colors } from "../styles/style";
import Loading from "./loading_screen";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const names = ["Total Confirmed", "Total Recovered", "Total Death"];
const color_of_pie = [colors.affected, colors.recover, colors.death];

export default class PieChartComponent extends Component {
  state = {
    data: "",
    loading: true,
  };
  componentDidMount() {
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = this.props.data;
    const recieved_data = [];
    recieved_data.push(TotalConfirmed);
    recieved_data.push(TotalRecovered);
    recieved_data.push(TotalDeaths);

    console.log(recieved_data[0]);
    let data = [];
    names.forEach((name, index) => {
      data.push({
        name,
        cases: recieved_data[index],
        color: color_of_pie[index],
      });
    });
    if (TotalConfirmed !== undefined) this.setState({ data, loading: false });
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <PieChart
        data={this.state.data}
        width={Dimensions.get("screen").width}
        height={Dimensions.get("screen").width / 1.5}
        chartConfig={chartConfig}
        accessor="cases"
        paddingLeft={Dimensions.get("screen").width / 4}
        backgroundColor="transparent"
        hasLegend={false}
      />
    );
  }
}
