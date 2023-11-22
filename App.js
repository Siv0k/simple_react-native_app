import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FieldInit from './src/FieldInit';
import GameScreen from './src/GameScreen';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="FieldInit">
				<Stack.Screen name="FieldInit" component={FieldInit} />
				<Stack.Screen name="GameScreen" component={GameScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
