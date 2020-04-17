import React from 'react';
import {
    Alert,
    AsyncStorage,
    TouchableOpacity,
    View
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';

import MyLayout from '../constants/Layout';
import MyColors from '../constants/Colors';

import Main from '../components/Main';
import Detail from '../components/Detail';
import Edit from '../components/Edit';
import Add from '../components/Add';

const MainStack = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: ({navigation}) => ({
            title: 'My Recipe',
            headerStyle: {
              backgroundColor: MyColors.PrimaryColor,
            },
            headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'bold',
            },
            headerTintColor: MyColors.TertiaryColor,
            headerRight: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Add', navigation.state.params)
                }>
                    <Icon 
                        name="add"
                        size={32}
                        color={MyColors.White}
                        containerStyle={{paddingLeft: 10}} />
                </TouchableOpacity>
            )
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({navigation}) => ({
            title: 'My Recipe Detail',
            headerStyle: {
              backgroundColor: MyColors.PrimaryColor,
            },
            headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'bold',
            },
            headerTintColor: MyColors.TertiaryColor,
            headerRight: () => (
                <TouchableOpacity onPress={() =>
                    navigation.navigate('Edit', navigation.state.params)
                }>
                    <Icon 
                        name="edit"
                        size={32}
                        color={MyColors.White}
                        containerStyle={{paddingLeft: 10}} />
                </TouchableOpacity>
            )
        })
    },
    Edit: {
        screen: Edit,
        navigationOptions: ({navigation}) => ({
            title: 'Update My Recipe',
            headerStyle: {
              backgroundColor: MyColors.PrimaryColor,
            },
            headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'bold',
            },
            headerTintColor: MyColors.TertiaryColor,
            headerRight: () => (
                <View style={[MyLayout.flexRow]}>
                    <TouchableOpacity onPress={() => 
                        Alert.alert(
                            "Delete Recipe",
                            `Confirm to delete recipe for ${navigation.state.params.title}?` ,
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "DELETE",
                                    onPress: () => {
                                        var data = []
                                        const _retrieveData = async () => {
                                            try {
                                                var asData = await AsyncStorage.getItem('DATA');
                                                if (asData !== null) {
                                                    JSON.parse(asData).forEach(recipe => {
                                                        if (recipe.id != navigation.state.params.id) {
                                                            data.push(recipe)
                                                        }
                                                    });
                                                }
                                            } catch (error) {
                                                Alert.alert(`Error getting recipe from storage`, `${error}`);
                                            }
                                        };
                                        _retrieveData().then(_ => {
                                            const _storeData = async () => {
                                                try {
                                                    await AsyncStorage.setItem('DATA', JSON.stringify(data));
                                                } catch (error) {
                                                    Alert.alert(`Error update recipe`, `${error}`);
                                                }
                                            };
                                            _storeData().then(_ => {
                                                navigation.navigate('Main')
                                            });
                                        });
                                    }
                                }
                            ],
                            { cancelable: false }
                        )
                    }>
                        <Icon 
                            name="delete"
                            size={32}
                            color={MyColors.White}
                            containerStyle={{paddingLeft: 10}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={navigation.state.params.title == ""}
                        onPress={() => 
                            Alert.alert(
                                "Save Recipe",
                                `Confirm to update recipe for ${navigation.state.params.title}?` ,
                                [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                { 
                                    text: "SAVE", 
                                    onPress: () => {
                                        var data = []
                                        const _retrieveData = async () => {
                                            try {
                                                var asData = await AsyncStorage.getItem('DATA');
                                                if (asData !== null) {
                                                    JSON.parse(asData).forEach(recipe => {
                                                        if (recipe.id == navigation.state.params.id) {
                                                            data.push({
                                                                id: navigation.state.params.id,
                                                                title: navigation.state.params.title,
                                                                type: navigation.state.params.type,
                                                                image: navigation.state.params.image,
                                                                ingredients: navigation.state.params.ingredients,
                                                                steps: navigation.state.params.steps
                                                            })
                                                        } else {
                                                            data.push(recipe)
                                                        }
                                                    });
                                                }
                                            } catch (error) {
                                                Alert.alert(`Error getting recipe from storage`, `${error}`);
                                            }
                                        };
                                        _retrieveData().then(_ => {
                                            const _storeData = async () => {
                                                try {
                                                    await AsyncStorage.setItem('DATA', JSON.stringify(data));
                                                } catch (error) {
                                                    Alert.alert(`Error update recipe`, `${error}`);
                                                }
                                            };
                                            _storeData().then(_ => {
                                                navigation.navigate('Detail', navigation.state.params)
                                            });
                                        });
                                    } 
                                }
                                ],
                                { cancelable: false }
                            )
                    }>
                        <Icon 
                            name="save"
                            size={32}
                            color={MyColors.White}
                            containerStyle={{paddingLeft: 10}} />
                    </TouchableOpacity>
                </View>
            )
        })
    },
    Add: {
        screen: Add,
        navigationOptions: ({navigation}) => ({
            title: 'Add New Recipe',
            headerStyle: {
              backgroundColor: MyColors.PrimaryColor,
            },
            headerTitleStyle: {
                fontSize: 16,
                fontWeight: 'bold',
            },
            headerTintColor: MyColors.TertiaryColor,
            headerRight: () => (
                <TouchableOpacity
                    disabled={navigation.state.params.title == ""}
                    onPress={() => 
                        Alert.alert(
                            "Add New Recipe",
                            `Confirm to add recipe for ${navigation.state.params.title}?` ,
                            [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            { 
                                text: "SAVE", 
                                onPress: () => {
                                    var data = []
                                    const _retrieveData = async () => {
                                        try {
                                            var asData = await AsyncStorage.getItem('DATA');
                                            if (asData !== null) {
                                                var id = 1;
                                                JSON.parse(asData).forEach(recipe => {
                                                    data.push({
                                                        id: id.toString,
                                                        title: recipe.title,
                                                        type: recipe.type,
                                                        image: recipe.image,
                                                        ingredients: recipe.ingredients,
                                                        steps: recipe.steps
                                                    })
                                                    id++
                                                });
                                                data.push({
                                                    id: id.toString,
                                                    title: navigation.state.params.title,
                                                    type: navigation.state.params.type,
                                                    image: navigation.state.params.image,
                                                    ingredients: navigation.state.params.ingredients,
                                                    steps: navigation.state.params.steps
                                                })
                                            }
                                        } catch (error) {
                                            Alert.alert(`Error getting recipe from storage`, `${error}`);
                                        }
                                    };
                                    _retrieveData().then(_ => {
                                        const _storeData = async () => {
                                            try {
                                                await AsyncStorage.setItem('DATA', JSON.stringify(data));
                                            } catch (error) {
                                                Alert.alert(`Error add recipe`, `${error}`);
                                            }
                                        };
                                        _storeData().then(_ => {
                                            navigation.navigate('Main')
                                        });
                                    });
                                } 
                            }
                            ],
                            { cancelable: false }
                        )
                }>
                    <Icon 
                        name="save"
                        size={32}
                        color={MyColors.White}
                        containerStyle={{paddingLeft: 10}} />
                </TouchableOpacity>
            )
        })
    }
})

const PrimaryNav = createStackNavigator(
    {
        MainStack: { screen: MainStack }
    }, {
        headerMode: 'none',
        mode: 'none',
        initialRouteName: 'MainStack'
    }
)

const App = createAppContainer(PrimaryNav);

export default class RootNavigator extends React.Component {
    render() {
        return <App />;        
    }
}