import React, { useState } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const Minesweeper = () => {
	const rows = 5;
	const cols = 5;
	const minesCount = 5;

	const [board, setBoard] = useState(initializeBoard(rows, cols, minesCount));

	function initializeBoard(rows, cols, minesCount) {
		const board = Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => ({
				isMine: false,
				isOpen: false,
				isFlagged: false,
				neighborMines: 0,
			}))
		);

		let minesPlaced = 0;
		while (minesPlaced < minesCount) {
			const randomRow = Math.floor(Math.random() * rows);
			const randomCol = Math.floor(Math.random() * cols);

			if (!board[randomRow][randomCol].isMine) {
				board[randomRow][randomCol].isMine = true;
				minesPlaced++;
			}
		}

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				if (!board[row][col].isMine) {
					const neighbors = [
						[-1, -1], [-1, 0], [-1, 1],
						[0, -1],           [0, 1],
						[1, -1], [1, 0], [1, 1],
					];

					let mineCount = 0;
					neighbors.forEach(([dx, dy]) => {
						const newRow = row + dx;
						const newCol = col + dy;

						if (
							newRow >= 0 &&
							newRow < rows &&
							newCol >= 0 &&
							newCol < cols &&
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


	function revealCell(row, col) {
		if (board[row][col].isOpen || board[row][col].isFlagged) {
			return;
		}

		const updatedBoard = [...board];
		updatedBoard[row][col].isOpen = true;
		setBoard(updatedBoard);

		if (!board[row][col].isMine && board[row][col].neighborMines === 0) {
			const neighbors = [
				[-1, -1], [-1, 0], [-1, 1],
				[0, -1],           [0, 1],
				[1, -1], [1, 0], [1, 1],
			];

			neighbors.forEach(([dx, dy]) => {
				const newRow = row + dx;
				const newCol = col + dy;

				if (
					newRow >= 0 &&
					newRow < rows &&
					newCol >= 0 &&
					newCol < cols
				) {
					revealCell(newRow, newCol);
				}
			});
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
								]}
								onPress={() => revealCell(rowIndex, colIndex)}
							>
								{cell.isOpen && !cell.isMine && cell.neighborMines > 0 && (
									<Text style={styles.mineCount}>{cell.neighborMines}</Text>
								)}
								{cell.isFlagged && <Text style={styles.flag}>🚩</Text>}
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
			<Button title="New Game" onPress={() => setBoard(initializeBoard())} />
		</View>
	);
};

const styles = StyleSheet.create({
	board: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
	cell: {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: '#ccc',
		alignItems: 'center',
		justifyContent: 'center',
	},
	openCell: {
		backgroundColor: '#eee',
	},
	mineCell: {
		backgroundColor: 'red',
	},
	mineCount: {
		color: 'blue',
	},
	mine: {
		color: 'red',
	},
	flag: {
		color: 'green',
	},
});


export default Minesweeper;
