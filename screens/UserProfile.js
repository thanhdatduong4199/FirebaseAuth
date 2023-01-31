import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db, colRef } from "../firebase";
import Home from "./Home";
import{
    getFirestore, collection, getDocs, addDoc, doc, query, where, QuerySnapshot
} from 'firebase/firestore'


const UserProfile = () => {

    const navigation = useNavigation();   

    const [id, setId] = useState();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');


    const q = query(colRef, where("Email", "==", auth.currentUser?.email));

    useEffect(() => {
        fetchUsers()
      });

    const fetchUsers = async () => {
        await getDocs(q)
        .then(snapshot =>
            {  
                if (snapshot == null){
                    console.log("No data for this user")
                }
                else
                {
                    console.log("here");
                    snapshot.forEach((doc) => {
                        setId(doc.id);
                        console.log(doc.data());
                        setUserName(doc.data()["Name"]);
                        setEmail(doc.data()["Email"]);
                        setPhoneNum(doc.data()["PhoneNumber"]);
                  })    
                }
            })
        .catch(err =>{
            console.log(err.message)
        })
    }


    const changeProfile = () => {
        navigation.navigate("ProfileSetting");
    }
        

        // // get collection data
        // query(colRef, where("Email", "==", "thanhdatduong4199@gmail.com"))
        // .then((snapshot) => {
        //     setValue(snapshot.data())
        // })
        // .catch(err => {
        // console.log(err.message);
        // })

    return (
        <View style = {styles.container}>
            <View>
                <Text> {id}</Text>
                <Text> {userName}</Text>
                <Text> {email}</Text>
                <Text> {phoneNum}</Text>
            </View>
            <TouchableOpacity
                onPress={fetchUsers}
                style= {styles.button}
            >
                <Text style = {styles.buttonText}> Show users</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={changeProfile}
                style= {styles.button}
            >
                <Text style = {styles.buttonText}> Change Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfile;

Home.navigationOptions = {
    headerLeft: () => {
      return Home;
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});