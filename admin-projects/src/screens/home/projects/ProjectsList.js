import React from "react";
import { } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Text, View, NativeBaseProvider } from 'native-base'

const ProjectsList = () => {
    const navegation = useNavigation()

    return(
        <NativeBaseProvider>
            <Text> Hola </Text>
        </NativeBaseProvider>
    );
}

export default ProjectsList;