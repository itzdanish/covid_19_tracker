import React, { Component } from "react";

import { View, Image } from "react-native";

const Loading = ({ width, height }) => {
  return (
    <Image
      style={{ height, width, alignSelf: "center" }}
      source={require("../assets/loading.gif")}
    />
  );
};

export default Loading;
