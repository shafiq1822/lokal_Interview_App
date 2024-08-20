// import React, { useEffect } from 'react';
// import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import NetInfo from '@react-native-community/netinfo';
// import { fetchJobs, expandItem, incrementPage, resetPage } from "../redux/store";

// const JobListScreen = () => {
//   const dispatch = useDispatch();
//   const { jobs, expandedItem, isLoading, error, page } = useSelector((state) => state.jobs);

//   useEffect(() => {
//     dispatch(fetchJobs());
//   }, [page]);

//   const handleExpand = (index) => {
//     dispatch(expandItem(index));
//   };

//   const renderItem = ({ item, index }) => {
//     const isExpanded = expandedItem === index;
//     return (
//       <TouchableOpacity onPress={() => handleExpand(index)}>
//         <View style={{ padding: 10, borderBottomWidth: 1 }}>
//           <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
//           {isExpanded && (
//             <View>
//               <Text>Salary: {item.salary}</Text>
//               <Text>Phone: {item.phone}</Text>
//               <Text>Description: {item.description}</Text>
//             </View>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const loadMore = () => {
//     if (!isLoading) {
//       dispatch(incrementPage());
//     }
//   };

//   const retry = async () => {
//     const netInfo = await NetInfo.fetch();
//     if (netInfo.isConnected) {
//       dispatch(resetPage());
//       dispatch(fetchJobs());
//     } else {
//       console.log('No internet connection');
//     }
//   };

//   if (isLoading && jobs.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Error loading jobs. Please try again.</Text>
//         <Button title="Retry" onPress={retry} />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={jobs}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id.toString()}
//       onEndReached={loadMore}
//       onEndReachedThreshold={0.5}
//       ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
//       refreshing={false}
//       onRefresh={() => dispatch(fetchJobs())}
//     />
//   );
// };

// export default JobListScreen;


import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const JobListScreen = () => {

    const [loading, setLoading] = useState(false);

    const getJobList = async () => {
        try {
            setLoading(true);
            console.log("Fetching job list...");

            const response = await axios.get("https://testapi.getlokalapp.com/common/jobs");

            console.log("Response:", response.data);
            alert(response)

            // Handle the response data here
        } catch (error) {
            console.error("Error fetching job list:", error);
            // Handle the error here (e.g., show a message to the user)
        } finally {
            setLoading(false);
            console.log("Loading complete.");
        }
    };

    useEffect(() => {
        getJobList();
    }, [])

  return (
    <View style={[{backgroundColor: "white", flex: 1}]}>
      <Text>JobListScreen</Text>
    </View>
  )
}

export default JobListScreen