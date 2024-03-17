import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { fetchUserExperience } from "../api_manager/UserExperience";

const ShowExperience = () => {
  const [userExperience, setUserExperience] = useState([]);
  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const userExperienceData = await fetchUserExperience();
      //  console.log('userExperienceData after fetch:', userExperienceData);
        setUserExperience(userExperienceData);
      } catch (error) {
        console.error('Error fetching user experience data:', error);
      }
    };

    fetchExperienceData();
  }, []);

  return (
    <View>
      <ScrollView>
      {userExperience.length > 0 ? (
        userExperience.map((experience, index) => (
          <View key={index}>
            <Text>Designation: {experience.designation ?? "null"}</Text>
            <Text>Company Name: {experience.companyName ?? "null"}</Text>
            <Text>Start Date: {experience.StartDate ?? "null"}</Text>
            <Text>End Date: {experience.EndDate ?? "null"}</Text>
            <Text>-------------------</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      </ScrollView>
    </View>
  );
}

export default ShowExperience;
