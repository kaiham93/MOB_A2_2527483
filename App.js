import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Identity Requirements[cite: 1, 2, 5]
  const studentName = "KHALIL ABDEEN HAMID MUSA";
  const regNumber = "2527483";
  const verificationCode = "MOB-A2-7483";
  const appName = "KMAPortfolio";

  // Editable Profile State[cite: 2]
  const [headline, setHeadline] = useState("Mobile Application Developer");
  const [shortBio, setShortBio] = useState("Software Engineering student at INES-Ruhengeri, passionate about building mobile applications using React Native and TypeScript.");
  const [primarySkill, setPrimarySkill] = useState("React Native & Expo");
  const [availability, setAvailability] = useState("Available for Internships");
  const [profileImageUri, setProfileImageUri] = useState("https://via.placeholder.com/150");

  // Validation Error States[cite: 2]
  const [headlineError, setHeadlineError] = useState('');
  const [bioError, setBioError] = useState('');
  const [skillError, setSkillError] = useState('');

  useEffect(() => {
    loadStoredProfile();
  }, []);

  const loadStoredProfile = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@portfolio_profile');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.headline) setHeadline(parsed.headline);
        if (parsed.shortBio) setShortBio(parsed.shortBio);
        if (parsed.primarySkill) setPrimarySkill(parsed.primarySkill);
        if (parsed.availability) setAvailability(parsed.availability);
        if (parsed.profileImageUri) setProfileImageUri(parsed.profileImageUri);
      }
    } catch (e) {
      console.log('Failed to load profile from storage', e);
    }
  };

  // Profile Media Handling (Gallery / Camera / Remove / Permissions)[cite: 2]
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const captureImageWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

  const removeProfileImage = () => {
    setProfileImageUri("https://via.placeholder.com/150");
  };

  const handleSaveProfile = async () => {
    let isValid = true;

    if (!headline || headline.trim().length < 5) {
      setHeadlineError('Headline must be at least 5 characters long.');
      isValid = false;
    } else {
      setHeadlineError('');
    }

    if (!shortBio || shortBio.trim().length < 15) {
      setBioError('Short bio must be at least 15 characters long.');
      isValid = false;
    } else {
      setBioError('');
    }

    if (!primarySkill || primarySkill.trim().length === 0) {
      setSkillError('Primary skill cannot be empty.');
      isValid = false;
    } else {
      setSkillError('');
    }

    if (isValid) {
      const profileToSave = { headline, shortBio, primarySkill, availability, profileImageUri };
      try {
        await AsyncStorage.setItem('@portfolio_profile', JSON.stringify(profileToSave));
        Alert.alert('Success', 'Profile updated and saved locally successfully!');
        setCurrentTab('Home');
      } catch (e) {
        Alert.alert('Error', 'Failed to save profile data.');
      }
    } else {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
    }
  };

  const skills = [
    { id: '1', name: 'React Native & Expo', level: 'Advanced' },
    { id: '2', name: 'TypeScript', level: 'Intermediate' },
    { id: '3', name: 'JavaScript (ES6+)', level: 'Advanced' },
    { id: '4', name: 'UI/UX Wireframing', level: 'Intermediate' },
    { id: '5', name: 'Git & GitHub Version Control', level: 'Advanced' },
  ];

  const educationTimeline = [
    { id: '1', degree: 'Bachelor in Software Engineering (SWE)', institution: 'INES-Ruhengeri', year: '2024 - Present' },
    { id: '2', degree: 'Advanced Level Education', institution: 'High School', year: 'Until 2023' },
  ];

  const projects = [
    {
      id: '1',
      title: 'Campus Event Manager App',
      problem: 'Students miss important university workshops and announcements due to scattered communication channels.',
      contribution: 'Designed the UI/UX wireframes, implemented event listing screens with React Native, and integrated local state management.',
      technologies: 'React Native, Expo, TypeScript, AsyncStorage',
    },
    {
      id: '2',
      title: 'Smart Agri-Tracker',
      problem: 'Local farmers struggle to track weather conditions and crop watering schedules efficiently offline.',
      contribution: 'Developed core dashboard components, offline data persistence, and custom summary cards.',
      technologies: 'React Native, TypeScript, Expo Vector Icons',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {selectedProject ? (
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProject(null)}>
            <Text style={styles.backButtonText}>← Back to Projects</Text>
          </TouchableOpacity>

          <Text style={styles.screenHeader}>{selectedProject.title}</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📌 Problem</Text>
            <Text style={styles.cardText}>{selectedProject.problem}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>👨‍💻 My Contribution</Text>
            <Text style={styles.cardText}>{selectedProject.contribution}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🛠️ Technologies Used</Text>
            <Text style={styles.techText}>{selectedProject.technologies}</Text>
          </View>
        </ScrollView>
      ) : (
        <>
          {currentTab === 'Home' && (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.mandatoryText}>My name is {studentName}.</Text>
              
              <View style={styles.imageContainer}>
                <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
              </View>

              <Text style={styles.headline}>{headline}</Text>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.cardText}>{shortBio}</Text>
                <Text style={styles.statusText}>Status: {availability}</Text>
                <Text style={styles.statusText}>Primary Skill: {primarySkill}</Text>
              </View>

              <View style={styles.codeContainer}>
                <Text style={styles.codeLabel}>Verification Code:</Text>
                <Text style={styles.codeText}>{verificationCode}</Text>
              </View>
            </ScrollView>
          )}

          {currentTab === 'Skills' && (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.screenHeader}>Skills & Education</Text>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>💡 Core Skills (At least 5)</Text>
                {skills.map((skill) => (
                  <View key={skill.id} style={styles.itemRow}>
                    <Text style={styles.itemName}>• {skill.name}</Text>
                    <Text style={styles.itemLevel}>{skill.level}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>🎓 Education Timeline</Text>
                {educationTimeline.map((edu) => (
                  <View key={edu.id} style={styles.eduItem}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduInst}>{edu.institution} ({edu.year})</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          {currentTab === 'Projects' && (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.screenHeader}>Project Portfolio</Text>
              <Text style={styles.subHeader}>Tap any project to view details:</Text>

              {projects.map((proj) => (
                <TouchableOpacity 
                  key={proj.id} 
                  style={styles.projectCard}
                  onPress={() => setSelectedProject(proj)}
                >
                  <Text style={styles.projectTitle}>{proj.title}</Text>
                  <Text style={styles.projectSnippet} numberOfLines={2}>{proj.problem}</Text>
                  <Text style={styles.tapToView}>View Details →</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {currentTab === 'Editor' && (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.screenHeader}>Edit Profile & Media</Text>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>📷 Profile Image</Text>
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: profileImageUri }} style={styles.previewImage} />
                </View>
                <View style={styles.mediaButtonsRow}>
                  <TouchableOpacity style={styles.mediaButton} onPress={pickImageFromGallery}>
                    <Text style={styles.mediaButtonText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.mediaButton} onPress={captureImageWithCamera}>
                    <Text style={styles.mediaButtonText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.mediaButton, styles.removeButton]} onPress={removeProfileImage}>
                    <Text style={styles.mediaButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Professional Headline</Text>
                <TextInput
                  style={styles.textInput}
                  value={headline}
                  onChangeText={setHeadline}
                />
                {headlineError ? <Text style={styles.errorText}>{headlineError}</Text> : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Short Biography</Text>
                <TextInput
                  style={[styles.textInput, { height: 80 }]}
                  value={shortBio}
                  onChangeText={setShortBio}
                  multiline
                />
                {bioError ? <Text style={styles.errorText}>{bioError}</Text> : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Primary Skill</Text>
                <TextInput
                  style={styles.textInput}
                  value={primarySkill}
                  onChangeText={setPrimarySkill}
                />
                {skillError ? <Text style={styles.errorText}>{skillError}</Text> : null}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Availability Status</Text>
                <TextInput
                  style={styles.textInput}
                  value={availability}
                  onChangeText={setAvailability}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {currentTab === 'About' && (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.screenHeader}>About & Release Info</Text>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>📱 App Information</Text>
                <Text style={styles.cardText}>App Name: {appName}</Text>
                <Text style={styles.cardText}>Student Name: {studentName}</Text>
                <Text style={styles.cardText}>Registration Number: {regNumber}</Text>
                <Text style={styles.cardText}>Verification Code: {verificationCode}</Text>
                <Text style={styles.cardText}>Version: 1.0.0 (Standalone APK)</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>🔒 Data-Use Statement</Text>
                <Text style={styles.cardText}>
                  This app stores fictional portfolio records locally on your device using AsyncStorage for academic evaluation purposes only. No personal data is transmitted externally.
                </Text>
              </View>
            </ScrollView>
          )}

          <View style={styles.tabBar}>
            <TouchableOpacity 
              style={[styles.tabButton, currentTab === 'Home' && styles.activeTab]} 
              onPress={() => { setCurrentTab('Home'); setSelectedProject(null); }}
            >
              <Text style={[styles.tabText, currentTab === 'Home' && styles.activeTabText]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, currentTab === 'Skills' && styles.activeTab]} 
              onPress={() => { setCurrentTab('Skills'); setSelectedProject(null); }}
            >
              <Text style={[styles.tabText, currentTab === 'Skills' && styles.activeTabText]}>Skills</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, currentTab === 'Projects' && styles.activeTab]} 
              onPress={() => { setCurrentTab('Projects'); setSelectedProject(null); }}
            >
              <Text style={[styles.tabText, currentTab === 'Projects' && styles.activeTabText]}>Projects</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, currentTab === 'Editor' && styles.activeTab]} 
              onPress={() => { setCurrentTab('Editor'); setSelectedProject(null); }}
            >
              <Text style={[styles.tabText, currentTab === 'Editor' && styles.activeTabText]}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, currentTab === 'About' && styles.activeTab]} 
              onPress={() => { setCurrentTab('About'); setSelectedProject(null); }}
            >
              <Text style={[styles.tabText, currentTab === 'About' && styles.activeTabText]}>About</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 90,
  },
  mandatoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  screenHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  imageContainer: {
    marginBottom: 15,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  mediaButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  mediaButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  removeButton: {
    backgroundColor: '#d9534f',
  },
  mediaButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 13,
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 6,
  },
  techText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
  },
  codeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginRight: 5,
  },
  codeText: {
    fontSize: 14,
    color: '#0d47a1',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemLevel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  eduItem: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  eduInst: {
    fontSize: 12,
    color: '#666',
  },
  projectCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  projectSnippet: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  tapToView: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    color: '#d9534f',
    marginTop: 4,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#e3f2fd',
  },
  tabText: {
    fontSize: 11,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});