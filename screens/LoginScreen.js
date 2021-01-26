import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from "react-native-elements";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    return (
        <KeyboardAvoidingView behavior ="padding" style= {styles.container}>
            <View>
                <Image 
                    style ={{width: 400, height: 200}}
                    source ={require("./logo.png")}
                />
                <View>
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

            </View>
        </KeyboardAvoidingView>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
