import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from './components/Text';
import AppBar from './components/AppBar';
import { StackNavigationProp } from '@react-navigation/stack';
import RoutesList from './navigation/routes.ts';
import * as rssParser from 'react-native-rss-parser';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import RSSFeedItem from './models/RssFeedModel.ts';
import Icon from 'react-native-vector-icons/AntDesign';


type HomeScreenNavigationProp = StackNavigationProp<RoutesList, 'Home'>;
type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [feedItems, setFeedItems] = useState<RSSFeedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRSSFeed();
    }, []);

    const fetchRSSFeed = async () => {
        try {
            const response = await fetch('https://www.nasa.gov/rss/dyn/image_of_the_day.rss');
            const responseData = await response.text();
            const rssData = await rssParser.parse(responseData);

            const jsonData: RSSFeedItem[] = rssData.items.map((item, index) => {
                // NASA feed typically includes the image URL in the enclosures
                const imageUrl = item.enclosures && item.enclosures[0] ? item.enclosures[0].url : '';
                return {
                    id: `${item.id || index}`,
                    title: item.title,
                    description: item.description,
                    publishDate: item.published,
                    link: item.links[0].url,
                    imageUrl: imageUrl,
                }
            }
            );

            setFeedItems(jsonData);

            // Preload images
            FastImage.preload(jsonData.map(item => ({ uri: item.imageUrl })));
            console.log('Parsed RSS Feed:', JSON.stringify(jsonData, null, 2));
        } catch (error) {
            console.error('Error fetching or parsing RSS feed:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          // If date is invalid, return the original string
          return dateString;
        }
        // Format the date as you prefer, e.g., "MMM DD, YYYY"
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      };

    const renderItem = ({ item }: { item: RSSFeedItem }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { item })}>
            <ProgressiveImage uri={item.imageUrl} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{formatDate(item.publishDate)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AppBar title={'My App'} rightIcon={<Icon size={20} color="white" name='profile'/>} onRightPress={() => {
                navigation.navigate('Profile');
            }}></AppBar>
            <FlatList
                data={feedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={100}
                windowSize={5}
                initialNumToRender={3}
            />
        </View>
    );
};

const ProgressiveImage = ({ uri }: { uri: string }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <View style={styles.imageContainer}>
            {loading && <ActivityIndicator style={styles.loader} />}
            <FastImage
                style={[styles.image, error && styles.errorImage]}
                source={{
                    uri: uri,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
            />
            {error && <Text style={styles.errorText}>Failed to load image</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
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

export default HomeScreen;