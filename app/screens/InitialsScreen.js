import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ImageBackground, InteractionManager, Linking, Platform, SafeAreaView, BackHandler, StatusBar, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScaledSheet } from "react-native-size-matters";


class InitialScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.navigation.push('CameraScreen')
         
    }


    componentWillUnmount() {
        this._isMounted = false;
    }


    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#00BAF7"
                    barStyle={'dark-content'}
                />
                <View>
                    <Text>Hello</Text>
                </View>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: '#00BAF7',
        flex: 1
    },
    stretch: {
        width: '100%',
        height: '100%'
    },
    logo: {
        borderRadius: 8,
        width: 250,
        height: 145,
        position: 'relative',
        marginTop: 0
    },
    centerAlign: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default InitialScreen;