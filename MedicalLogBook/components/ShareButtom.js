import React from 'react';
import { View, Button, Share, StyleSheet } from 'react-native';

const ShareButton = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Share" onPress={onShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareButton;
