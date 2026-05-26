import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SubcategoryScreen from './src/screens/SubcategoryScreen';
import SummaryListScreen from './src/screens/SummaryListScreen';
import SummaryDetailScreen from './src/screens/SummaryDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerStyle: { backgroundColor: '#1a365d' }, headerTintColor: '#fff' }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mobile Learning' }} />
        <Stack.Screen name="Subcategories" component={SubcategoryScreen}
          options={({ route }: any) => ({ title: route.params.category.name })} />
        <Stack.Screen name="Summaries" component={SummaryListScreen}
          options={({ route }: any) => ({ title: route.params.subcategory.name })} />
        <Stack.Screen name="SummaryDetail" component={SummaryDetailScreen} options={{ title: 'Resumo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
