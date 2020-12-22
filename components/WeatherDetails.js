import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
const SPEED_FORMULA = 3.6

export default function WeatherDetails({ currentWeather, unitsSystem }){

    // feels like = sensação termica
    const {
        main: { feels_like, humidity, pressure, temp_min, temp_max},
        wind: { speed },

    } = currentWeather

    // adicionar negrito em parte de texto
    const B = (props) => <Text style={{fontWeight: 'bold', color: SECONDARY_COLOR}}>{props.children}</Text>

    const feelsLikeUnit = unitsSystem === 'metric' ? `${Math.round(feels_like)}ºC` : `${Math.round(feels_like)}ºF`
    const tempMinUnit = unitsSystem === 'metric' ? `${Math.round(temp_min)}ºC` : `${Math.round(temp_min)}ºF`
    const tempMaxUnit = unitsSystem === 'metric' ? `${Math.round(temp_max)}ºC` : `${Math.round(temp_max)}ºF`
    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed) * SPEED_FORMULA} m/s` : `${Math.round(speed)} milhas/h`

    return(
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text style={styles.titleDetails}>Sen. Térmica:</Text>
                            <Text style={styles.textSecondary}>{feelsLikeUnit}</Text>
                        </View>                        
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={35} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text style={styles.titleDetails}>Umidade:</Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>                        
                    </View>
                </View>
            </View>
            <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR  }}>
                {/* Remover campo PRESSÃO ATMOSFÉRICA
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text>Pressão:</Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>                        
                    </View>
                </View>
                */}
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="thermometer-lines" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text style={styles.textMaxMin}>Maxima: <B>{tempMinUnit}</B></Text>
                            <Text style={styles.textMaxMin}>Minima: <B>{tempMaxUnit}</B></Text>
                        </View>                        
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="wind" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetailsItems}>
                            <Text style={styles.titleDetails}>Vento:</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>                        
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto', // Adicionar no fim da tela
        borderWidth: 1,
        margin: 15,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },

    weatherDetailsRow: {
        flexDirection: 'row', // alterar display:flex padrão
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },

    titleDetails: {
        color: PRIMARY_COLOR
    },

    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        marginTop: 7,
    },

    textMaxMin: {
        marginTop: 4,
        color: SECONDARY_COLOR,
    }
})