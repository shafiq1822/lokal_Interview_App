import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TextComponent from '../components/TextComponent';
import { Colors } from '../styles/Colors';
import { customStyles, fontSize, heightH, marginPosition, padding, paddingPoistion } from '../styles/Styles';
import AccordionComponent from '../components/AccodrionComponent';

const JobListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [loadingBuffer, setLoadingBuffer] = useState(false); 
  const fetchTimeoutRef = useRef(null);

  const CACHE_DURATION = 2 * 60 * 60 * 1000; 

  const getJobList = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const cachedData = await AsyncStorage.getItem('cachedJobs');
      const lastFetchTime = await AsyncStorage.getItem('lastFetchTime');
      const currentTime = new Date().getTime();

      // If offline or cache is vald, load from cache
      if (isOffline || (cachedData && lastFetchTime && (currentTime - parseInt(lastFetchTime) < CACHE_DURATION) && pageNum === 1)) {
        setJobs(JSON.parse(cachedData) || []);
        setLoading(false);
        return;
      }

      // Fetch new data if online
      console.log("Fetching job list from API...");
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${pageNum}`);
      const newJobs = response.data.results;

      if (newJobs.length > 0) {
        setJobs(prevJobs => pageNum === 1 ? newJobs : [...prevJobs, ...newJobs]);
        if (pageNum === 1) {
          await AsyncStorage.setItem('cachedJobs', JSON.stringify(newJobs));
          await AsyncStorage.setItem('lastFetchTime', currentTime.toString());
        }
        setError(null);
      } else {
        setHasMoreJobs(false);
      }
    } catch (error) {
      console.error("Error fetching job list:", error);
      setError(error);

      // Load cached data if there's an errr fetching from the API
      const cachedData = await AsyncStorage.getItem('cachedJobs');
      if (cachedData) {
        setJobs(JSON.parse(cachedData));
      }
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      setLoadingBuffer(false); 
    }
  }, [isOffline]);

  const handleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const renderList = ({ item, index }) => {
    if (!item.title) {
      return null;
    }

    return (
      <View key={item.id}>
        <AccordionComponent
          title={item.title.length > 37 ? `${item.title.slice(0, 37)}...` : item.title}
          expanded={expandedItem === index}
          onToggle={() => handleExpand(index)}
          style={{ backgroundColor: Colors.darkGray }}
        >
          <TextComponent name={item?.title} style={[fontSize(18), customStyles.fontWeight400, { color: Colors.textGray }]} />
          <TextComponent name={"Salary"} style={[{ color: Colors.secondaryText }, fontSize(12), marginPosition(10)]} />
          <TextComponent name={item?.salary_max ? "₹" + item?.salary_min.toString() + " - " + "₹" + item?.salary_max.toString() : "N/A"} style={[{ color: Colors.textGray }, marginPosition(0)]} />
          <TextComponent name={`Phone`} style={[{ color: Colors.secondaryText }, marginPosition(10)]} />
          <TextComponent name={item?.whatsapp_no ? item?.whatsapp_no : "N/A"} style={[{ color: Colors.textGray }]} />
          <TextComponent name={`Location`} style={[{ color: Colors.secondaryText }, marginPosition(10)]} />
          <TextComponent name={item?.primary_details?.Place ? item?.primary_details?.Place : "N/A"} style={[{ color: Colors.textGray }]} />
          <TextComponent name={`Experience`} style={[{ color: Colors.secondaryText }, marginPosition(10)]} />
          <TextComponent name={item?.primary_details?.Experience ? item?.primary_details?.Experience : "N/A"} style={[{ color: Colors.textGray }]} />
        </AccordionComponent>
      </View>
    );
  };

  const ListFooterComponent = () => (
    <View style={[heightH(10), customStyles.allCenter]}>
      <ActivityIndicator size="large" />
    </View>
  )

  const loadMore = () => {
    if (!loading && !isFetchingMore && hasMoreJobs) {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      setLoadingBuffer(true);
      fetchTimeoutRef.current = setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 1500);
    }
  };

  const retry = async () => {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      setError(null);
      setPage(1);
      setHasMoreJobs(true);
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
      <View style={[styles.header, heightH(6.5), padding(20), { backgroundColor: Colors.purple }]}>
        <TextComponent name={"Job Listing"} style={[customStyles.white, fontSize(28), { fontWeight: "bold" }]} />
      </View>
      <View style={[styles.container]}>
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
            ListFooterComponent={isFetchingMore || loadingBuffer ? <ListFooterComponent /> : null}
            refreshing={false}
            contentContainerStyle={[paddingPoistion(0, 0, 15)]}
            onRefresh={() => {
              setPage(1);
              setHasMoreJobs(true);
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
    backgroundColor: Colors.black,
  },
  header: {
    justifyContent: "flex-end"
  },
  container: {
    flex: 1,
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
});

export default JobListScreen;
