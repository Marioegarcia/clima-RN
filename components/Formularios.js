import { Picker, PickerIOS } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Alert, Animated, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const Formularios = ({busqueda,guardarBusqueda,guardarConsultar}) => {
    const { pais, ciudad } = busqueda;
    const [animacionboton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            Alert.alert(
                'Error',
                'Hay campos vacios',
                [{text:'Entendido'}]
            )
            return;
        }

        guardarConsultar(true);
    }
    const animacionEntrada = () => {

        Animated.spring(animacionboton,{
            toValue: .75,
            useNativeDriver: true
        }).start();

    }

    const animacionSalida = () => {

        Animated.spring(animacionboton,{
            toValue: 1,
            useNativeDriver: true,
            tension:20,
            friction:4
        }).start();

    }

    const estiloAnimacion = {
        transform:[{ scale:animacionboton }]
    }
    
    return (
        <>
            <View style={styles.formulario} >
                <View>
                    <TextInput
                    value={ciudad}
                    onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                    style={styles.input}
                    placeholder="Ciudad"
                    placeholderTextColor="#666"
                    autoCorrect={false}
                    
                    />
                </View>
                <View>
                    <Picker
                    selectedValue={pais}
                    style={{ backgroundColor:'#FFF' }}
                    onValueChange={pais => guardarBusqueda({...busqueda,pais})}
                    >
                        <Picker.Item label="-- Selecciona un País --" value="" />
                        <Picker.Item label="Estado Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Peru" value="PE" />
                    </Picker>

                    
                </View>

                <TouchableWithoutFeedback
                onPress={() => consultarClima()}
                onPressIn={ ()=> animacionEntrada() }
                onPressOut={ ()=> animacionSalida() }
                >
                    <Animated.View style={[styles.btnBuscar,estiloAnimacion]} >
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>
        </>
    )
}

export default Formularios

const styles = StyleSheet.create({
    input:{
        padding:10,
        height:50,
        backgroundColor: '#FFF',
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center',
    },
    textoBuscar:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center',
        textTransform:'uppercase',
        fontSize:18
    }
})
