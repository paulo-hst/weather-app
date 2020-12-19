// CHANGE BACKGROUND COLOR BY THE TEMPERATURE (RAIN, SUN, CLOUDS)
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({currentWeather}){
    
    // propriedades retiradas da API
    const { 
        main : { temp }, // propriedades retiradas da API
        weather : [details],
        name: name,
    } = currentWeather

    // icon/description descontruido de detalhes que foi descontruido de currentWeather (API)
    const { icon, description, main } = details 
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return(
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}º</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },

    weatherIcon: {
        width: 100,
        height: 100,
    },

    weatherDescription: {
        textTransform: 'capitalize'
    },
    
    textPrimary: {
        fontSize: 55,
        color: PRIMARY_COLOR,
        fontWeight: '700',
    },

    textSecondary:{
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    }

})