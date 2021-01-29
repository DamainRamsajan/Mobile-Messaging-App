import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from "react-native-elements";
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    useEffect(() => {
        const unSubscribe= auth.onAuthStateChanged((authUser) => {
            if (authUser){
                navigation.replace("Home")
            }
        })
        return unSubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).catch((error) => alert (error));
    }

    return (
        <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
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
                        onSubmitEditing = {signIn}
                    />
                </View>

                <Button onPress = {signIn} containerStyle = {styles.button} title = "Login"/>
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
