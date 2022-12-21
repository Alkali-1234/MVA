import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BlurView from '@react-native-community/blur';
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import {View, Text, Image, Modal, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView, ImageBackground, Dimensions, ActivityIndicator} from 'react-native';
import axios from 'axios';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function Home({navigation}) {
  

  useEffect(() => {
    navigation.setOptions({headerShown: false, statusbarAnimation: 'slide'})
  })

    //variables
    const [isDisabled, setIsDisabled] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [finalSearchQuery, setFinalSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedItem, setSelectedItem] = useState({"id": "/title/tt0944947/", "image": {"height": 1500, "id": "/title/tt0944947/images/rm4204167425", "url": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg", "width": 1102}, "nextEpisode": "/title/tt1480055/", "numberOfEpisodes": 73, "principals": [{"category": "actress", "characters": [Array], "endYear": 2019, "episodeCount": 62, "id": "/name/nm3592338/", "legacyNameText": "Clarke, Emilia", "name": "Emilia Clarke", "roles": [Array], "startYear": 2011}, {"category": "actor", "characters": [Array], "endYear": 2019, "episodeCount": 67, 
    "id": "/name/nm0227759/", "legacyNameText": "Dinklage, Peter", "name": "Peter Dinklage", "roles": [Array], "startYear": 2011}, {"category": "actor", "characters": [Array], "endYear": 2019, "episodeCount": 62, "id": "/name/nm3229685/", "legacyNameText": "Harington, Kit", "name": "Kit Harington", "roles": [Array], "startYear": 2011}], "runningTimeInMinutes": 57, "seriesEndYear": 2019, "seriesStartYear": 2011, "title": "Game of Thrones", "titleType": "tvSeries", "year": 2011});
    const [dataSnapshot, setDataSnapshot] = useState(null);

    //functions
    const getData = () => {
      setIsAnimating(true);
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/find',
        params: {q: searchQuery},
        headers: {
          'X-RapidAPI-Key': '34860d4159msh55619ca491b6b00p1136fbjsne9362345ef9b',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        setDataSnapshot(response.data);
        setIsAnimating(false);
      }).catch(function (error) {
        alert(error);
        console.log(error);
        setIsAnimating(false);
      });
    }


    const changeText = (value) => {
        setSearchQuery(value);
        if(value == "" || searchQuery == null){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    }

    const setDataForModal = (item, _id, _title, _type, _image, _imageW, _imageH) => {
        // navigation.navigate("Detail", {
        //     id: _id.toString(),
        //     title: _title.toString(),
        //     type: _type.toUpperCase(),
        //     image: _image.toString(),
        //     imageW: _imageW,
        //     imageH: _imageH
        // })
        setSelectedItem(item)
        setShowModal(true)
    }

    const navigateToDetail = (_id, _title, _type, _image, _imageW, _imageH) => {
      setShowModal(false);
      navigation.navigate("Detail", {
            id: _id.toString(),
            title: _title,
            type: _type,
            image: _image,
            imageW: _imageW,
            imageH: _imageH
        })
    }

    const searchButton = () => {
        setFinalSearchQuery(searchQuery);
        getData()
    }

    return (
      <ImageBackground source={require('../assets/imgs/purpwallpaper.jpg')} style={styles.imgBg}>

        <SafeAreaView style={styles.container}>

          <View style={styles.searchView}>
            <TextInput style={styles.searchField} placeholder="Search" onChangeText={changeText} placeholderTextColor={"white"}></TextInput>
            <TouchableOpacity style={styles.searchButton} disabled={isDisabled} onPress={searchButton}>
                <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{margin: 20,}}>
              <Text adjustsFontSizeToFit={true} style={styles.searchingText}>Searching for: {finalSearchQuery}</Text>
              {isAnimating? <ActivityIndicator size="large" color="white" animating={isAnimating} /> : null}
              {
                dataSnapshot?(
                  <ScrollView>
                    {dataSnapshot["results"].map((item, index) =>  
                    <TouchableOpacity  onPress={() => setDataForModal(item, item.id, item.title, item.titleType, item.image, item.image?.width, item.image?.height)} key={index}>

                          <ImageBackground style={styles.cardContainer} source={require('../assets/imgs/cardbg.png')}>
                          <View style={styles.cardSubContainer}>
                            {item.titleType=="movie"? <MaterialIcons name="movie" size={60} color="black" /> : null}
                            {item.titleType=="tvSeries" || item.titleType=="tvMovie" || item.titleType=="tvEpisode"? <Ionicons name="tv" size={60} color="black" /> : null}
                            {item.titleType=="video"? <Entypo name="video" size={60} color="black" /> : null}
                            {item.titleType=="videoGame"? <Ionicons name="game-controller" size={60} color="black" /> : null}
                            {item.titleType=="short"? <MaterialIcons name="short-text" size={60} color="black" /> : null}
                            {item.titleType!="movie" && item.titleType!="tvSeries" && item.titleType!="tvMovie" && item.titleType!="tvEpisode" && item.titleType!="video" && item.titleType!="short" && item.titleType!="videoGame"? <Image style={{width:60, height: 60}} source={require('../assets/imgs/multimedia.png')} /> : null}
                            <View style={styles.cardSubSubContainer}>
                              <Text style={styles.cardSubContainer.mainText} numberOfLines={2}>{item.title}</Text>
                              <Text style={styles.cardSubContainer.text} numberOfLines={1}>{item.year}</Text>
                            </View>
                          </View>
                          </ImageBackground>
                    </TouchableOpacity>
                )}
                  </ScrollView>
                ):(
                  <View style={styles.noDataContainer
                  }>
                    <Text style={styles.noData}>No data</Text>
                  </View>
                )
              }
          </View>
          <Modal
          animationType='fade'
          transparent={false}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View>
            <ImageBackground style={styles.imgBg} source={require('../assets/imgs/purpwallpaper.jpg')}>
            
            
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{selectedItem.title? selectedItem.title : "No title"}</Text>
              <Text style={styles.subHeader}>{selectedItem.titleType? selectedItem.titleType.toUpperCase() : "No Type"}</Text>
            </View>
            {selectedItem.image? <Image style={{width: 200, height: 300, resizeMode:'contain',
              borderRadius: 15,
              //Shadow
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 2},
              shadowRadius: 10,
              elevation: 3
              }} source={{uri: selectedItem.image?.url}} />
            : <View style={{width: 200, height: 300, backgroundColor: "#15011a", borderRadius: 15, justifyContent: 'center', alignItems: 'center',shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2},
            shadowRadius: 10,
            elevation: 3}}><Text style={{color:"white"}}>No Image</Text></View>}
              <View style={styles.detailsButtonContainer}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => setShowModal(false)} >
                <Text style={styles.detailsButton.text}><Ionicons name="exit-outline" size={24} color="white" /></Text>
                
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(selectedItem.id, selectedItem.title, selectedItem.titleType, selectedItem.image, selectedItem.image?.width, selectedItem.image?.height)} >
                <Text style={styles.detailsButton.text}><Ionicons name="arrow-forward" size={24} color="white" /></Text>
              </TouchableOpacity>
              </View>
              

              </ImageBackground>
          </View>
        </Modal>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: "100%",
        width: "100%"
    },
    imgBg: {
      height: screenHeight,
      width: screenWidth,

      alignItems: 'center'
    },
    searchField: {
        fontSize: 20,
        width: '65%',
        height: 50,
        color: 'white',
        marginVertical: 5,
        marginLeft: 15,
        
    },
    searchView: {
      marginHorizontal: 20, marginBottom: 75, marginTop:40,

      backgroundColor: '#15011a',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchButton: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: "transparent",
        marginVertical: 5,
        marginRight: 15,
    },
    searchingText: {
        alignSelf: 'center',
        marginTop: 20,
        paddingBottom: 15,
        width: '95%',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        marginBottom: 10
        
    },
    cardContainer: {
        borderRadius:7,
        padding:7,
        borderColor:'purple',
        overflow: 'hidden',
        height: 80,
        marginVertical: 10,
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3
    },
    textHeaderCard: {
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'flex-start'
    },
    textOtherCardStart: {
        fontWeight: '500',
        color: '#737373',
        alignSelf: 'flex-start'
    },
    textOtherCardEnd: {
        fontWeight: '500',
        color: '#737373',
        alignSelf: 'flex-end'
    },
    noData: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: '600',
      color: "white"
    },
    noDataContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      alignSelf: 'center'
    },
    cardSubContainer: {
      text: {
        color: 'white',
        width: 200,
        textAlign: 'right',
        marginHorizontal: 10,
        color: 'white'
      },
      mainText: {

        width: 200,
        textAlign: 'right',
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'white'
      },
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    cardSubSubContainer: {

      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    detailsButton: {
      text: {
        color: 'white',
        alignText: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      },
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: '#15011a',
      height: 50,
      width: 90,
      borderRadius: 200,
      marginTop: 20
    },
    detailsButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      height: 50,
      width: 200,
      borderRadius: 200,
      marginTop: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        alignText: 'center',

    },
    subHeader: {
        color: 'white',
        alignSelf: 'center'
    },
    headerContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      marginBottom: 20,
      marginHorizontal: 25,
      marginTop: 20,
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      paddingBottom: 5
    }
})

export default Home;