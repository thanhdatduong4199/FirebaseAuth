import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from "../firebase";

const Home = () => {

    const navigation = useNavigation();   
    
    const handleSignOut = () => {
        signOut(auth)
        .then(() =>{
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

    const userProfile = () => {
        navigation.navigate('UserProfile')
    }

    return (
        <View style = {styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style= {styles.button}
            >
                <Text style = {styles.buttonText}> Sign out</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={userProfile}
                style= {styles.button}
            >
                <Text style = {styles.buttonText}> User Profile</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default Home;

Home.navigationOptions = {
    headerLeft: () => {
      return null;
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