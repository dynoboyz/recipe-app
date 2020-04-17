import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { TextField } from 'react-native-material-textfield';
import { View, Icon } from 'native-base';

import MyLayout from '../constants/Layout';
import MyColor from '../constants/Colors';
import noImage from '../../assets/no-image.png';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { image: "" }
        this.props.navigation.setParams({image: ""})
    }

    openCameraAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
        if (permissionResult.granted === false) {
          Alert("Permission is required for recipe photo!");
          return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.2,
        });
      
        if (!result.cancelled) {
            this.setState({ image: result.base64 });
            this.props.navigation.setParams({image: result.base64})
        } else {
            this.setState({ image: "" });
            this.props.navigation.setParams({image: ""})
        }
    };

    openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
  
        if (permissionResult.granted === false) {
            Alert("Permission is required for recipe photo!");
            return;
        }
  
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.2,
        });
      
        if (!result.cancelled) {
            this.setState({ image: result.base64 });
            this.props.navigation.setParams({image: result.base64})
        } else {
            this.setState({ image: "" });
            this.props.navigation.setParams({image: ""})
        }
    }
    
    checkTitle(title) {
        let errors = {};
  
        this.props.navigation.setParams({title: title})
        if (title == "") {
            errors['recipename'] = 'Should not be empty';
        }
  
        this.setState({ errors });
    }

    render() {
        let { errors = {} } = this.state;
        let datatypesval = this.props.navigation.state.params.datatypesval
        
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={MyLayout.keyboardFlex} >
                <ScrollView
                    overScrollMode='never'
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                    <SafeAreaView style={[MyLayout.editContainer]}>
                        <TextField
                            label='Recipe name'
                            value={this.props.navigation.state.params.title}
                            containerStyle={[MyLayout.editPlaceholder]}
                            tintColor={MyColor.PrimaryColor}
                            error={errors.recipename}
                            onChangeText={text => this.checkTitle(text)}/>
                        <Dropdown
                            label='Recipe Type'
                            data={JSON.parse(datatypesval)}
                            value={this.props.navigation.state.params.type}
                            containerStyle={[MyLayout.editPlaceholder]}
                            onChangeText={text => this.props.navigation.setParams({type: text})}/>
                        <ImageBackground
                            style={[MyLayout.editImage]}
                            resizeMode="cover"
                            source={this.state.image==""?noImage:{uri:`data:image/png;base64,${this.state.image}`}} >
                            <View style={[MyLayout.editImageContent]}>
                                <TouchableOpacity onPress={this.openImagePickerAsync} style={[MyLayout.editImageButton]}>
                                    <Icon name="md-photos" style={[MyLayout.editCamera]}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.openCameraAsync} style={[MyLayout.editImageButton]}>
                                    <Icon name="camera" style={[MyLayout.editCamera]}/>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <TextField
                            label='Ingredients'
                            value={this.props.navigation.state.params.ingredients}
                            containerStyle={[MyLayout.editPlaceholder]}
                            tintColor={MyColor.PrimaryColor}
                            multiline={true}
                            onChangeText={text => this.props.navigation.setParams({ingredients: text})}/>
                        <TextField
                            label='Steps'
                            value={this.props.navigation.state.params.steps}
                            containerStyle={[MyLayout.editPlaceholder]}
                            tintColor={MyColor.PrimaryColor}
                            multiline={true}
                            onChangeText={text => this.props.navigation.setParams({steps: text})}/>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}