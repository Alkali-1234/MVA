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
    const [dataSnapshot, setDataSnapshot] = useState({
      "@meta": {
        "operation": "Search",
        "requestId": "4ce4b56d-7f69-44e7-b1ab-88d0b1286cbe",
        "serviceTimeMs": 86.073133
      },
      "@type": "imdb.api.find.response",
      "query": "game of thr",
      "results": [
        {
          "id": "/title/tt0944947/",
          "image": {
            "height": 1500,
            "id": "/title/tt0944947/images/rm4204167425",
            "url": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
            "width": 1102
          },
          "runningTimeInMinutes": 57,
          "nextEpisode": "/title/tt1480055/",
          "numberOfEpisodes": 73,
          "seriesEndYear": 2019,
          "seriesStartYear": 2011,
          "title": "Game of Thrones",
          "titleType": "tvSeries",
          "year": 2011,
          "principals": [
            {
              "id": "/name/nm3592338/",
              "legacyNameText": "Clarke, Emilia",
              "name": "Emilia Clarke",
              "category": "actress",
              "characters": [
                "Daenerys Targaryen"
              ],
              "endYear": 2019,
              "episodeCount": 62,
              "roles": [
                {
                  "character": "Daenerys Targaryen",
                  "characterId": "/character/ch0158597/"
                }
              ],
              "startYear": 2011
            },
            {
              "id": "/name/nm0227759/",
              "legacyNameText": "Dinklage, Peter",
              "name": "Peter Dinklage",
              "category": "actor",
              "characters": [
                "Tyrion Lannister"
              ],
              "endYear": 2019,
              "episodeCount": 67,
              "roles": [
                {
                  "character": "Tyrion Lannister",
                  "characterId": "/character/ch0146096/"
                }
              ],
              "startYear": 2011
            },
            {
              "id": "/name/nm3229685/",
              "legacyNameText": "Harington, Kit",
              "name": "Kit Harington",
              "category": "actor",
              "characters": [
                "Jon Snow"
              ],
              "endYear": 2019,
              "episodeCount": 62,
              "roles": [
                {
                  "character": "Jon Snow",
                  "characterId": "/character/ch0155777/"
                }
              ],
              "startYear": 2011
            }
          ]
        },
        {
          "id": "/title/tt13380510/",
          "image": {
            "height": 500,
            "id": "/title/tt13380510/images/rm443537409",
            "url": "https://m.media-amazon.com/images/M/MV5BYTM3N2ZiZTgtYjlhOC00NGI2LTk5MWItNDBiOGVhZmNhMzZkXkEyXkFqcGdeQXVyMTEwNDU1MzEy._V1_.jpg",
            "width": 500
          },
          "title": "Game of Thrones",
          "titleType": "video",
          "year": 2003,
          "principals": [
            {
              "id": "/name/nm0234541/",
              "legacyNameText": "Dotrice, Roy",
              "name": "Roy Dotrice",
              "category": "actor",
              "characters": [
                "Narrator"
              ],
              "roles": [
                {
                  "character": "Narrator"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt3391176/",
          "image": {
            "height": 898,
            "id": "/title/tt3391176/images/rm3384681216",
            "url": "https://m.media-amazon.com/images/M/MV5BODg0YTM4NzEtZDQyNi00M2MzLWE3MDQtNjcxNTkxNWM0NzNhXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_.jpg",
            "width": 640
          },
          "title": "Game of Thrones: A Telltale Games Series",
          "titleType": "videoGame",
          "year": 2014,
          "principals": [
            {
              "id": "/name/nm0372176/",
              "legacyNameText": "Headey, Lena",
              "name": "Lena Headey",
              "attr": [
                "voice"
              ],
              "billing": 1,
              "category": "actress",
              "characters": [
                "Cersei Lannister"
              ],
              "roles": [
                {
                  "character": "Cersei Lannister",
                  "characterId": "/character/ch0159526/"
                }
              ]
            },
            {
              "id": "/name/nm1754059/",
              "legacyNameText": "Dormer, Natalie",
              "name": "Natalie Dormer",
              "attr": [
                "voice"
              ],
              "billing": 2,
              "category": "actress",
              "characters": [
                "Margaery Tyrell"
              ],
              "roles": [
                {
                  "character": "Margaery Tyrell",
                  "characterId": "/character/ch0251974/"
                }
              ]
            },
            {
              "id": "/name/nm0227759/",
              "legacyNameText": "Dinklage, Peter",
              "name": "Peter Dinklage",
              "attr": [
                "voice"
              ],
              "billing": 3,
              "category": "actor",
              "characters": [
                "Tyrion Lannister"
              ],
              "roles": [
                {
                  "character": "Tyrion Lannister",
                  "characterId": "/character/ch0146096/"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt10090796/",
          "image": {
            "height": 1200,
            "id": "/title/tt10090796/images/rm357065984",
            "url": "https://m.media-amazon.com/images/M/MV5BZDdlMzQzNDQtNTAxMS00NTMyLTgxYTAtYzQ0OGI1YzZhY2Y3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
            "width": 810
          },
          "runningTimeInMinutes": 114,
          "title": "Game of Thrones: The Last Watch",
          "titleType": "tvMovie",
          "year": 2019,
          "principals": [
            {
              "disambiguation": "II",
              "id": "/name/nm0018552/",
              "legacyNameText": "Alexander, Kevin (II)",
              "name": "Kevin Alexander",
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0654295/",
              "legacyNameText": "Allen, Alfie (I)",
              "name": "Alfie Allen",
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            },
            {
              "disambiguation": "II",
              "id": "/name/nm2760664/",
              "legacyNameText": "Anderson, Jacob (II)",
              "name": "Jacob Anderson",
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt7937220/",
          "image": {
            "height": 840,
            "id": "/title/tt7937220/images/rm3655100416",
            "url": "https://m.media-amazon.com/images/M/MV5BMGYzNDJiOTgtN2Y1OC00NmM2LTk3MTMtZmFhNmJlMzQzNGNhXkEyXkFqcGdeQXVyNDgyODgxNjE@._V1_.jpg",
            "width": 600
          },
          "runningTimeInMinutes": 45,
          "title": "Game of Thrones Conquest & Rebellion: An Animated History of the Seven Kingdoms",
          "titleType": "video",
          "year": 2017,
          "principals": [
            {
              "id": "/name/nm1561982/",
              "legacyNameText": "Asbæk, Pilou",
              "name": "Pilou Asbæk",
              "attr": [
                "voice"
              ],
              "category": "actor",
              "characters": [
                "Euron Greyjoy"
              ],
              "roles": [
                {
                  "character": "Euron Greyjoy"
                }
              ]
            },
            {
              "id": "/name/nm0182666/",
              "legacyNameText": "Coster-Waldau, Nikolaj",
              "name": "Nikolaj Coster-Waldau",
              "attr": [
                "voice"
              ],
              "category": "actor",
              "characters": [
                "Jaime Lannister"
              ],
              "roles": [
                {
                  "character": "Jaime Lannister"
                }
              ]
            },
            {
              "id": "/name/nm0318821/",
              "legacyNameText": "Gillen, Aidan",
              "name": "Aidan Gillen",
              "attr": [
                "voice"
              ],
              "category": "actor",
              "characters": [
                "Petyr 'Littlefinger' Baelish"
              ],
              "roles": [
                {
                  "character": "Petyr 'Littlefinger' Baelish"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt0107207/",
          "image": {
            "height": 2358,
            "id": "/title/tt0107207/images/rm1385382400",
            "url": "https://m.media-amazon.com/images/M/MV5BMmYyOTgwYWItYmU3Ny00M2E2LTk0NWMtMDVlNmQ0MWZiMTMxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
            "width": 1580
          },
          "runningTimeInMinutes": 133,
          "title": "In the Name of the Father",
          "titleType": "movie",
          "year": 1993,
          "principals": [
            {
              "id": "/name/nm0000358/",
              "legacyNameText": "Day-Lewis, Daniel",
              "name": "Daniel Day-Lewis",
              "billing": 1,
              "category": "actor",
              "characters": [
                "Gerry Conlon"
              ],
              "roles": [
                {
                  "character": "Gerry Conlon",
                  "characterId": "/character/ch0013212/"
                }
              ]
            },
            {
              "id": "/name/nm0000592/",
              "legacyNameText": "Postlethwaite, Pete",
              "name": "Pete Postlethwaite",
              "billing": 23,
              "category": "actor",
              "characters": [
                "Giuseppe Conlon"
              ],
              "roles": [
                {
                  "character": "Giuseppe Conlon",
                  "characterId": "/character/ch0013213/"
                }
              ]
            },
            {
              "id": "/name/nm0188949/",
              "legacyNameText": "Crosbie, Alison",
              "name": "Alison Crosbie",
              "billing": 1,
              "category": "actress",
              "characters": [
                "Girl in Pub"
              ],
              "roles": [
                {
                  "character": "Girl in Pub"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt3728462/",
          "runningTimeInMinutes": 3,
          "title": "Game of Throne",
          "titleType": "short",
          "year": 2014,
          "principals": [
            {
              "id": "/name/nm6493082/",
              "legacyNameText": "Angus, Annabel",
              "name": "Annabel Angus",
              "category": "actor",
              "characters": [
                "Annie"
              ],
              "roles": [
                {
                  "character": "Annie"
                }
              ]
            },
            {
              "id": "/name/nm4711683/",
              "legacyNameText": "Keele, Emma",
              "name": "Emma Keele",
              "category": "actress",
              "characters": [
                "Mum"
              ],
              "roles": [
                {
                  "character": "Mum"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm2146097/",
              "legacyNameText": "Kolirin, Gil (I)",
              "name": "Gil Kolirin",
              "category": "actor",
              "characters": [
                "Dad"
              ],
              "roles": [
                {
                  "character": "Dad"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt0091605/",
          "image": {
            "height": 1000,
            "id": "/title/tt0091605/images/rm1189816576",
            "url": "https://m.media-amazon.com/images/M/MV5BZjEyZTdhNDMtMWFkMS00ZmRjLWEyNmEtZDU3MWFkNDEzMDYwXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
            "width": 666
          },
          "runningTimeInMinutes": 130,
          "title": "The Name of the Rose",
          "titleType": "movie",
          "year": 1986,
          "principals": [
            {
              "id": "/name/nm0000125/",
              "legacyNameText": "Connery, Sean",
              "name": "Sean Connery",
              "billing": 1,
              "category": "actor",
              "characters": [
                "William von Baskerville"
              ],
              "roles": [
                {
                  "character": "William von Baskerville"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0000225/",
              "legacyNameText": "Slater, Christian (I)",
              "name": "Christian Slater",
              "billing": 2,
              "category": "actor",
              "characters": [
                "Adso von Melk"
              ],
              "roles": [
                {
                  "character": "Adso von Melk"
                }
              ]
            },
            {
              "id": "/name/nm0702818/",
              "legacyNameText": "Qualtinger, Helmut",
              "name": "Helmut Qualtinger",
              "billing": 3,
              "category": "actor",
              "characters": [
                "Remigio de Varagine"
              ],
              "roles": [
                {
                  "character": "Remigio de Varagine"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt2231444/",
          "image": {
            "height": 2048,
            "id": "/title/tt2231444/images/rm2625491712",
            "url": "https://m.media-amazon.com/images/M/MV5BMjE5NTk5NDg3OV5BMl5BanBnXkFtZTgwNDExNzg2MDE@._V1_.jpg",
            "width": 1454
          },
          "title": "Game of Thrones",
          "titleType": "videoGame",
          "year": 2012,
          "principals": [
            {
              "id": "/name/nm0181920/",
              "legacyNameText": "Cosmo, James",
              "name": "James Cosmo",
              "attr": [
                "voice"
              ],
              "category": "actor",
              "characters": [
                "Jeor Mormont"
              ],
              "roles": [
                {
                  "character": "Jeor Mormont",
                  "characterId": "/character/ch0251492/"
                }
              ]
            },
            {
              "id": "/name/nm0384152/",
              "legacyNameText": "Hill, Conleth",
              "name": "Conleth Hill",
              "attr": [
                "voice"
              ],
              "category": "actor",
              "characters": [
                "Lord Varys"
              ],
              "roles": [
                {
                  "character": "Lord Varys",
                  "characterId": "/character/ch0249636/"
                }
              ]
            },
            {
              "id": "/name/nm9158960/",
              "legacyNameText": "Hrebenach, Jeffrey",
              "name": "Jeffrey Hrebenach",
              "category": "actor",
              "characters": [
                "Jaffa"
              ],
              "roles": [
                {
                  "character": "Jaffa"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt0062591/",
          "image": {
            "height": 716,
            "id": "/title/tt0062591/images/rm173440000",
            "url": "https://m.media-amazon.com/images/M/MV5BMzU3ZTk4MTAtYWIxMC00OTU1LTgwNDUtYjg4Y2JlZTFhZTkwXkEyXkFqcGdeQXVyODA2MTczNjM@._V1_.jpg",
            "width": 500
          },
          "runningTimeInMinutes": 90,
          "nextEpisode": "/title/tt0656993/",
          "numberOfEpisodes": 76,
          "seriesEndYear": 1971,
          "seriesStartYear": 1968,
          "title": "The Name of the Game",
          "titleType": "tvSeries",
          "year": 1968,
          "principals": [
            {
              "id": "/name/nm0058001/",
              "legacyNameText": "Barry, Gene",
              "name": "Gene Barry",
              "category": "actor",
              "characters": [
                "Glenn Howard",
                "Will Manning"
              ],
              "endYear": 1971,
              "episodeCount": 41,
              "roles": [
                {
                  "character": "Glenn Howard",
                  "characterId": "/character/ch0111049/"
                },
                {
                  "character": "Will Manning"
                }
              ],
              "startYear": 1968
            },
            {
              "id": "/name/nm0756634/",
              "legacyNameText": "Saint James, Susan",
              "name": "Susan Saint James",
              "category": "actress",
              "characters": [
                "Peggy Maxwell"
              ],
              "endYear": 1971,
              "episodeCount": 36,
              "roles": [
                {
                  "character": "Peggy Maxwell",
                  "characterId": "/character/ch0448823/"
                }
              ],
              "startYear": 1968
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0821041/",
              "legacyNameText": "Stack, Robert (I)",
              "name": "Robert Stack",
              "category": "actor",
              "characters": [
                "Dan Farrell"
              ],
              "endYear": 1971,
              "episodeCount": 26,
              "roles": [
                {
                  "character": "Dan Farrell",
                  "characterId": "/character/ch0068350/"
                }
              ],
              "startYear": 1968
            }
          ]
        },
        {
          "id": "/title/tt0354595/",
          "image": {
            "height": 695,
            "id": "/title/tt0354595/images/rm1702796544",
            "url": "https://m.media-amazon.com/images/M/MV5BMjE1NTg3MDkxN15BMl5BanBnXkFtZTcwNTg4ODgyMQ@@._V1_.jpg",
            "width": 450
          },
          "runningTimeInMinutes": 101,
          "title": "The Game of Their Lives",
          "titleType": "movie",
          "year": 2005,
          "principals": [
            {
              "disambiguation": "I",
              "id": "/name/nm0004747/",
              "legacyNameText": "Bentley, Wes (I)",
              "name": "Wes Bentley",
              "billing": 2,
              "category": "actor",
              "characters": [
                "Walter Bahr"
              ],
              "roles": [
                {
                  "character": "Walter Bahr",
                  "characterId": "/character/ch0216177/"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0124930/",
              "legacyNameText": "Butler, Gerard (I)",
              "name": "Gerard Butler",
              "billing": 1,
              "category": "actor",
              "characters": [
                "Frank Borghi"
              ],
              "roles": [
                {
                  "character": "Frank Borghi"
                }
              ]
            },
            {
              "id": "/name/nm0569962/",
              "legacyNameText": "Rossdale, Gavin",
              "name": "Gavin Rossdale",
              "billing": 4,
              "category": "actor",
              "characters": [
                "Stanley Mortensen"
              ],
              "roles": [
                {
                  "character": "Stanley Mortensen"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt7572868/",
          "image": {
            "height": 2743,
            "id": "/title/tt7572868/images/rm4071386368",
            "url": "https://m.media-amazon.com/images/M/MV5BYTdhYzc0MmMtZDQwNS00ZTdlLTgzZmYtZWIxYzE4Zjk0YzQ4XkEyXkFqcGdeQXVyNTY2MzkxMjc@._V1_.jpg",
            "width": 1920
          },
          "runningTimeInMinutes": 60,
          "nextEpisode": "/title/tt7587884/",
          "numberOfEpisodes": 8,
          "seriesEndYear": 2019,
          "seriesStartYear": 2019,
          "title": "The Name of the Rose",
          "titleType": "tvSeries",
          "year": 2019,
          "principals": [
            {
              "id": "/name/nm0001806/",
              "legacyNameText": "Turturro, John",
              "name": "John Turturro",
              "category": "actor",
              "characters": [
                "Guglielmo da Baskerville"
              ],
              "endYear": 2019,
              "episodeCount": 8,
              "roles": [
                {
                  "character": "Guglielmo da Baskerville"
                }
              ],
              "startYear": 2019
            },
            {
              "id": "/name/nm0000391/",
              "legacyNameText": "Everett, Rupert",
              "name": "Rupert Everett",
              "category": "actor",
              "characters": [
                "Bernardo Gui"
              ],
              "endYear": 2019,
              "episodeCount": 8,
              "roles": [
                {
                  "character": "Bernardo Gui",
                  "characterId": "/character/ch0012173/"
                }
              ],
              "startYear": 2019
            },
            {
              "id": "/name/nm3784578/",
              "legacyNameText": "Hardung, Damian",
              "name": "Damian Hardung",
              "category": "actor",
              "characters": [
                "Adso da Melk"
              ],
              "endYear": 2019,
              "episodeCount": 8,
              "roles": [
                {
                  "character": "Adso da Melk"
                }
              ],
              "startYear": 2019
            }
          ]
        },
        {
          "id": "/title/tt0126916/",
          "image": {
            "height": 864,
            "id": "/title/tt0126916/images/rm4105449728",
            "url": "https://m.media-amazon.com/images/M/MV5BZDgzY2NkMTgtODQwZC00MWEzLWFlZjQtZTcxOTc3NzU1MDVhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
            "width": 580
          },
          "runningTimeInMinutes": 137,
          "title": "For Love of the Game",
          "titleType": "movie",
          "year": 1999,
          "principals": [
            {
              "id": "/name/nm0000126/",
              "legacyNameText": "Costner, Kevin",
              "name": "Kevin Costner",
              "billing": 1,
              "category": "actor",
              "characters": [
                "Billy Chapel"
              ],
              "roles": [
                {
                  "character": "Billy Chapel",
                  "characterId": "/character/ch0017090/"
                }
              ]
            },
            {
              "id": "/name/nm0000593/",
              "legacyNameText": "Preston, Kelly",
              "name": "Kelly Preston",
              "billing": 2,
              "category": "actress",
              "characters": [
                "Jane Aubrey"
              ],
              "roles": [
                {
                  "character": "Jane Aubrey",
                  "characterId": "/character/ch0017092/"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0000604/",
              "legacyNameText": "Reilly, John C. (I)",
              "name": "John C. Reilly",
              "billing": 3,
              "category": "actor",
              "characters": [
                "Gus Sinski"
              ],
              "roles": [
                {
                  "character": "Gus Sinski",
                  "characterId": "/character/ch0017093/"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt3131362/",
          "runningTimeInMinutes": 3,
          "title": "Sex Game of Thrones",
          "titleType": "video",
          "year": 2012
        },
        {
          "episode": 314,
          "id": "/title/tt7234280/",
          "image": {
            "height": 927,
            "id": "/title/tt7234280/images/rm3662240512",
            "url": "https://m.media-amazon.com/images/M/MV5BNDc4YWJlNTYtYjM0YS00MzViLWE3NjQtYzQ0Mjc2NDNhZTBkXkEyXkFqcGdeQXVyMjM0NTM5MTA@._V1_.jpg",
            "width": 1650
          },
          "runningTimeInMinutes": 76,
          "season": 1,
          "nextEpisode": "/title/tt7557508/",
          "parentTitle": {
            "id": "/title/tt2185037/",
            "image": {
              "height": 1800,
              "id": "/title/tt2185037/images/rm3626425857",
              "url": "https://m.media-amazon.com/images/M/MV5BYTU3YjU3NWUtMDk3NS00ZjI4LWExMDEtZWI0ZDJkOGI1MDExXkEyXkFqcGdeQXVyOTU0MjgwMzU@._V1_.jpg",
              "width": 1200
            },
            "title": "Running Man",
            "titleType": "tvSeries",
            "year": 2010
          },
          "previousEpisode": "/title/tt7545026/",
          "seriesStartYear": 2010,
          "title": "Game Of Throne",
          "titleType": "tvEpisode",
          "year": 2016,
          "principals": [
            {
              "id": "/name/nm5004592/",
              "legacyNameText": "Yoo, Jae-Suk",
              "name": "Jae-Suk Yoo",
              "billing": 1,
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            },
            {
              "id": "/name/nm5003793/",
              "legacyNameText": "Jee, Suk-Jin",
              "name": "Suk-Jin Jee",
              "as": "Suk-jin Ji",
              "billing": 2,
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm5004549/",
              "legacyNameText": "Kim, Jong-Kook (I)",
              "name": "Jong-Kook Kim",
              "billing": 3,
              "category": "self",
              "characters": [
                "Self"
              ],
              "roles": [
                {
                  "character": "Self"
                }
              ]
            }
          ]
        },
        {
          "episode": 4,
          "id": "/title/tt11422068/",
          "season": 1,
          "nextEpisode": "/title/tt11422074/",
          "parentTitle": {
            "id": "/title/tt11351236/",
            "image": {
              "height": 1440,
              "id": "/title/tt11351236/images/rm1415938817",
              "url": "https://m.media-amazon.com/images/M/MV5BZGQyYTY5MmMtZWRhMy00MzQ3LTg0ZmUtNzlkNGI3NDFlNjU0XkEyXkFqcGdeQXVyMTA3MTEzMDk@._V1_.jpg",
              "width": 960
            },
            "title": "Boy Girl Dog Cat Mouse Cheese",
            "titleType": "tvSeries",
            "year": 2019
          },
          "previousEpisode": "/title/tt11422064/",
          "seriesStartYear": 2019,
          "title": "Game of Throne",
          "titleType": "tvEpisode",
          "year": 2019,
          "principals": [
            {
              "disambiguation": "I",
              "id": "/name/nm3855047/",
              "legacyNameText": "Michael, Justin (I)",
              "name": "Justin Michael",
              "billing": 1,
              "category": "actor",
              "characters": [
                "Boy"
              ],
              "roles": [
                {
                  "character": "Boy"
                }
              ]
            },
            {
              "id": "/name/nm3597590/",
              "legacyNameText": "Rosenfeld, Alyson Leigh",
              "name": "Alyson Leigh Rosenfeld",
              "billing": 2,
              "category": "actress",
              "characters": [
                "Girl"
              ],
              "roles": [
                {
                  "character": "Girl"
                }
              ]
            },
            {
              "id": "/name/nm3544656/",
              "legacyNameText": "Anselmi, Justin",
              "name": "Justin Anselmi",
              "billing": 3,
              "category": "actor",
              "characters": [
                "Dog"
              ],
              "roles": [
                {
                  "character": "Dog"
                }
              ]
            }
          ]
        },
        {
          "episode": 21,
          "id": "/title/tt6313252/",
          "season": 7,
          "nextEpisode": "/title/tt6313290/",
          "parentTitle": {
            "id": "/title/tt0479336/",
            "image": {
              "height": 390,
              "id": "/title/tt0479336/images/rm1391136512",
              "url": "https://m.media-amazon.com/images/M/MV5BMTczMjNlNDQtYWVlYy00ZGNjLWE5NGYtM2I2ZTliNTIwMGI0XkEyXkFqcGdeQXVyMTIxMDUyOTI@._V1_.jpg",
              "width": 960
            },
            "title": "Pinoy Big Brother",
            "titleType": "tvSeries",
            "year": 2005
          },
          "previousEpisode": "/title/tt6313224/",
          "seriesStartYear": 2005,
          "title": "Game of Throws",
          "titleType": "tvEpisode",
          "year": 2016,
          "principals": [
            {
              "id": "/name/nm8339979/",
              "legacyNameText": "Ballinan, Nonong",
              "name": "Nonong Ballinan",
              "category": "self",
              "characters": [
                "Self - Celebrity Housemate"
              ],
              "roles": [
                {
                  "character": "Self - Celebrity Housemate"
                }
              ]
            },
            {
              "id": "/name/nm5396259/",
              "legacyNameText": "De Leon, McCoy",
              "name": "McCoy De Leon",
              "category": "self",
              "characters": [
                "Self - Celebrity Housemate"
              ],
              "roles": [
                {
                  "character": "Self - Celebrity Housemate"
                }
              ]
            },
            {
              "id": "/name/nm5196498/",
              "legacyNameText": "Joson, Elisse",
              "name": "Elisse Joson",
              "category": "self",
              "characters": [
                "Self - Celebrity Housemate"
              ],
              "roles": [
                {
                  "character": "Self - Celebrity Housemate"
                }
              ]
            }
          ]
        },
        {
          "episode": 1,
          "id": "/title/tt13115716/",
          "season": 1,
          "nextEpisode": "/title/tt13115744/",
          "parentTitle": {
            "id": "/title/tt13113862/",
            "image": {
              "height": 2200,
              "id": "/title/tt13113862/images/rm2502272513",
              "url": "https://m.media-amazon.com/images/M/MV5BM2VmMGVjZmMtNTFjYS00ODlkLWFjZmUtNTI5N2ZhYzBmZmZjXkEyXkFqcGdeQXVyNDE5MjE3NDI@._V1_.jpg",
              "width": 1520
            },
            "title": "Createfinity",
            "titleType": "tvMiniSeries",
            "year": 2019
          },
          "seriesStartYear": 2019,
          "title": "Game of Throne",
          "titleType": "tvEpisode",
          "year": 2019,
          "principals": [
            {
              "disambiguation": "I",
              "id": "/name/nm9010900/",
              "legacyNameText": "Castellanos, Danny (I)",
              "name": "Danny Castellanos",
              "category": "actor",
              "characters": [
                "Danny"
              ],
              "roles": [
                {
                  "character": "Danny"
                }
              ]
            },
            {
              "id": "/name/nm7048131/",
              "legacyNameText": "Delfin, Darrel",
              "name": "Darrel Delfin",
              "category": "actor",
              "characters": [
                "Darrel"
              ],
              "roles": [
                {
                  "character": "Darrel"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt16142130/",
          "image": {
            "height": 1250,
            "id": "/title/tt16142130/images/rm3816417537",
            "url": "https://m.media-amazon.com/images/M/MV5BMjI4MGU4MTMtMWZjYi00MTU2LWFiNDgtZjQ5MmNjNzY0YzU2XkEyXkFqcGdeQXVyMTE2Njk2MzAx._V1_.jpg",
            "width": 1000
          },
          "nextEpisode": "/title/tt16171466/",
          "numberOfEpisodes": 3,
          "seriesStartYear": 2021,
          "title": "Game of the Sexes",
          "titleType": "tvMiniSeries",
          "year": 2021,
          "principals": [
            {
              "id": "/name/nm4655007/",
              "legacyNameText": "Attray, Shobhit",
              "name": "Shobhit Attray",
              "category": "actor",
              "characters": [
                "Maniraj(2021)"
              ],
              "roles": [
                {
                  "character": "Maniraj(2021)"
                }
              ]
            },
            {
              "id": "/name/nm8255023/",
              "legacyNameText": "Molla, Rumana",
              "name": "Rumana Molla",
              "category": "actress",
              "characters": [
                "Aarushi(2021)"
              ],
              "roles": [
                {
                  "character": "Aarushi(2021)"
                }
              ]
            },
            {
              "disambiguation": "I",
              "id": "/name/nm0451318/",
              "legacyNameText": "Khan, Shahbaaz (I)",
              "name": "Shahbaaz Khan",
              "category": "actor",
              "characters": [
                "Prakash Anna(2021)"
              ],
              "roles": [
                {
                  "character": "Prakash Anna(2021)"
                }
              ]
            }
          ]
        },
        {
          "id": "/title/tt10442474/",
          "image": {
            "height": 1080,
            "id": "/title/tt10442474/images/rm68810241",
            "url": "https://m.media-amazon.com/images/M/MV5BYTk3OTg5MTYtMThhOS00MzFhLWEwOWItODdmYTNjYzNiNTM5XkEyXkFqcGdeQXVyMTI5MDgxODk5._V1_.jpg",
            "width": 1920
          },
          "title": "Game of Thorns",
          "titleType": "short",
          "year": 2019
        }
      ],
      "types": [
        "title",
        "name"
      ]
    });

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
      fontWeight: '600'
    },
    noDataContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
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