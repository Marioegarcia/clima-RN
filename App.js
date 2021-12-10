

import React, { useEffect, useState } from 'react';

import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import Clima from './components/Clima';
import Formularios from './components/Formularios';





const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais: ''
  });
  const {ciudad,pais} = busqueda;
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');




  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const apiKey = '0b13f2f858586780babc196e3adcc4d2';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${apiKey}`
        
        try {
          const peticion = await fetch(url);
          const resultado = await peticion.json();
          setResultado(resultado);

          //Modificar temperatura
          const {main} = resultado;
          if (main.temp <= 10) {

            setBgColor('rgb(105,108,149)');

          }else if(main.temp >= 10 && main.temp <= 25 ){

            setBgColor('rgb(71,149,212)');

          }else{

            setBgColor('rgb(178,28,61)');

          }
        } catch (error) {
          Alert.alert(
            'Error',
            'No ha resultados, intenta con otra ciudad',
            [{text:'Ok'}]
          )
        }
      
      }
    }

    consultarClima();
    guardarConsultar(false);
  }, [consultar])

  const bgColorApp = {
    backgroundColor : bgColor
  }

  return (
    <>
    <TouchableWithoutFeedback  onPress={()=> Keyboard.dismiss() } >
      <View style={[styles.app,bgColorApp]} >
        <View style={styles.contenido} >
          <Clima
          resultado={resultado}
          />
          <Formularios
          busqueda={busqueda}
          guardarBusqueda={guardarBusqueda}
          guardarConsultar={guardarConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
      
      
    </>
  );
};

const styles = StyleSheet.create({
  app:{
    flex:1,
    
    justifyContent:'center'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
