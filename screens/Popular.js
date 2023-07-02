import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class PopularMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ngrok_url: "https://5b7f-2601-14b-200-7de0-6c7b-950f-e18a-8e7a.ngrok-free.app"
    }
  }

  componentDidMount() {
    this.getData()
  }

  /*define getData() function here*/
  getData = () => {
    axios.get(this.state.ngrok_url + "/popular_movies").then((response) => {
      this.setState({ data: response.data.data })
    }).catch((error) => {
      alert(error.message)
    })
  }

  display = ({ item, index }) => {
    return (
      <View style={styles.cardContainer}>
        {/*Add the component for poster image below*/}
        <Image
          style={styles.posterImage}
          source={{ uri: this.state.data.poster_link }}
        />

        <View style={{ flex: 0.15 }}>
          {/*Add the components to show the movie name and 
    other details ( release date & duration) below*/}
          <View style={styles.movieTitleContainer}>
            <Text style={styles.title}>{this.state.data.original_title}</Text>
            <Text style={styles.subtitle}>
              {release_date.split("-")[0]} | {this.state.data.duration} mins
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          {/*Add the FlatList component to show the popular movies data below*/}
          <FlatList
            data={this.state.data}
            renderItem={this.display}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth: RFValue(2),
    borderColor: "#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});
