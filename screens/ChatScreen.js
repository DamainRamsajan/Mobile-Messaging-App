import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import { SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import * as firebase from "firebase";


const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState ("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions ({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View 
                style = {{
                    flexDirection: "row",
                    alignItems: "center",                    
                }}
                >
                    <Avatar rounded  source = {{uri: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"}}/>
                    <Text style = {{color: "white", marginLeft: 10, fontWeight: "700"}} >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style = {{marginLeft: 10}}
                    onPress = {navigation.goBack}
                >                    
                    <AntDesign name = "arrowleft" size = {24} color= "white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View 
                    style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name= "video-camera" size = {24} color = "white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                    <Ionicons name = "call" size = {24} color = "white" />
                    </TouchableOpacity>
                </View>
            )
        });
        
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();
        
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput("");
    };

    useLayoutEffect(() => {
        const unSubscribe = db.collection("chats")
        .doc(route.params.id).collection("messages")
        .orderBy("timestamp", "desc").onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data:doc.data(),
            }))
        ))
        return unSubscribe;
    }, [route])

    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: "white"}}>
            <StatusBar style = "light"/>
            <KeyboardAvoidingView
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
                style = {styles.container}
                keyboardVerticalOffset ={90}
            >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss} >
                    <>
                    <ScrollView>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key = {id} style = {styles.receiver}>
                                    <Avatar />
                                    <Text style = {styles.receiverText}>{data.message} </Text>
                                </View>
                            ): (
                                <View key = {id} style = {styles.sender}>
                                    <Avatar />
                                    <Text style = {styles.senderText}>{data.message} </Text>
                                </View>
                            )
                        ))}
                    
                    
                    </ScrollView>

                    <View style = {styles.footer}>
                        <TextInput 
                        onChangeText = {(text) => setInput(text)} 
                        onSubmitEditing = {sendMessage}
                        value = {input} 
                        placeholder = "hollA Message" 
                        style = {styles.textInput}
                        />

                        <TouchableOpacity onPress = {sendMessage}>
                            <Ionicons name = "send" size = {24} color = "#0F3657"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}/>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",  
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    receiver: {

    },
    sender: {

    },
    receiverText: {

    }, 
    senderText: {

    },
})
