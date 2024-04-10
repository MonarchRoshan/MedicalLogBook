import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraButton() {
  const [hasPermission, setHasPermission] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting for camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <TouchableOpacity onPress={() => console.log('Open camera')}>
          <View style={styles.button}>
            <MaterialIcons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Open Camera</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
