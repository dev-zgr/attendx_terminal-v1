import {Text, View, StyleSheet} from "react-native";

export const InputHeaderMetaComponent = ({children}) => {
    return (
        <Text style={styles.inputSectionHeader}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    inputSectionHeader: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'rgba(8,51,68,0.96)',
        textAlign: 'left',
        marginHorizontal: 30,
        marginVertical: 20,
    }
});