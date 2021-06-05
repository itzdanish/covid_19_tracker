import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { colors } from "../styles/style";
import DATA from "../common/news.json";
import Header from "./header";
import Loading from "../common/loading_screen";
const not_available_image = `https://dummyimage.com/200x300&text=Not Available`;
const not_available_msg = "Something is wrong";
import moment from "moment";

const Article = ({ article }) => {
  let { title, urlToImage, publishedAt, author, url } = article;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      style={styles.article}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.img}
            source={{
              uri: urlToImage || not_available_image,
            }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text id="title" style={styles.title}>
            {" "}
            {title || not_available_msg}
          </Text>
          <View style={styles.author_and_date_view}>
            <Text style={styles.author_and_date_view_text}>{author}</Text>
            <Text style={styles.author_and_date_view_text}>
              {moment(publishedAt).format(`YYYY-MM-DD`)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class NewsScreen extends Component {
  state = {
    articles: "",
    loading: true,
    refreshing: false,
    to: 5,
  };

  getNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?q=coronavirus&country=in&language=en&apiKey=c98d6da6d5bf489d83cda829cc7b0594"
      );
      return await response.json();
    } catch (error) {
      throw new Error("Some thing is wrong");
    }
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const news = await this.getNews();
    this.setState({ articles: news.articles.slice(0, 5) });
    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 5000);

    this.setState({ loading: false });
  }

  handleLoadMore = (to) => {
    this.setState({ loading: true });
    let more_aricles = DATA.articles.slice(to, to + 5);
    let articles = this.state.articles.concat(more_aricles);
    this.setState({ to: to + 5, articles, loading: false });
  };

  render() {
    const { loading, articles, to } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <Header drawer_navigation={this.props.drawer_navigation} />
          <Text style={styles.upper_view_text_1}>News</Text>
        </View>

        <View style={styles.lower}>
          {loading ? (
            <Loading width={100} height={100} />
          ) : (
            <FlatList
              data={articles}
              renderItem={({ item }) => <Article article={item} />}
              keyExtractor={(item) => item.publishedAt}
              initialNumToRender={5}
              onEndReachedThreshold={10}
              onEndReached={() => this.handleLoadMore(to)}
            />
          )}
        </View>
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
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  upper_view_text_1: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
    alignSelf: "center",
    marginTop: 10,
  },
  lower: {
    flex: 8,
  },
  article: {
    padding: 10,
    borderWidth: 0.5,
    borderBottomColor: "grey",
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.3,
    color: "#2e2d2d",
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  author_and_date_view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  author_and_date_view_text: {
    color: "grey",
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});

export default NewsScreen;
