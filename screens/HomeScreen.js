import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import CustomListItem from '../components/CustomListItem';
import {auth, db} from "../firebase"
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState ([]);

    const signOutUser = () => {
        auth.signOut().then (() => {
            navigation.replace("Login");
        });
    }

    useEffect(() => {
        const unsubcribe = db.collection("chats").onSnapshot((snapshot) => 
            setChats(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    data: doc.data(),
            }))
            ) 
        );

        return unsubcribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions ({
            title: "hollA",
            headerStyle: {backgroundColor: "#0F3657"},
            headerTitleStyle: {color: "white"},
            headerTintColor: "white",
            headerLeft: () => (
                <View style = {{marginLeft: 20}}>
                    <TouchableOpacity onPress = {signOutUser}  style = {{marginLeft: 2, marginRight:20}}>
                        <Avatar rounded source = {{uri: auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),    
            
            headerRight: () => (
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity style = {{}}>
                        <AntDesign name = "camerao" size = {26} color = "white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name = "pencil" size = {24} color = "white" />
                    </TouchableOpacity>
                </View>
            ), 

          });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate ("Chat", {
            id:id,
            chatName: chatName
        })
    }

    return (
        <SafeAreaView>
            <StatusBar style = "light"/>
            <ScrollView style = {styles.container}> 
                {chats.map (({id, data: {chatName}}) => (
                    <CustomListItem key = {id} id = {id} chatName = {chatName} enterChat = {enterChat}/>
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})
