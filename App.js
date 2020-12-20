import { StatusBar} from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import Clock from './components/Clock'

import { colors } from './utils/index'
import { WEATHER_API_KEY } from 'react-native-dotenv'

/*------------------------ EDITAR -------------------------*/
import fotooo from './assets/backgrounds/morning-clear.png';
const image = fotooo;

// const WEATHER_API_KEY = '327a35d5292c1d1dc634d3444010b127'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ currentWeather, setCurrentWeather ] = useState(null)
  const [ unitsSystem, setUnitsSystem ] = useState('metric') // altera a unidade de medida de Kelvin para Celcius

  useEffect(() => {
    load()
  }, [unitsSystem]) // toda vez que o unitsSystem mudar (picker), a API será chamada

  async function load(){
    
    // ao carregar o aplicativo, as mensagens de erro são nulas
    setCurrentWeather(null)
    setErrorMessage(null)

    try{
      // Verifica se o usuário concedeu acesso à localização
      let { status } = await Location.requestPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Acesso à localização do dipositivo é necessário')
        return
      }

      // Recupera a localização atual 
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords

      
      // &units=${unitsSystem} > altera a unidade de medida de Kelvin para Celcius
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}&lang=pt_br`


      const response = await fetch(weatherUrl)
      const result = await response.json() // transforma a requisição feita no fetch para JSON
      console.log(result)
      
      // Verificar se existe algum erro na latitude/longitude/Chave API e joga o objeto no estado currentWeather
      if(response.ok){
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

    } catch(error){
      setErrorMessage(error.message)
    }
  }

  if(currentWeather){

    return (
      <View style={styles.container}>

        { /*------------------------ EDITAR -------------------------*/ }
        <ImageBackground source={image} style={styles.image}>
          <StatusBar style="auto" />
          <View style={styles.main}>
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <ReloadIcon load={load}/>
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <Clock currentWeather={currentWeather} />
          <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
        </ImageBackground>
        
      </View>
    )
  } else if (errorMessage){
    return (
      <View style={styles.container}>
        <ReloadIcon load={load}/>
        <Text style={{ textAlign: 'center', fontSize: 45, }}>{ errorMessage }</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else{
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando :)</Text>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />      
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',// centralizar verticalmente
  },

  main: {
    justifyContent: 'center',
    flex: 1,
  },

  loadingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    top: -30,
    color: colors.PRIMARY_COLOR,
  },

  /*------------------------ EDITAR -------------------------*/
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // opacity: 0.7,
  },

});
