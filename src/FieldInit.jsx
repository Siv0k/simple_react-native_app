import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: 200,
		height: 40,
		borderColor: 'gray',
		borderRadius: 5,
		borderWidth: 1,
		padding: 10,
		margin: 10,
	}
};

const FieldInit = ({ navigation }) => {
	const [boardSizeHeight, setBoardSizeHeight] = useState('');
	const [boardSizeWidth, setBoardSizeWidth] = useState('');
	const [gameBoard, setGameBoard] = useState([]);

	const handleInitPress = () => {
		const height = parseInt(boardSizeHeight);
		const width = parseInt(boardSizeWidth);

		if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
			Alert.alert('Введите корректные значения для ширины и длины поля.');
			return;
		}

		const newGameBoard = createGameBoard(height, width);
		setGameBoard(newGameBoard);

		navigation.navigate('GameScreen', { gameBoard: newGameBoard });
	};

	const createGameBoard = (height, width) => {
		const newBoard = [];
		for (let i = 0; i < height; i++) {
			const row = [];
			for (let j = 0; j < width; j++) {
				row.push({ row: i, col: j, isMine: false, isRevealed: false, isFlagged: false });
			}
			newBoard.push(row);
		}
		return newBoard;
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Ширина поля"
				keyboardType="numeric"
				onChangeText={(text) => setBoardSizeWidth(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Длина поля"
				keyboardType="numeric"
				onChangeText={(text) => setBoardSizeHeight(text)}
			/>
			<Button title="Старт" onPress={handleInitPress} />
		</View>
	);
};


export default FieldInit;
