import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firebase, db} from "../firebase";
import {createUserWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import{
    getFirestore, collection, getDocs, setDoc, addDoc, doc, query, where, QuerySnapshot
} from 'firebase/firestore'

const Registration = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();


    const registerUser = () => {
         createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            sendEmailVerification(
                auth.currentUser,
                {
                    handleCodeInApp: true,
                    url: "https://fir-auth-7b7e0.firebaseapp.com"
                }
            )
            .then(() =>{
                alert('Verification email sent')
            }).catch(error => alert(error.message))
            .then( async() => {
                await addDoc(collection(db, "users"), {
                    Email: email.toLowerCase(),
                    Name: (firstName + " " + lastName),
                    PhoneNumber: ''
                })
            })
            .then(() => {
                signOut(auth);
                navigation.goBack();
            }).catch((error) =>{
                alert(error.message)
            })
        })
        .catch(error => alert(error.message));
    }

    // const handleLogin = () => {
    //     signInWithEmailAndPassword(auth, email, password)
    //     .then(userCredentials => {
    //         const user = userCredentials.user;
    //         console.log('Logged in with:', user.email);
    //     })
    //     .catch(error => alert(error.message));
    // }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior="padding"
        >
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
                    placeholder = "Email"
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                    style = {styles.input}
                />
                <TextInput
                    placeholder = "Password"
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                    style = {styles.input}
                    secureTextEntry
                />
            </View>

            <View style = {styles.buttonContainer}>
                {/* <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={registerUser}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style = {styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Registration;

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