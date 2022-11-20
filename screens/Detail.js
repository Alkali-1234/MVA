import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
// import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


export default function Detail({route, navigation}) {
  const { id } = route.params;
  const { title } = route.params;
  const { type } = route.params;
  const { image } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [extractedId, setExtractedId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);


  const [dataSnapshot, setDataSnapshot] = useState(null);
  const [showSynopsesModal, setShowSynopseesModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [synopsesDataSnapshot, setSynopsesDataSnapshot] = useState(null);
  const [synopsesIsAnimating, setSynopsesIsAnimating] = useState(false);

  useEffect(() => {
    navigation.setOptions({title: id})
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
    }).catch(function (error) {
      alert(error);
    });
    }
  }, [])

  const onButtonReviewPress = (review) => {
    setSelectedData(review);
    setShowModal(!showModal);
  }

  const onSynopsisPress = () => {
    if(!synopsesDataSnapshot){
      const axios = require("axios");

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
        <Text style={styles.header} adjustsFontSizeToFit={true} numberOfLines={1}>{title}</Text>
        <Text style={styles.subHeading}>{type}</Text>
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
        <TouchableOpacity style={styles.sinposisButton}><Text style={{alignSelf: 'center', fontWeight: '700', color: "white"}}>SYNOPSES</Text></TouchableOpacity>
      </View>

      {/* Reviews */}

      <View style={styles.review}>
        <Text style={{color:'white', textAlign: 'center', fontSize: 25, paddingBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1, marginBottom: 10, width: '90%'}}>Reviews</Text>
        {isAnimating? <ActivityIndicator animating={isAnimating} color="white" size="large" /> : null}

        


        <ScrollView style={{height:500, margin:10, paddingHorizontal: 5, paddingVertical:3}} nestedScrollEnabled={true}>
          {dataSnapshot?.reviews? dataSnapshot["reviews"].map((item, index) => 
          <TouchableOpacity style={styles.reviewCard} onPress={() => onButtonReviewPress(item)} key={index}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >

            {/* 1 */}
            {item.authorRating==1? <Ionicons name="md-star-half-sharp" size={24} color="yellow" /> : null} 
            {/* 2 */}
            {item.authorRating==2? <Ionicons name="md-star-sharp" size={24} color="yellow" /> : null}
            {/* 3 */}
            {item.authorRating==3? (<View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-half-sharp" size={24} color="yellow" /></View>) : null}
            {/* 4 */}
            {item.authorRating==4? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /></View> : null}
            {/* 5 */}
            {item.authorRating==5? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-half-sharp" size={24} color="yellow" /></View> : null}
            {/* 6 */}
            {item.authorRating==6? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /></View> : null}
            {/* 7 */}
            {item.authorRating==7? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-half-sharp" size={24} color="yellow" /></View> : null}
            {/* 8 */}
            {item.authorRating==8? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /></View> : null}
            {/* 9 */}
            {item.authorRating==9? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-half-sharp" size={24} color="yellow" /></View> : null}
            {/* 10 */}
            {item.authorRating==10? <View style={{flexDirection: 'row'}}><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /><Ionicons name="md-star-sharp" size={24} color="yellow" /></View> : null}
            
            {item.spoiler? <Text style={{color: "white"}}>SPOILER</Text> : null}
            </View>
            <Text style={styles.reviewText}>{item.reviewTitle}</Text>
            <Text style={{color:"gray"}}>{item.author.displayName}</Text>
          </TouchableOpacity>
        ) : null}
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
              <Text style={styles.header}>{selectedData?.reviewTitle}</Text>
              <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <AntDesign name="close" size={24} color="white"  />
              </TouchableOpacity> 
              
            </View>
            <ScrollView>
              <Text style={styles.text}></Text>
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