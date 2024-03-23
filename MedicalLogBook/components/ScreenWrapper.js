import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, View } from 'react-native';

export default function ScreenWrapper({ children }) {
    let StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : Platform.OS === 'ios' ? 30 : 0;

    return (
        <View style={{ paddingTop: StatusBarHeight }}>
            {children}
        </View>
    );
}
