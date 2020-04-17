import React from 'react';
import {
    Image,
    SafeAreaView,
    Text
} from 'react-native';

import MyLayout from '../constants/Layout';
import noImage from '../../assets/no-image.png';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <SafeAreaView style={[MyLayout.detailContainer]}>
            <Text style={[MyLayout.detailTitle]}>{this.props.navigation.state.params.title}</Text>
            <Text style={[MyLayout.detailType]}>{this.props.navigation.state.params.type}</Text>
            <Image
                style={[MyLayout.detailImage]}
                resizeMode="cover"
                source={this.props.navigation.state.params.image==""?noImage:{uri:`data:image/png;base64,${this.props.navigation.state.params.image}`}} />
            <Text style={[MyLayout.detailSubtitle]}>Ingredients</Text>
            <Text style={[MyLayout.detailDesc]}>{this.props.navigation.state.params.ingredients?this.props.navigation.state.params.ingredients:"N/A"}</Text>
            <Text style={[MyLayout.detailSubtitle]}>Steps</Text>
            <Text style={[MyLayout.detailDesc]}>{this.props.navigation.state.params.steps?this.props.navigation.state.params.steps:"N/A"}</Text>
        </SafeAreaView>
        );
    }
}
