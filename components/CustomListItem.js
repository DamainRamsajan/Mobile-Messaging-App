import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {ListItem, Avatar} from "react-native-elements";
import { db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat}) => {

    const [chatMessages, setChatMessages] = useState ([]);

    useEffect(() => {
       const unSubscribe = db.collection("chats").doc(id).collection("messages")
       .orderBy("timestamp", "desc").onSnapshot((snapshot) => 
           setChatMessages(snapshot.docs.map((doc) => doc.data ()))
       );   
       return unSubscribe     
    })

    return (
        <ListItem key = {id} onPress = {() => enterChat(id,chatName)} key = {id} bottomDivider> 
            <Avatar 
                rounded
                source = {{uri: chatMessages?.[0]?.photoURL || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"}}
            
            />

            <ListItem.Content>
                <ListItem.Title style = {{fontWeight: "800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines = {1} ellipsizeMode = "tail">
                    This is a test subtitle
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
