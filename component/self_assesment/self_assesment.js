import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GiftedChat, Day } from "react-native-gifted-chat";
import { colors } from "../../styles/style";
import { questions } from "../self_assesment/questions";
import Option from "./option";

let answer_storage = [];
let question_number = 0;

const Bubble = ({ data, handleSelect }) => {
  const [display, setDisplay] = useState(false);
  const { currentMessage } = data;
  const { options } = currentMessage;
  const { _id } = currentMessage.user;

  const text_color = _id == 1 ? "black" : "white";
  const background_color = _id == 1 ? "#e8e8e3" : colors.primary;
  const border_radius_style = _id == 1 ? "top_end_radius" : "top_start_radius";

  return (
    <View
      style={{
        width: Dimensions.get("screen").width / 1.3,
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <View
        style={{
          ...styles.message_view,
          backgroundColor: background_color,
          ...styles[border_radius_style],
        }}
      >
        <Text
          style={{
            ...styles.message_text,
            color: text_color,
          }}
        >
          {currentMessage.text}
        </Text>
      </View>

      <View
        style={{ ...styles.option_view, display: display ? "none" : "flex" }}
      >
        {_id === 2
          ? options.map((option) => (
              <Option
                option={option}
                key={option}
                handleSelect={handleSelect}
                handleDisplay={setDisplay}
              />
            ))
          : null}
      </View>
    </View>
  );
};

export default class SelfAssesment extends React.Component {
  state = {
    messages: [],
    disable: "",
  };

  toggleInputToolBox = (type_of_input) => {
    let disable = type_of_input !== "radio" ? false : true;
    this.setState({ disable });
  };

  appendMessage = (message) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  };

  calculateRisk = () => {
    this.appendMessage({
      _id: new Date().getTime(),
      text: "This feature is pending..... please try again after some time",
    });
  };

  isLastMessage = (current_question_number) => {
    if (typeof current_question_number == "number") {
      const lenght_of_question = questions.length;
      if (current_question_number == lenght_of_question - 1) return true;
    }
    return false;
  };

  renderNextMsg = () => {
    if (!this.isLastMessage(question_number)) {
      question_number += 1;
      this.toggleInputToolBox(questions[question_number].type);
      this.appendMessage(questions[question_number]);
      return false;
    }

    if (this.isLastMessage(question_number)) {
      question_number = 0;
      this.calculateRisk();
    }
  };

  saveAnswer = (message) => {
    const { text: answer } = message;
    const { text: question } = questions[question_number];
    answer_storage = [...answer_storage, { answer, question }];
  };

  onSend(message) {
    this.saveAnswer(message);
    this.toggleInputToolBox(message.type);
    this.appendMessage(message);
    this.renderNextMsg();
  }

  onUserClick = (msg) => {
    this.saveAnswer(msg);
    this.appendMessage(msg);
    this.renderNextMsg();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.toggleInputToolBox(questions[question_number].type);
    console.log(navigation);
    this.focusListner = navigation.addListener("didFoucs", () => {
      question_number = 0;
    });
    this.setState({
      messages: [questions[question_number]],
    });
  }

  UNSAFE_componentWillMount() {
    question_number = 0;
  }
  render() {
    const { disable, messages } = this.state;
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => this.onSend(messages[0], "textbox")}
          placeholder="Please type your answer..."
          renderBubble={(msg) => (
            <Bubble data={msg} handleSelect={this.onUserClick} />
          )}
          user={{
            _id: 1,
          }}
          renderDay={(props) => (
            <Day {...props} textStyle={{ display: "none" }} />
          )}
          renderInputToolbar={disable ? () => null : undefined}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message_view: {
    padding: 10,
    borderRadius: 5,
  },
  message_text: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  top_start_radius: {
    borderBottomStartRadius: 20,
  },
  top_end_radius: {
    borderTopEndRadius: 20,
  },
  option_view: {
    marginTop: 3.5,

    flexDirection: "row",
    flexWrap: "wrap",
  },
});
