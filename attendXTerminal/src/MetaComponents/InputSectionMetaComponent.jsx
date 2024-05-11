import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';


export const InputSectionMetaComponent = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    }
});