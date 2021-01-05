import { StatusBar} from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'
import UnitsPicker from './components/UnitsPicker'
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'
import Clock from './components/Clock'

import { colors, backgroundImages } from './utils/index'
import { WEATHER_API_KEY } from 'react-native-dotenv'

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
  
  function handleBackground(currentWeather){
    
    const { main: { temp } } = currentWeather
  
    console.log(Math.round(temp))
    const currentHour = new Date().getHours()

      if(temp < 20 && currentHour < 5){
        return backgroundImages.nightRain
      } else if(temp >= 20 && temp < 25 && currentHour < 5){
        return backgroundImages.nightCloudy
      } else if(temp >= 25 && currentHour < 5){
        return backgroundImages.nightClear
      }
      
      else if(temp < 20 && currentHour >= 5 && currentHour < 12){
        return backgroundImages.morningRain
      } else if(temp >= 20 && temp < 25 && currentHour >= 5 && currentHour < 12){
        return backgroundImages.morningCloudy
      } else if(temp >= 25 && currentHour >= 5 && currentHour < 12){
        return backgroundImages.morningClear
      }
      
      else if(temp <= 20 && currentHour >= 12 && currentHour < 18){
        return backgroundImages.afternoonRain
      } else if(temp > 20 && temp <= 25 && currentHour >= 12 && currentHour < 18){
        return backgroundImages.afternoonCloudy
      } else if(temp > 25 && currentHour >= 12 && currentHour < 18){
        return backgroundImages.afternoonClear
      } 
      
      else if(temp < 20 && currentHour > 18){
        return backgroundImages.nightRain
      } else if(temp >= 20 && temp < 25 && currentHour > 18){
        return backgroundImages.nightCloudy
      } else if(temp >= 25 && currentHour > 18){
        return backgroundImages.nightClear
      }
      
      else{
        return
      }
  }

  if(currentWeather){

    return (
      <ImageBackground source={handleBackground(currentWeather)} style={styles.background}>
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.main}>
              <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
              <ReloadIcon load={load}/>
              <WeatherInfo currentWeather={currentWeather} />
            </View>
            <Clock currentWeather={currentWeather} />
            <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
        </View>
      </ImageBackground>
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
        <ActivityIndicator size="large" color={colors.EXTRA_COLOR} />      
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',// centralizar verticalmente
    backgroundColor: 'rgba(0,0,0,0.3)'
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
    color: colors.EXTRA_COLOR,
  },

  background: {
    width: '100%',
    height: '100%'
  },

});
