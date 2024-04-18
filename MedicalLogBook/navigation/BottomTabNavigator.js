import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/AccountScreen";
import HomeScreen from "../screens/HomeScreen";
import LogbookScreen from "../screens/LogbookScreen";
import ReportsScreen from "../screens/ReportsScreen";
import SupportScreen from "../screens/SupportScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home"; // Icon for Screen1
          } else if (route.name === "Logbook") {
            iconName = "list"; // Icon for Screen2
          } else if (route.name === "Reports") {
            iconName = "user"; // Icon for Screen3
          } else if (route.name === "Account") {
            iconName = "user"; // Icon for Screen3
          } else if (route.name === "Support") {
            iconName = "info-circle"; // Icon for Screen3
          }

          // Return the icon component
          return <Icon name={iconName} size={16} color={color} />;
        },
        tabBarStyle: { paddingTop: 8 },
        activeTintColor: "blue", // Change the color of the active tab here
        inactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: isDarkMode ? "black" : "white",
        },
        headerTitleStyle: {
          color: isDarkMode ? "white" : "black",
        },
      })}
      safeAreaInsets={{ top: 0, bottom: 12 }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Logbook" component={LogbookScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
