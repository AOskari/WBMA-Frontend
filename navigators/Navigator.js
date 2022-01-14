import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabScreen = () => {
  const {listEndReached} = useContext(MainContext);

  useEffect(() => {
    console.log(`listEndReached is ${listEndReached}`);
  }, [listEndReached]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: listEndReached ? styles.bottomNavHide : styles.bottomNav,
      })}
    >
      <Tab.Screen name="Home" options={{headerShown: false}} component={Home} />
      <Tab.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />
      {/** Placeholder nav button */}
      <Tab.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Home}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  console.log(`Checking isLoggedIn: ${isLoggedIn}`);
  if (isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Single" component={Single} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Single" component={Single} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    display: 'flex',
    flexWrap: 'nowrap',
    backgroundColor: '#007FFF',
    height: 60,
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    margin: 5,
    position: 'absolute',
    left: 40,
    right: 40,
  },
  bottomNavHide: {
    display: 'none',
  },
  tabBarLabel: {
    fontSize: 15,
  },
});

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen stlye={styles.bottomNav} />
    </NavigationContainer>
  );
};

export default Navigator;
