import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, AppState} from 'react-native';
import {useEffect, useState} from "react";

export default function App() {
  const[appState, setAppState] = useState(AppState.currentState)
  const showAlert = () => {
    alert("hello world!")
  }

  const handleAppStateChange = (nextAppState) => {
    if (appState === 'active' && nextAppState === 'inactive') {
      alert('onPause');
    }
    setAppState(nextAppState);
  }

  useEffect(() => {

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Артёменко Владислав Сергеевич</Text>
      <StatusBar style="auto" />
      <Button title={"hello"} onPress={showAlert}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(37,29,29,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
