import React from 'react';
import {TouchableOpacity, Text, FlatList, SafeAreaView} from 'react-native';

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		backgroundColor: 'lightblue',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
	},
};

const GameScreen = ({ route }) => {
	const { gameBoard } = route.params;

	const handleCellPress = (row, col) => {
	};

	const renderCell = ({ item }) => (
		<TouchableOpacity
			style={styles.button}
			onPress={() => handleCellPress(item.row, item.col)}
		>
			<Text style={styles.buttonText}></Text>
		</TouchableOpacity>
	);

	const renderRow = ({ item }) => (
		<FlatList
			data={item}
			renderItem={renderCell}
			keyExtractor={(cell) => `${cell.row}-${cell.col}`}
			horizontal
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={gameBoard}
				renderItem={renderRow}
				keyExtractor={(row) => `${row[0].row}-${row[0].col}`}
			/>
		</SafeAreaView>
	);
};


export default GameScreen;
