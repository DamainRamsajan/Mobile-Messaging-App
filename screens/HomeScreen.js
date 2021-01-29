import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import CustomListItem from '../components/CustomListItem';
import {auth, db} from "../firebase"

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
        auth.signOut().then (() => {
            navigation.replace("Login");
        });
    }

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
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
