import {InputHeaderMetaComponent} from "../MetaComponents/InputHeaderMetaComponent";
import {InputSectionMetaComponent} from "../MetaComponents/InputSectionMetaComponent";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SessionButtonMetaComponent} from "../MetaComponents/SessionButtonMetaComponent";
import {Text,StyleSheet} from "react-native";

export const SessionsScreen = ({navigation}) => {
    const [todaysSessions, setTodaysSessions] = useState([])
    const [upcomingSessions, setUpcomingSessions] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        const asyncFetchSessions = async () => {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/v1/session', {
                method: 'GET',
                headers: {
                    'Authorization': token
                },
            });
            if(response.status === 200){
                const data = await response.json();
                setTodaysSessions(data.todaySessions);
                setUpcomingSessions(data.nextWeekSessions);
            }else if(response.status === 400){
                setError([...error,{message: 'An error occurred while starting the session.'}])
            }
        }

        asyncFetchSessions().then(r => r).catch(e => setError(e));
    }, [])

    const startAttendance = async (session) => {
        const response = await fetch(`http://localhost:8080/api/v1/session?session-id=${session.sessionId}`, {
            method: 'PUT',
        });
        if(response.status === 202){
            navigation.navigate('AttendanceScreen', {"session": session})
        }else{
            setError([...error,{message: 'An error occurred while starting the session.'}])
        }
    }

    return (
        <>
            <InputSectionMetaComponent>
                <InputHeaderMetaComponent>
                    Today's Sessions
                </InputHeaderMetaComponent>
                {
                    todaysSessions.length > 0 ?
                        todaysSessions.map((session, index) => {
                            return (
                                <SessionButtonMetaComponent
                                    key={index}
                                    courseCode={session.courseCode}
                                    courseName={session.courseName}
                                    courseDate={session.sessionDate}
                                    onPress={() => startAttendance(session)}
                                    enabled={true}
                                />
                            )
                        }) :
                        <Text style={style.infoMessage}>
                            No Session Found
                        </Text>

                }
            </InputSectionMetaComponent>
            <InputSectionMetaComponent>
                <InputHeaderMetaComponent>
                    Upcoming Sessions
                </InputHeaderMetaComponent>
                {
                    upcomingSessions.length > 0 ?
                        upcomingSessions.map((session, index) => {
                            return (
                                <SessionButtonMetaComponent
                                    key={index}
                                    courseCode={session.courseCode}
                                    courseName={session.courseName}
                                    courseDate={session.sessionDate}
                                    onPress={() => startAttendance(session)}
                                    enabled={false}
                                />
                            )
                        }) :
                        <Text style={style.infoMessage}>
                            No Futures Sessions
                        </Text>

                }
            </InputSectionMetaComponent>
        </>
    )
}

const style = StyleSheet.create({
    infoMessage: {
        color: 'gray',
        textAlign: 'center',
    }}
)