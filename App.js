import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Minesweeper from "./src/Minesweeper";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="Minesweeper" component={Minesweeper}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const SettingsScreen = ({navigation}) => {
    const [width, setWidth] = useState('5');
    const [height, setHeight] = useState('5');


    const isValidInput = (value) => {
        return /^[1-9]\d*$/.test(value);
    };

    const handleStartGame = () => {
        if (isValidInput(width) && isValidInput(height)
            && parseInt(width, 10) <= 11 && parseInt(height, 10) <= 11
            && parseInt(width, 10) >= 3 && parseInt(height, 10) >= 3) {
            navigation.navigate('Minesweeper', {width: parseInt(width, 10), height: parseInt(height, 10)});
        } else {
            Alert.alert('Неправильный ввод', 'Введите целое число от 1 до 11');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Настройки</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Высота: </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={width}
                    onChangeText={(text) => setWidth(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ширина: </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                />
            </View>
            <Button title="Начать" onPress={handleStartGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        width: 50,
    },
});

export default App;
