import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Minesweeper from './src/Minesweeper';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Minesweeper" component={Minesweeper} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
