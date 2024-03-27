import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

export default function HomeScreen() {
  const DataCard = ({ title, value }) => {
    return (
      <View className={`bg-white rounded-lg p-4 shadow-md w-[48%] `}>
        <Text className={`text-xl font-bold mb-1 text-right `}>{value}</Text>
        <Text className={`text-xs font-light  text-right`}>{title}</Text>
      </View>
    );
  };

  const SmallDataCard = ({ title, value }) => {
    return (
      <View className={`bg-white rounded-lg p-4 shadow-md w-[31%] `}>
        <Text className={`text-xl font-bold mb-1 text-right `}>{value}</Text>
        <Text className={`text-xs font-light  text-right`}>{title}</Text>
      </View>
    );
  };

  const Dashboard = () => {
    return (
      <View className={styles.container}>
        <View>
          <Text className="text-xl font-bold mb-2">Activity analysis</Text>
        </View>
        <View className={`flex flex-row  mb-2 justify-between`}>
          <SmallDataCard title="Week" value="123" />
          <SmallDataCard title="Month" value="456" />
          <SmallDataCard title="Total" value="456" />
        </View>

        <View>
          <Text className="text-xl font-bold mb-2">Top logbook categories</Text>
        </View>
        <View className={`flex flex-row flex-wrap justify-between mb-2`}>
          <DataCard title="CPD" value="123" />
          <DataCard title="Admissions" value="456" />
        </View>
        <View className={`flex flex-row flex-wrap justify-between `}>
          <DataCard title="Procedures" value="789" />
          <DataCard title="Clinics" value="101" />
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <Dashboard />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
});
