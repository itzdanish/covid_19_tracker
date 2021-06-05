import React, { Component } from "react";
import { View, StyleSheet, Text, Linking, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./header";
import { colors } from "../styles/style";
import Loading from "../common/loading_screen";

const AboutView = ({ header, content, url }) => {
  return (
    <View style={{}}>
      <View id="about_header" style={{ flexDirection: "row", padding: 10 }}>
        <Text style={{ fontWeight: "bold", letterSpacing: 0.7, fontSize: 23 }}>
          {header}
        </Text>
        <Ionicons
          style={{ marginLeft: 30, marginTop: 6 }}
          name="ios-arrow-down"
          color={"grey"}
          size={20}
        />
      </View>
      <View
        style={{ borderBottomColor: "grey", borderBottomWidth: 0.3 }}
      ></View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text
          onPress={() => Linking.openURL(url)}
          style={{ color: "#4e5450", letterSpacing: 0.7, fontSize: 20 }}
        >
          {`${content} click to visit`}
        </Text>
      </View>
    </View>
  );
};

const abouts = [
  {
    about: "News API",
    content: "Top headlines news is provided by google news.",
    url: "https://newsapi.org/docs/get-started",
  },
  {
    about: "Covid19 statistic API",
    content:
      "The stats of covid19 cases are provided by covid-19-apis-postman.",
    url: "https://covid-19-apis.postman.com/",
  },
  {
    about: "Source code",
    content: "You can download whole source code from Github",
    url: "https://github.com/itzdanish/covid_19_tracker",
  },
  {
    about: "Future scope",
    content: "1. Add phone for other countries \n2. Self assesment algorithm",
    url: "https://github.com/itzdanish/covid_19_tracker",
  },
  {
    about: "Bug",
    content:
      "1. After visiting self assement then changing screen to home does not work \n2. Pie chart does not load properly",
    url: "https://github.com/itzdanish/covid_19_tracker",
  },
];

class InfoScreen extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <Header drawer_navigation={this.props.drawer_navigation} />
          <Text style={styles.upper_view_text_1}>About</Text>
        </View>
        {loading ? (
          <Loading width={100} height={100} />
        ) : (
          <ScrollView>
            {abouts.map((about) => {
              return (
                <AboutView
                  key={about.about}
                  header={about.about}
                  content={about.content}
                  url={about.url}
                />
              );
            })}

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 10,
                paddingTop: 100,
              }}
            >
              <Text
                onPress={() =>
                  Linking.openURL("https://github.com/itzdanish")
                }
                style={{ fontSize: 15, color: "grey" }}
              >
                https://github.com/itzdanish
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
  },
  upper: {
    backgroundColor: colors.primary,
    padding: 17,
  },
  upper_view_text_1: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default InfoScreen;
