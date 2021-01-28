import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native';
import {Button, Input, Text} from "react-native-elements";

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState ("");
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [profilePic, setProfilePic] = useState ("");

    useLayoutEffect(() => {
        navigation.setOptions ({
            headerBackTitle: "Get back to Login",
        })
    }, [navigation])

    const register = () => {};

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
                <Input 
                    placeholder = "Email"
                    type = "email"
                    value = {email}
                    onChangeText = {(text) => setEmail(text)}
                />
                <Input 
                    placeholder = "Password"
                    type = "password"
                    value = {password}
                    secureTextEntry
                    onChangeText = {(text) => setPassword(text)}
                />
                <Input 
                    placeholder = "Profile Picture url (optional)"
                    type = "text"
                    value = {profilePic}
                    onChangeText = {(text) => setProfilePic(text)}
                    onSubmitEditing = {register}
                />
            </View>

            <Button 
                onPress = {register}
                title = "Register"
                raised
                containerStyle = {styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }

})
