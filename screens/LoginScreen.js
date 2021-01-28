import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from "react-native-elements";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    return (
        <KeyboardAvoidingView behavior = "padding" >
            <StatusBar style = "dark"/>
            <View style = {styles.container}>
                <View  style ={{height: 100}} />
                <Image 
                    style ={{width: 400, height: 200}}
                    source ={require("./logo.png")}
                />
                <View style = {styles.inputContainer}>
                    <Input 
                        placeholder = "Email" 
                        // autoFocus 
                        type="email" 
                        value={email}
                        onChangeText= {(text) => setEmail(text)}
                    />

                    <Input 
                        placeholder = "Password" 
                        // autoFocus 
                        secureTextEntry
                        type="password" 
                        value={password}
                        onChangeText= {(text) => setPassword(text)}
                    />
                </View>

                <Button containerStyle = {styles.button} title = "Login"/>
                <Button onPress = {() => navigation.navigate("Register")} containerStyle = {styles.button} title = "Register" type = "outline"/>
                <View  style ={{height: 10}} />
            </View>
        </KeyboardAvoidingView>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
