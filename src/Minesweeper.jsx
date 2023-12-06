import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';

function initializeBoard(width, height, minesCount) {
	const board = Array.from({ length: width }, () =>
		Array.from({ length: height }, () => ({
			isMine: false,
			isOpen: false,
			isFlagged: false,
			neighborMines: 0,
		}))
	);

	let minesPlaced = 0;
	while (minesPlaced < minesCount) {
		const randomRow = Math.floor(Math.random() * width);
		const randomCol = Math.floor(Math.random() * height);

		if (!board[randomRow][randomCol].isMine) {
			board[randomRow][randomCol].isMine = true;
			minesPlaced++;
		}
	}

	for (let row = 0; row < width; row++) {
		for (let col = 0; col < height; col++) {
			if (!board[row][col].isMine) {
				const neighbors = [
					[-1, -1], [-1, 0], [-1, 1],
					[0, -1], [0, 1],
					[1, -1], [1, 0], [1, 1],
				];

				let mineCount = 0;
				neighbors.forEach(([dx, dy]) => {
					const newRow = row + dx;
					const newCol = col + dy;

					if (
						newRow >= 0 &&
						newRow < width &&
						newCol >= 0 &&
						newCol < height &&
						board[newRow][newCol].isMine
					) {
						mineCount++;
					}
				});

				board[row][col].neighborMines = mineCount;
			}
		}
	}

	return board;
}

const Minesweeper = ({route}) => {
		const { width, height } = route.params;
		const minesCount = Math.ceil((width * height) * 0.15);

		const [board, setBoard] = useState(initializeBoard(width, height, minesCount));
		const [flagMode, setFlagMode] = useState(false);
		const [gameOver, setGameOver] = useState(false);
		const [win, setWin] = useState(false);

		useEffect(() => {
			checkWin();
		}, [board]);

	function toggleFlagMode() {
		setFlagMode(!flagMode);
	}

	function revealCell(row, col) {
		if (board[row][col].isOpen || board[row][col].isFlagged || gameOver || win) {
			return;
		}

		const updatedBoard = [...board];
		updatedBoard[row][col].isOpen = true;
		setBoard(updatedBoard);

		if (!board[row][col].isMine && board[row][col].neighborMines === 0) {
			const neighbors = [
				[-1, -1], [-1, 0], [-1, 1],
				[0, -1], [0, 1],
				[1, -1], [1, 0], [1, 1],
			];

			neighbors.forEach(([dx, dy]) => {
				const newRow = row + dx;
				const newCol = col + dy;

				if (
					newRow >= 0 &&
					newRow < width &&
					newCol >= 0 &&
					newCol < height
				) {
					revealCell(newRow, newCol);
				}
			});
		}

		if (board[row][col].isMine) {
			setGameOver(true);
			Alert.alert('Вы проиграли', 'Вы попали на мину!');
		}
	}

	function handleFlagToggle(row, col) {
		if (!board[row][col].isOpen && !gameOver && !win) {
			const updatedBoard = [...board];
			updatedBoard[row][col].isFlagged = !board[row][col].isFlagged;
			setBoard(updatedBoard);
		}
	}

	function checkWin() {
		const totalCells = width * height;
		let revealedCells = 0;

		for (let row = 0; row < width; row++) {
			for (let col = 0; col < height; col++) {
				if (board[row][col].isOpen) {
					revealedCells++;
				}
			}
		}

		if (revealedCells === totalCells - minesCount) {
			setWin(true);
			setGameOver(true);
			Alert.alert('Поздравляем', 'Вы выиграли!');
		}
	}

	function renderBoard() {
		return (
			<View style={styles.board}>
				{board.map((row, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{row.map((cell, colIndex) => (
							<TouchableOpacity
								key={colIndex}
								style={[
									styles.cell,
									cell.isOpen && styles.openCell,
									cell.isMine && cell.isOpen && styles.mineCell,
									cell.isFlagged && !cell.isOpen && styles.flaggedCell,
								]}
								onPress={() => {
									if (flagMode) {
										handleFlagToggle(rowIndex, colIndex);
									} else {
										revealCell(rowIndex, colIndex);
									}
								}}
							>
								{cell.isOpen && !cell.isMine && cell.neighborMines > 0 && (
									<Text style={styles.mineCount}>{cell.neighborMines}</Text>
								)}
								{cell.isFlagged && !cell.isOpen && <Text style={styles.flag}>🚩</Text>}
								{cell.isOpen && cell.isMine && <Text style={styles.mine}>💣</Text>}
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Minesweeper</Text>
			{renderBoard()}
			<Button title={`Flag Mode: ${flagMode ? 'ON' : 'OFF'}`} onPress={toggleFlagMode} />
			<Button title="New Game" onPress={() => resetGame()} />
		</View>
	);

	function resetGame() {
		setBoard(initializeBoard(width, height, minesCount));
		setGameOver(false);
		setWin(false);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	board: {
		flexDirection: 'column',
		marginBottom: 20,
	},
	row: {
		flexDirection: 'row',
	},
	cell: {
		width: 36,
		height: 36,
		borderWidth: 1,
		borderColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f0f0f0',
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.2)',
				shadowOpacity: 0.5,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0,
				},
			},
			android: {
				elevation: 3,
			},
		}),
	},
	openCell: {
		backgroundColor: '#fff',
	},
	mineCell: {
		backgroundColor: '#dcdcdc',
	},
	mineCount: {
		color: '#007bff',
		fontSize: 16,
	},
	mine: {
		color: 'red',
		fontSize: 20,
	},
	flag: {
		color: 'green',
		fontSize: 16,
	},
	flaggedCell: {
		backgroundColor: '#e1e1e1',
	},
});

export default Minesweeper;
