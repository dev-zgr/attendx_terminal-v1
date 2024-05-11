import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const DEFAULT_INFO = {statusCode: 0 ,message: ""};

export const AttendanceScreen = ({ navigation, route }) => {
    const session = route.params.session;
    const [studentNumber, setStudentNumber] = useState("");
    const [info, setInfo] = useState(DEFAULT_INFO);

    useEffect(() => {
        const handleLogin = async (studentNumber) =>{
            try{
                const response =
                    await fetch(`http://localhost:8080/api/v1/session?session-id=${session.sessionId}&student-id=${studentNumber}`,{
                        method: "PATCH"
                    });
                switch (response.status) {
                    case 202:
                        setInfo({
                            statusCode: response.status,
                            message: `You've successfully AttendX to ${session.courseCode}`
                        });
                        break;
                    case 400:
                        setInfo({
                            statusCode: response.status,
                            message: `Student is not Enrolled to Course ${session.courseCode}!`
                        });
                        break;
                    case 404:
                        setInfo({
                            statusCode: response.status,
                            message: `${session.courseCode} not found. Please try again later.`
                        });
                        break;
                    case 500:
                        setInfo({
                            statusCode: response.status,
                            message: "Internal server error. Please try again later."
                        });
                        break;
                    case 417:
                        setInfo({
                            statusCode: response.status,
                            message: "Expectation failed. Please try again later."
                        });
                        break;
                    default:
                        break;
                }

                setTimeout(() => {
                    setInfo(DEFAULT_INFO);
                }, 5000);

            }catch (error){
                setInfo({
                    statusCode: response.status,
                    message: "Internal server error. Please try again later."
                });
            }
        }

        if (studentNumber.length === 8) {
            handleLogin(studentNumber);
            setStudentNumber("");
            console.log(info);
        }
    }, [studentNumber]);



    const handleNumberEntry = (text) => {
        // Replace non-digit characters and limit input to 10 characters
        const formattedText = text.replace(/\D/g, '').slice(0, 10);
        setStudentNumber(formattedText);
    }

    // Format the entered number with delimiters
    const formattedNumber = studentNumber
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{1,2})?(\d{1,3})?/, (_, p1, p2, p3) => {
            let result = '';
            if (p1) result += p1;
            if (p2) result += '-' + p2;
            if (p3) result += '-' + p3;
            return result;
        });

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.headerOne}>
                {session.courseName}
            </Text>
            <Text style={styles.headerTwo}>
                {`Enter your number to AttendX to ${session.courseName}`}
            </Text>
            <TextInput
                value={formattedNumber}
                onChangeText={handleNumberEntry}
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
            />
            {
               info.statusCode === 202 && <Text style={styles.infoPositive}>
                    {info.message}
                </Text>
            }
            {
                (info.statusCode === 400 ||
                info.statusCode === 417 ||
                info.statusCode === 404 ||
                info.statusCode === 400) && <Text style={styles.infoNegative}>
                    {info.message}
                </Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    headerOne: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: 20,
        marginTop: 200,
        textAlign: "center"
    },
    headerTwo: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'rgba(8,51,68,0.96)',
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 3,
        borderColor: 'rgba(8,51,68,0.96)',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 24,
        fontWeight: "bold",
        textAlign:"center",
        width: 200
    },
    infoPositive: {
        color: "green",
        fontSize: 14,
        textAlign: "center",
        marginTop: 8
    },
    infoNegative: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginTop: 8
    }
});
