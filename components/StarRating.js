import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useEffect } from 'react';

const StarRating = (props) => {

    const { rating } = props;
    const { color } = props;
    const { size } = props;

    const [starArray, setStarArray] = useState(null);

    useEffect(()=>{
        //Array initiator
        let _starArray = [];

        for (let i = 0; i < Math.floor(rating); i++) {


            _starArray.push(
                {
                    "id": i,
                    "color": color,
                    "size": size,
                    "type": "md-star-sharp"
                }
            )
        }
        if(rating%Math.floor(rating) > 0){
            _starArray.push(
                {
                    "id": _starArray.length,
                    "color": color,
                    "size": size,
                    "type": "md-star-half-sharp"
                }
            )
        }
        setStarArray(_starArray);
    }, [rating, color, size])

    return (
        <View style={{flexDirection: "row"}}>
            
            {starArray?.map((item, index) => 
                
                <Ionicons key={index} name={item.type} size={item.size} color={item.color} />
            
            )}
        </View>
    )
}

export default StarRating;