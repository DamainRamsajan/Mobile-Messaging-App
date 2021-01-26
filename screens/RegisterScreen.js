import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native';
import {Button, Input} from "react-native-elements";

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState ("");

    return (
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
            <StatusBar style = "dark"/>
            <Text h3 style = {{marginBottom: 50}}>
                Create a hollA account
            </Text>

            <View style = {styles.inputContainer} >
                <Input 
                    placeholder = "Full Name"
                    autoFocus
                    type = "text"
                    value = {name}
                    onChangeText = {(text) => setName(text)}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {

    }

})