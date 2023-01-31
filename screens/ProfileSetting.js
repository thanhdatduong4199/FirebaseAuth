import { useNavigation } from "@react-navigation/native";
import { signOut, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { auth, db, colRef } from "../firebase";
import Home from "./Home";
import{
    getFirestore, collection, getDocs, setDoc, addDoc, doc, query, where, QuerySnapshot
} from 'firebase/firestore'


const ProfileSetting = () => {

    const navigation = useNavigation();   

    const [userName, setUserName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [password, setPassword] = useState('');

    const email = auth.currentUser?.email;

    const q = query(colRef, where("Email", "==", auth.currentUser?.email));

    const updateProfile = async () => {
        await getDocs(q)
        .then(snapshot =>
            {
                if (snapshot == null){
                    console.log("No data for this user")
                }
                else
                {
                    snapshot.forEach(async (document) => {
                        await setDoc(doc(db, "users", document.id),{
                            Name: (firstName + " " + lastName),
                            PhoneNumber: phoneNum
                          }, {merge: true}).then(() => {console.log("done")})
                        })
                }
            })
        .then(() => { navigation.navigate("UserProfile");})
        .catch(err =>{
            console.log(err.message)
        })
    }

    // const q = query(colRef, where("Email", "==", auth.currentUser?.email));

    // const updateUsers = async () => {
    //     await getDocs(q)
    //     .then(snapshot =>
    //         {
    //             if (snapshot == null){
    //                 console.log("No data for this user")
    //             }
    //             else
    //             {
    //                 snapshot.forEach((doc) => {
    //                     setId(doc.id);
    //                     console.log(doc.data());
    //                     setUserName(doc.data()["Name"]);
    //                     setEmail(doc.data()["Email"]);
    //                     setPhoneNum(doc.data()["PhoneNumber"]);
    //               })    
    //             }
    //         })
    //     .catch(err =>{
    //         console.log(err.message)
    //     })
    // }

        // // get collection data
        // query(colRef, where("Email", "==", "thanhdatduong4199@gmail.com"))
        // .then((snapshot) => {
        //     setValue(snapshot.data())
        // })
        // .catch(err => {
        // console.log(err.message);
        // })

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior="padding">

            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder = "First Name"
                    value = {firstName}
                    onChangeText = {text => setFirstName(text)}
                    style = {styles.input}
                />
                <TextInput
                    placeholder = "Last Name"
                    value = {lastName}
                    onChangeText = {text => setLastName(text)}
                    style = {styles.input}
                />
                    <TextInput
                    placeholder = "Phone Number"
                    value = {phoneNum}
                    onChangeText = {text => setPhoneNum(text)}
                    style = {styles.input}
                />

            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    onPress={updateProfile}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style = {styles.buttonOutlineText}>Update Info</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProfileSetting;

Home.navigationOptions = {
    headerLeft: () => {
      return Home;
    },
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
});