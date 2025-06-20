// SettingsScreenFND.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SettingsScreenStyle';
import { segment1Options, segment2Options } from './SettingsScreenBND';

const SettingsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.segment1}>
        <View style={styles.card}>
          {segment1Options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => option.action && navigation.navigate(option.action)}
            >
              <Ionicons name={option.icon} size={24} color="#6c757d" style={styles.icons} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.segment2}>
        <View style={styles.card}>
          {segment2Options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => option.action && navigation.navigate(option.action)}
            >
              <Ionicons name={option.icon} size={24} color="#6c757d" style={styles.icons} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.footer}>© 2024 Dental Icons</Text>
    </ScrollView>
  </SafeAreaView>
);

export default SettingsScreen;