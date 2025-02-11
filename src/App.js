import React from "react";
import { View, Text, Button } from 'react-native';
import { useLinking, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const prefix = ['http://localhost:8080'];

const config = {
	HomeStack: {
		path: 'stack',
		initialRouteName: 'Profile',
		screens: {
			Home: 'home',
			Profile: {
				path: 'user/:id/:age',
				parse: {
					id: (id) => `there, ${id}`,
					age: Number,
				},
			},
		},
	},
	Settings: 'settings',
	noMatch: '/',
};

export default function App() {
	const ref = React.useRef();

	const { getInitialState } = useLinking(ref, {
		prefixes: prefix,
		config: { ...config },
	});

	const [isReady, setIsReady] = React.useState(false);
	const [initialState, setInitialState] = React.useState();

	React.useEffect(() => {
		Promise.race([getInitialState(), new Promise((resolve) => setTimeout(resolve, 150))])
			.then((state) => {
				if (state !== undefined) {
					setInitialState(state);
				}
				setIsReady(true);
			})
			.catch((e) => console.log(e));
	}, [getInitialState]);

	if (!isReady) {
		return null;
	}

	function Home({ navigation }) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Button
					title="Go to Wojciech's profile"
					onPress={() => navigation.navigate('Profile', { id: 'Wojciech', age: 22 })}
				/>
				<Button title="Go to unknown profile" onPress={() => navigation.navigate('Profile')} />
			</View>
		);
	}

	function Profile({ route }) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Hello {route.params?.id || 'Unknown'}!</Text>
				<Text>Type of age parameter is {route.params?.age ? typeof route.params.age : 'undefined'}</Text>
			</View>
		);
	}

	function Settings() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>This is the Settings Page.</Text>
			</View>
		);
	}

	const HomeStack = () => {
		const MyStack = createStackNavigator();

		return (
			<MyStack.Navigator>
				<MyStack.Screen name="Home" component={Home} />
				<MyStack.Screen name="Profile" component={Profile} />
			</MyStack.Navigator>
		);
	};
	const MyTabs = createBottomTabNavigator();

	return (
		<NavigationContainer initialState={initialState} ref={ref}>
			<MyTabs.Navigator>
				<MyTabs.Screen name="HomeStack" component={HomeStack} />
				<MyTabs.Screen name="Settings" component={Settings} />
			</MyTabs.Navigator>
		</NavigationContainer>
	);
  }