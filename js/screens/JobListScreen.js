import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../components/TextComponent';
import { Color, Colors } from '../styles/Colors';
import { borderWidth, customStyles, fontSize, heightH, heightValue, marginPosition, padding, paddingPoistion, radius } from '../styles/Styles';

const JobListScreen = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  console.log("jobsData", jobs)
  const [expandedItem,  ] = useState(null);
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
     (expandedItem === index ? null : index);
  };

  const renderList = ({ item, index }) => {
    if (!item.title) {
      return null;
    }

    const isExpanded = expandedItem === index;

    return (
      <TouchableOpacity onPress={() => handleExpand(index)} style={[styles.itemContainer, radius(8), marginPosition(15, 15, 0, 15)]} key={item.id}>
        <View>
          <TextComponent
            name={item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            style={[fontSize(18), customStyles.fontWeight500]}
          />
          {/* Add Icon */}
        </View>

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
      <LinearGradient colors={Colors.backgroundRgb} style={[styles.header, heightH(6.5), padding(20)]}>
        <TextComponent name={"Job Listing"} style={[customStyles.white, fontSize(28), { fontWeight: "bold" }]} />
      </LinearGradient>
      <View style={[styles.container, paddingPoistion(0, 0, 10)]}>

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
            contentContainerStyle={[paddingPoistion(0,0,10)]}
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
    backgroundColor: Colors.offWhite,
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
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#808080', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  contentContainer: {
    padding: 10,
  },
});


export default JobListScreen;
