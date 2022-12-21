import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
// import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import axios from 'axios';



export default function Detail({route, navigation}) {
  const { id } = route.params;
  const { title } = route.params;
  const { type } = route.params;
  const { image } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [extractedId, setExtractedId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [filter, setFilter] = useState([]);
  const [dataSnapshot, setDataSnapshot] = useState(null);
  const [filteredReview, setFilteredReview] = useState([]);
  const [showSynopsesModal, setShowSynopseesModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [synopsesDataSnapshot, setSynopsesDataSnapshot] = useState(null);
  const [synopsesIsAnimating, setSynopsesIsAnimating] = useState(false);

  useEffect(() => {
    navigation.setOptions("")
    let a = id.split("/");
    setExtractedId(a[2]);
    
    if(!dataSnapshot){
      setIsAnimating(true);
      const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/get-user-reviews',
      params: {tconst: a[2]},
      headers: {
        'X-RapidAPI-Key': '34860d4159msh55619ca491b6b00p1136fbjsne9362345ef9b',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setDataSnapshot(response.data);
      setIsAnimating(false);
      let totalRating = 0;
      let ratingAmount = 0;
      if(response.data["reviews"]){
      response.data["reviews"].forEach(i => {
        if(i.authorRating){
          totalRating+=i.authorRating;
          ratingAmount++;
        }
      });
      setAverageRating(totalRating/ratingAmount);
      }
      setFilter([]);
      
    }).catch(function (error) {
      alert(error);
    });
    }
  }, [])

  //Filtered reviews
  useEffect(() => {
    let _filteredReview = [];
    if(filter == "" && dataSnapshot != null){
      if(dataSnapshot["reviews"]){
      dataSnapshot["reviews"].forEach(element => {
        _filteredReview.push(element);
      });
      }
    }
    if(filter != "" && dataSnapshot != null){
      if(dataSnapshot["reviews"]){
      dataSnapshot["reviews"].forEach(element => {
        if(filter.includes(element.authorRating/2)){
          _filteredReview.push(element);
        }
      });
      }
    }

    setFilteredReview(_filteredReview);
  }, [filter])

  const toggleFilter = (num) => {
    let _filter = [];
    filter.forEach(i => {
      _filter.push(i)
    });
    if(_filter.includes(num)){
      _filter.splice(_filter.indexOf(num), 1);
      setFilter(_filter);
      return;
    }
    _filter.push(num);
    setFilter(_filter);
  }

  const calcAvgRatingNearest_5 = (num) => {
    // Check if num is closest to floor
    const numDecimal = num-Math.floor(num);
    if(numDecimal <= 0.25){
      return Math.floor(num);
    }
    //Check if num is closest to .5
    if(numDecimal > 0.25 && numDecimal < 0.75){
      return Math.floor(num) + 0.5;
    }
    //Check if num is closest to +1
    if(numDecimal >= 0.75){
      return Math.floor(num) + 1;
    }
  }

  const onButtonReviewPress = (review) => {
    setSelectedData(review);
    setShowModal(!showModal);
  }

  const onSynopsisPress = () => {
    setShowSynopseesModal(true);
    
    if(!synopsesDataSnapshot){
    setSynopsesIsAnimating(true);
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-synopses',
        params: {tconst: extractedId},
        headers: {
          'X-RapidAPI-Key': '34860d4159msh55619ca491b6b00p1136fbjsne9362345ef9b',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        setSynopsesDataSnapshot(response.data);
        setSynopsesIsAnimating(false);
      }).catch(function (error) {
        alert(error);
      });
    }
  }

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled={true}>
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={1}>{title? title : "No Title"}</Text>
        <Text style={styles.subHeading}>{type? type.toUpperCase() : "No Type"}</Text>
      </View>
      <View style={styles.sub}>
        <Image style={{width: 200, height: 300, resizeMode:'contain', borderColor: "#2c2c2c",
        borderWidth: 1,
        borderRadius: 15, backgroundColor: "#2c2c2c",
        //Shadow
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3
        }} source={{uri: image?.url}}></Image>
        <TouchableOpacity style={styles.sinposisButton} onPress={onSynopsisPress}><Text style={{alignSelf: 'center', fontWeight: '700', color: "white"}}>SYNOPSES</Text></TouchableOpacity>
      </View>



      {/* Review */}

      <View style={styles.review}>
        <Text style={{color:'white', textAlign: 'center', fontSize: 25, paddingBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 10, width: '90%'}}>Reviews</Text>
        
        {/* Average Rating & Sort */}
        <View style={{flexDirection: 'row', width: "90%", justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => setFilter([])}>
          <View style={{backgroundColor: '#282424', padding: 10, borderRadius: 8}}>
            <AntDesign name="filter" size={24} color="white" />
          </View>
          </TouchableOpacity>
          <View style={{backgroundColor: '#282424', padding: 10, borderRadius: 8, width:"85%", alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{averageRating > 0? <StarRating rating={calcAvgRatingNearest_5(averageRating/2)} color="yellow" size={20} /> : "No Ratings"}</Text>
          </View>
          
          
        </View>
        <View style={{backgroundColor: '#282424', padding: 10, borderRadius: 8, width:"85%", alignItems: 'center', width: "90%", marginTop: 5, flexDirection: "column"}}>

          <View style={{margin: 5, flexDirection: "row", justifyContent: 'space-evenly', width: "90%"}}>
          <TouchableOpacity onPress={() => toggleFilter(1)}><StarRating rating={1} color={filter.includes(1)? "white" : "yellow"} size={15} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(1.5)}><StarRating rating={1.5} color={filter.includes(1.5)? "white" : "yellow"} size={15} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(2)}><StarRating rating={2} color={filter.includes(2)? "white" : "yellow"} size={15} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(2.5)}><StarRating rating={2.5} color={filter.includes(2.5)? "white" : "yellow"} size={15} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(3)}><StarRating rating={3} color={filter.includes(3)? "white" : "yellow"} size={15} /></TouchableOpacity>
          </View>


          <View style={{margin: 5, flexDirection: "row", justifyContent: 'space-evenly', width: "90%"}}>
          <TouchableOpacity onPress={() => toggleFilter(3.5)}><StarRating rating={3.5} color={filter.includes(3.5)? "white" : "yellow"} size={12} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(4)}><StarRating rating={4} color={filter.includes(4)? "white" : "yellow"} size={12} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(4.5)}><StarRating rating={4.5} color={filter.includes(4.5)? "white" : "yellow"} size={12} /></TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter(5)}><StarRating rating={5} color={filter.includes(5)? "white" : "yellow"} size={12} /></TouchableOpacity>
          </View>
        </View>

        {isAnimating? <ActivityIndicator animating={isAnimating} color="white" size="large" style={{marginVertical: 15}} /> : null}

        <ScrollView style={{height:500, margin:10, paddingHorizontal: 5, paddingVertical:3, width: "92%"}} nestedScrollEnabled={true}>
          {filteredReview != ""? filteredReview.map((item, index) =>

          <TouchableOpacity style={styles.reviewCard} onPress={() => onButtonReviewPress(item)} key={index}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
            {item.authorRating? <StarRating rating={item.authorRating/2} color="yellow" size={24} /> : null}
            {item.spoiler? <Text style={{color: "white"}}>SPOILER</Text> : null}
            </View>
            <Text style={styles.reviewText}>{item.reviewTitle}</Text>
            <Text style={{color:"gray"}}>{item.author.displayName}</Text>

          </TouchableOpacity>
          ) : <Text style={{color: "white", alignSelf: 'center'}}>No Reviews</Text>}
        </ScrollView>
              {/* Modal */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          
          <View style={styles.modalContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#2c2c2c", marginHorizontal: 10}}>
              <Text style={styles.header}>{selectedData?.reviewTitle}</Text>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <AntDesign name="close" size={24} color="white"  />
              </TouchableOpacity> 
              
            </View>
            <ScrollView>
              <Text style={styles.text}>{selectedData?.reviewText}</Text>
            </ScrollView>
          </View>

          
        </Modal>
        {/* Synopses Modal */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={showSynopsesModal}
          onRequestClose={() => setShowSynopseesModal(false)}
        >
          
          <View style={styles.modalContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#2c2c2c", marginHorizontal: 10}}>
              <Text style={styles.header}>{title}</Text>
              <TouchableOpacity onPress={() => setShowSynopseesModal(false)}>
                <AntDesign name="close" size={24} color="white"  />
              </TouchableOpacity> 
              
            </View>
            <ScrollView>
              {synopsesIsAnimating? <ActivityIndicator animating={synopsesIsAnimating} color="white" size={"large"} /> : null}
              {
                synopsesDataSnapshot? (
                  <Text style={styles.text}>{synopsesDataSnapshot[0]? (synopsesDataSnapshot[0].text) : ("No Synopses")}</Text>
                ):(
                  null
                )
              }
              
            </ScrollView>
          </View>

          
        </Modal>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2c',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#2c2c2c',
    alignSelf: 'center',
    padding: 20,
    width: "100%",
    height: "100%"
  },
  main: {
    alignItems: 'center',
  },
  sub: {
    alignItems: 'center',
    margin: 5
  },
  review: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  subHeading: {
    fontSize: 15,
    marginBottom: 12,
    marginTop: 10,
    padding: 7,
    borderRadius: 20,
    backgroundColor: "#403c3c",
    color: 'white'

  },
  sinposisButton: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: "#403c3c",
        borderWidth: 1,
        borderRadius: 8,
    backgroundColor: "#403c3c",
    //Shadow
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3
  },
  reviewCard: {
    green: {
      marginTop: 10,
      borderColor: '#48c48c',
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#48c48c",
      //Shadow
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 10,
      elevation: 3
    },
    red: {
      marginTop: 10,
      borderColor: '#48c48c',
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#D10000",
      //Shadow
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 10,
      elevation: 3
    },


    marginTop: 10,
    borderColor: '#403c3c',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#403c3c",
    //Shadow
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3
  },
  text: {
    borderTopColor: 'white',
    borderTopWidth: 1,
    paddingTop: 20,
    fontWeight: 'normal',
    margin: 10,
    color: "white"
  },
  reviewText:{
    color: "white",
    fontSize: 20,
    marginVertical:10,
  }
}); 