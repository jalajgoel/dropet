import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import dropDownData from '../utils/cities.json';
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');

    const onFindDistance = () => {
        if (!location1 || !location2) {
            Alert.alert('All fields required.');
            return;
        }

        if (location1 === location2) {
            Alert.alert('Start and Destination both are same. Please select different locations');
            return;
        }

        let source = dropDownData.filter((item) => item.label.toLowerCase().trim() === location1.toLowerCase().trim());
        let destination = dropDownData.filter((item) => item.label.toLowerCase().trim() === location2.toLowerCase().trim());

        let coordinates = [...source, ...destination].map((item) => {
            return {
                latitude: item.lat,
                longitude: item.lng
            };
        });

        //navigate to Map Page and pass props
        navigation.navigate('Map', { coordinates: coordinates, locationsNames: { source: location1, destination: location2 } });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={styles.headStyle}>DROP-ET</Text>
            <View style={styles.formStyle}>
                <Text>Start location</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dropDownData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder="Select location"
                    searchPlaceholder="Search..."
                    value={location1}
                    onChange={(item) => {
                        setLocation1(item.label);
                    }}
                />

                <Text>Destination location</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dropDownData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="label"
                    placeholder="Select location"
                    searchPlaceholder="Search..."
                    value={location2}
                    onChange={(item) => {
                        setLocation2(item.label);
                    }}
                />
                <Pressable style={styles.btnStyle} onPress={onFindDistance}>
                    <Text style={styles.btnText}>Find distance</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    headStyle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingVertical: 12
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 12,
        height: 40,
        borderRadius: 4,
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    formStyle: {
        marginHorizontal: 24,
        marginVertical: 12
    },
    btnStyle: {
        marginVertical: 12,
        backgroundColor: 'green',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    dropdown: {
        marginVertical: 12,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    },
    icon: {
        marginRight: 5
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textItem: {
        flex: 1,
        fontSize: 16
    },
    placeholderStyle: {
        fontSize: 16
    },
    selectedTextStyle: {
        fontSize: 16
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    }
});

export default HomeScreen;
