import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./header";
import CheckUp from "./check_up";
import SelfAssesment from "./self_assesment/self_assesment";
import ContactToDepartment from "./contact_to_department";
import PreventionView from "./prevention_view";
import { colors } from "../styles/style";
import Loading from "../common/loading_screen";
const TempHome = ({ navigation, drawer_navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#adadaa"
        translucent={true}
        hidden={false}
      ></StatusBar>
      <View style={styles.upper}>
        <Header drawer_navigation={drawer_navigation} />
        <ContactToDepartment />
      </View>
      <View style={styles.lower}>
        <PreventionView />
        <CheckUp navigation={navigation} />
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

class HomeScreen extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    const { drawer_navigation } = this.props;
    const { loading } = this.state;
    const TempHomeComponent = (props) => (
      <TempHome {...props} drawer_navigation={drawer_navigation} />
    );
    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <Loading width={100} height={100} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="TempHome"
              component={TempHomeComponent}
            />
            <Stack.Screen
              options={{ title: "Self Assesment" }}
              name="SelfAssesment"
              component={SelfAssesment}
            />
          </Stack.Navigator>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
  },
  upper: {
    backgroundColor: colors.primary,
    flex: 1,
    padding: 15,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  lower: {
    flex: 1.3,
  },
});

export default HomeScreen;
