import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { getSpecificUserService } from "../services/userService";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import moment from "moment";

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
    const [state, setState] = useState({
      cpd: 0,
      admissions: 0,
      procedure: 0,
      clinics: 0,
      week: 0,
      month: 0,
      total: 0,
    });
    const [loading, setLoading] = useState(true);

    const userDetails = useSelector((state) => state.user.user.userDetails);

    const getThisWeekEvents = (data) => {
      const startDateOfWeek = moment().startOf("week").toDate();
      const endDateOfWeek = moment().endOf("week").toDate();
      return data.filter((event) => {
        const eventStartDate = moment(event.startDate).toDate();
        return (
          eventStartDate >= startDateOfWeek && eventStartDate <= endDateOfWeek
        );
      })?.length;
    };

    const getThisMonthEvents = (data) => {
      const startDateOfMonth = moment().startOf("month").toDate();
      const endDateOfMonth = moment().endOf("month").toDate();

      // Filter events that fall within the current month
      return data.filter((event) => {
        const eventStartDate = moment(event.startDate).toDate();
        return (
          eventStartDate >= startDateOfMonth && eventStartDate <= endDateOfMonth
        );
      })?.length;
    };

    useEffect(() => {
      let totalLength =
        userDetails.cpd.length +
        userDetails.admissions.length +
        userDetails.procedure.length +
        userDetails.clinics.length;

      const allData = [
        ...userDetails.cpd,
        ...userDetails.admissions,
        ...userDetails.procedure,
        ...userDetails.clinics,
      ];

      setState({
        ...state,
        cpd: userDetails.cpd.length,
        admissions: userDetails.admissions.length,
        procedure: userDetails.procedure.length,
        clinics: userDetails.clinics.length,
        total: totalLength,
        week: getThisWeekEvents(allData),
        month: getThisMonthEvents(allData),
      });
    }, [userDetails]);

    // if (loading) return <Loader />;

    return (
      <View className={styles.container}>
        <View>
          <Text className="text-xl font-bold mb-2">Activity analysis</Text>
        </View>
        <View className={`flex flex-row  mb-2 justify-between`}>
          <SmallDataCard title="Week" value={state.week} />
          <SmallDataCard title="Month" value={state.month} />
          <SmallDataCard title="Total" value={state.total} />
        </View>

        <View>
          <Text className="text-xl font-bold mb-2">Top logbook categories</Text>
        </View>
        <View className={`flex flex-row flex-wrap justify-between mb-2`}>
          <DataCard title="CPD" value={state.cpd} />
          <DataCard title="Admissions" value={state.admissions} />
        </View>
        <View className={`flex flex-row flex-wrap justify-between `}>
          <DataCard title="Procedures" value={state.procedure} />
          <DataCard title="Clinics" value={state.clinics} />
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
