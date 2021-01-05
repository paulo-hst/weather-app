import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../utils/index'

export default function Clock({currentWeather}){

    const { name: name } = currentWeather
    const cityName = name === 'São Cristóvão' ? 'Rio de Janeiro' : name
    const horaInicial = new Date().toLocaleTimeString()
    const data = new Date().toLocaleDateString()

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(0);
   
    useEffect(() => {
      let interval = null;
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      return () => clearInterval(interval);
    }, [isActive, seconds]);

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
        color: colors.PRIMARY_COLOR,
    },
    time: {
        fontSize: 45,
        textAlign: 'center',
        fontWeight: '400', 
        color: colors.PRIMARY_COLOR,
    },
    date: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '200',
        color: colors.PRIMARY_COLOR,
    }
})