import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({currentWeather}){
    
    // propriedades retiradas da API
    const { 
        main : { temp }, // propriedades retiradas da API
        weather : [details],
    } = currentWeather

    // icon/description descontruido de detalhes que foi descontruido de currentWeather (API)
    const { icon, description, main } = details 
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    
    return(
        <View style={styles.weatherInfo}>
            <View style={styles.weatherInfoFirst}>
                <Text style={styles.textPrimary}>{Math.round(temp)}º</Text>
            </View>
            <View style={styles.weatherInfoSecond}>
                <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
                <Text style={styles.weatherDescription}>{description}</Text>
                <Text style={styles.textSecondary}>{main}</Text>  
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({

    weatherInfo: {
        alignItems: 'flex-start',
        top: 30,
        borderWidth: 0,
        margin: 15,
        borderColor: 'blue',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 5,
    },

    weatherInfoFirst: {
        borderWidth: 0,
        borderColor: 'blue',
        borderRadius: 10,
    },

    weatherInfoSecond: {
        borderWidth: 0,
        borderColor: 'blue',
        borderRadius: 10,
        marginHorizontal: 10,
        maxWidth: 115,
        justifyContent: 'center',
    },
    
    weatherIcon: {
        width: 100,
        height: 100,
        marginTop: -10,
    },

    weatherDescription: {
        textTransform: 'capitalize',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginTop: -5,
        color: SECONDARY_COLOR,
        
    },
    
    textPrimary: {
        fontSize: 150,
        color: PRIMARY_COLOR,
        fontWeight: '700',
    },

    textSecondary:{
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
        display: 'none'
    }

})