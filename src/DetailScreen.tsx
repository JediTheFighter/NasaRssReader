import { ActivityIndicator, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import RoutesList from "./navigation/routes";
import { StackScreenProps } from "@react-navigation/stack";


type DetailScreenStackProps = StackScreenProps<RoutesList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenStackProps> = ({ route }) => {
    const { item } = route.params;

    return (
        <WebView
            source={{ uri: item.link }}
            style={{ flex: 1 }}
            startInLoadingState={true}
            renderLoading={() => (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 16,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#e1e4e8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    errorImage: {
        opacity: 0.5,
    },
    loader: {
        position: 'absolute',
    },
    errorText: {
        position: 'absolute',
        color: '#ff0000',
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Montserrat-Bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontFamily: 'Montserrat-Regular',
    },
    date: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Montserrat-Regular',
    },
});

export default DetailScreen;