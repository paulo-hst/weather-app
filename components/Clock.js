import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Clock({currentWeather}){

    const { name: name } = currentWeather
    const cityName = name === 'São Cristóvão' ? 'Rio de Janeiro' : name

    const horaInicial = new Date().toLocaleTimeString()
    const data = new Date().toLocaleDateString()

    const [ hora, setHora ] = useState(horaInicial)


    return(
        <View style={styles.clockContainer}>
            <Text style={styles.city}>{cityName}</Text>
            <Text style={styles.time}>{horaInicial}</Text>
            <Text style={styles.date}>{data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    clockContainer:{
        top: -50,
    },
    city:{
        fontSize: 50,
        textAlign: 'center',
        fontWeight: '600',
    },
    time: {
        fontSize: 45,
        textAlign: 'center',
        fontWeight: '400', 
    },
    date: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '200',
    }
})