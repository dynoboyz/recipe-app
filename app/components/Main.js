import React from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SelectableChips from 'react-native-chip/SelectableChips'
import {parseString} from 'xml2js'

import MyLayout from '../constants/Layout';
import MyColors from '../constants/Colors';
import noImage from '../../assets/no-image.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false, isReload: false, chips: [], persistData: [], data: [], datatypes: [], datatypesval: {}}
  }

  componentWillMount(){
    // get data from database
    if (!this.state.isReady) {
      var isDataExist = false;
      var data = []
      var datatypes = []
      var datatypesval = []
      const _retrieveData = async () => {
        try {
          var asData = await AsyncStorage.getItem('DATA');
          if (asData !== null) {
            isDataExist = true;
            var id = 1;
            JSON.parse(asData).forEach(recipe => {
              data.push({
                id: id.toString(),
                title: recipe.title,
                type: recipe.type,
                image: recipe.image,
                ingredients: recipe.ingredients,
                steps: recipe.steps
              })
              datatypes.push(recipe.type);
              datatypesval.push({value: recipe.type})
              id++
            });
            datatypes = datatypes.filter((datatypes, index, self) =>
              index === self.findIndex((t) => (t === datatypes)))
  
            datatypesval = datatypesval.filter((datatypesval, index, self) =>
              index === self.findIndex((t) => (t.value === datatypesval.value)))
          }
        } catch (error) {
          Alert.alert(`Error getting recipe from storage`, `${error}`);
        }
      };
      _retrieveData().then(_ => {
        if (isDataExist && Object.keys(data).length > 0) {
          this.setState({isReady:true, datatypes: datatypes, datatypesval: JSON.stringify(datatypesval), data: JSON.stringify(data), persistData: JSON.stringify(data)})
          this.props.navigation.setParams({datatypesval: JSON.stringify(datatypesval)})
        } else {
          // if data not exist then query from server
          var url = "http://api.dynoboyz.com/recipetypes.xml"
          fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
              var data = []
              var datatypes = []
              var datatypesval = []
              parseString(responseText, {trim: true}, function (err, result) {
                var id = 1;
                result.root.recipe.forEach(recipe => {
                  data.push({
                    id: id.toString(),
                    title: recipe.title[0],
                    type: recipe.type[0],
                    image: recipe.image[0],
                    ingredients: recipe.ingredients[0],
                    steps: recipe.steps[0]})
                  
                  datatypes.push(recipe.type[0]);
                  datatypesval.push({value: recipe.type})
                  id++
                });
      
                datatypes = datatypes.filter((datatypes, index, self) =>
                  index === self.findIndex((t) => (t === datatypes)))
  
                datatypesval = datatypesval.filter((datatypesval, index, self) =>
                  index === self.findIndex((t) => (t.value === datatypesval.value)))
                
                return result;
              });
    
              const _storeData = async () => {
                try {
                  await AsyncStorage.setItem('DATA', JSON.stringify(data));
                } catch (error) {
                  Alert.alert(`Error saving the recipe`, `${error}`);
                }
              };
              _storeData().then(_ => {
                this.setState({isReady:true, datatypes: datatypes, datatypesval: JSON.stringify(datatypesval), data: JSON.stringify(data), persistData: JSON.stringify(data)})
                this.props.navigation.setParams({datatypesval: JSON.stringify(datatypesval)})
              });
            })
            .catch((error) => {
              Alert.alert(`Error fetching the recipe`, `${error}`);
            })
        }
      });
    }
  }

  reloadDataFromStorage (isReload) {
    if (this.state.isReady && !isReload) {
      this.setState({isReload:true})
      var data = []
      const _retrieveData = async () => {
        try {
          var asData = await AsyncStorage.getItem('DATA');
          if (asData !== null) {
            var id = 1;
            JSON.parse(asData).forEach(recipe => {
              data.push({
                id: id.toString(),
                title: recipe.title,
                type: recipe.type,
                image: recipe.image,
                ingredients: recipe.ingredients,
                steps: recipe.steps
              })
              id++
            });
          }
        } catch (error) {
          Alert.alert(`Error getting recipe from storage`, `${error}`);
        }
      };

      _retrieveData().then(_ => {
        if (Object.keys(data).length > 0) {
          this.setState({isReady: true, isReload: false, data: JSON.stringify(data), persistData: JSON.stringify(data)})
        }
      });
    }
  };

  addRecipe () {
    Alert.alert("Add new recipe");
  };

  chipsChanged(chips) {
    this.setState({isReady:false, data: []})
    var data = JSON.parse(this.state.persistData)
    var newData = []
    data.forEach(recipe => {
      chips.forEach(item => {
        if (recipe.type == item) {
          newData.push(recipe)
        }
      })
    })
    this.setState({isReady:true, data: JSON.stringify(newData)})
  }

  emptyRecipe = () => {
    return <View style={[MyLayout.loadingContainer]}>
      <Text style={[MyLayout.emptyRecipe]}>No Recipe Found</Text>
    </View>
  };

  render() {
    this.props.navigation.addListener(
      'didFocus',
        payload => {
          this.reloadDataFromStorage(this.state.isReload)
        }
    );
    if (!this.state.isReady) {
      return <View style={[MyLayout.loadingContainer]}>
        <ActivityIndicator size="large" color={MyColors.PrimaryColor} />
        <Text style={MyLayout.loading}>Loading Recipe...</Text>
      </View>
    }
    return (
      <SafeAreaView style={[MyLayout.container]}>
        <SelectableChips 
          initialChips={this.state.datatypes}
          onChangeChips={(chips) => this.chipsChanged(chips)} 
          chipStyle={[MyLayout.chip]}
          valueStyle={[MyLayout.chipValue]}
          valueStyleSelected={[MyLayout.chipValueSelected]}
          chipStyleSelected={[MyLayout.chipSelected]}
          alertRequired={false}/>
        <FlatList
          data={JSON.parse(this.state.data)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Detail', {id: item.id, title: item.title, type: item.type, image: item.image, ingredients: item.ingredients, steps: item.steps, datatypesval: this.state.datatypesval} )}
              style={[MyLayout.item]}>
              <View style={[MyLayout.itemContent]}>
                <Text style={[MyLayout.title]} numberOfLines={1}>{item.title}</Text>
                <Text style={[MyLayout.type]} numberOfLines={1}>{item.type}</Text>
              </View>
              <Image
                  style={[MyLayout.itemImage]}
                  resizeMode="cover"
                  source={item.image==''?noImage:{uri:`data:image/png;base64,${item.image}`}} />
            </TouchableOpacity> 
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={this.emptyRecipe}
        />
      </SafeAreaView>
    );
  }
}
