import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { colors } from '../styles/style';


const path = {
    distance: require('../assets/prevention/distance.png'),
    mask: require('../assets/prevention/mask.png'),
    cleaning: require('../assets/prevention/cleaning.png')
}

const prevention_msg = {
    distance: 'Avoid close contact',
    mask: 'Clean your hand often',
    cleaning: 'Wear a mask often'
}

const getPath = (name) => name == 'distance' ? path.distance : name == 'mask' ? path.mask : name == 'cleaning' ? path.cleaning : null
const getMsg = (name) => name == 'distance' ? prevention_msg.distance : name == 'mask' ? prevention_msg.mask : name == 'cleaning' ? prevention_msg.cleaning : null

const ImageComponent = (props) => {
    const { name } = props;
    return <Image source={getPath(name)} />
}

const PreventionView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upper}>

                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.primary,
                    letterSpacing: 1,

                }} >
                    Prevention
                </Text>

            </View>

            <View id="prevention-view" style={styles.prevention_view}>
                <View style={styles.image_container}>
                    <ImageComponent name={'cleaning'} />
                    <Text numberOfLines={2} style={styles.prevention_msg}>
                        {getMsg('cleaning')}</Text>
                </View>
                <View style={styles.image_container}>
                    <ImageComponent name={'distance'} />
                    <Text numberOfLines={2} style={styles.prevention_msg}>
                        {getMsg('distance')}</Text>
                </View>
                <View style={styles.image_container}>
                    <ImageComponent name={'mask'} />
                    <Text numberOfLines={2} style={styles.prevention_msg}>
                        {getMsg('mask')}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 5,
        paddingHorizontal: 20,

    },
    prevention_view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },

    image_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',

        flex: 1
    },
    prevention_msg: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.primary,
        letterSpacing: 0.5,
        fontSize: 15,
    }


})

export default PreventionView;