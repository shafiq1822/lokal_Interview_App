import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../components/TextComponent';
import { Color } from '../styles/Colors';

const JobListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);

  const CACHE_DURATION = 2 * 60 * 60 * 1000;

  const getJobList = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const cachedData = await AsyncStorage.getItem('cachedJobs');
      const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
      const currentTime = new Date().getTime();

      if (cachedData && lastFetchTime && (currentTime - parseInt(lastFetchTime) < CACHE_DURATION)) {
        setJobs(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      console.log("Fetching job list from API...");
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageNum}`);
      setJobs(response.data.results);
      await AsyncStorage.setItem('cachedJobs', JSON.stringify(response.data.results));
      await AsyncStorage.setItem('lastFetchTime', currentTime.toString());
      setError(null);
    } catch (error) {
      console.error("Error fetching job list:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const renderList = ({ item, index }) => {
    const isExpanded = expandedItem === index;
    return (
      <TouchableOpacity onPress={() => handleExpand(index)} style={styles.itemContainer} key={item.id}>
        <TextComponent name={item.title} />
        {isExpanded && (
          <View>
            <TextComponent name={`Salary: ${item.salary_max}`} />
            <TextComponent name={`Phone: ${item.whatsapp_no}`} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const retry = async () => {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      setError(null);
      setPage(1);
      getJobList(1);
    } else {
      Alert.alert('No internet connection', 'Please check your network settings and try again.');
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getJobList(page);
  }, [page]);

  return (
    <View style={styles.mainContainer}>
      <LinearGradient colors={Color.backgroundRgb} style={styles.header}>
      </LinearGradient>
      <View style={styles.container}>

        {loading && jobs.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error loading jobs. Please try again.</Text>
            <Button title="Retry" onPress={retry} />
          </View>
        ) : (
          <FlatList
            data={jobs}
            renderItem={renderList}
            keyExtractor={(item) => item?.id?.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            refreshing={false}
            onRefresh={() => {
              setPage(1);
              getJobList(1);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    height: 100
  },
  container: {
    flex: 1,
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginBottom: 10,
    color: 'red',
  },
  itemContainer: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderColor: '#ddd',
  },
});

export default JobListScreen;
