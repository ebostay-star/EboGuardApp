import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TotpScreen() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [code, setCode] = useState('849 201');
  const progressAnim = React.useRef(new Animated.Value(1)).current;

  // Mock countdown animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Reset animation and generate new mock code
          progressAnim.setValue(1);
          Animated.timing(progressAnim, {
            toValue: 0,
            duration: 30000,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          setCode(`${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    // Initial animation start
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 30000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const progressColor = progressAnim.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: ['#d32f2f', '#0056D2', '#0056D2']
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Authenticator</Text>
        <Text style={styles.subtitle}>EBO Admin Account</Text>
      </View>

      <View style={styles.codeCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={24} color="#0056D2" />
          <Text style={styles.accountName}>admin@ebostay.com</Text>
        </View>

        <Text style={[styles.codeText, timeLeft <= 5 && styles.codeTextUrgent]}>
          {code}
        </Text>

        <View style={styles.progressContainer}>
          <Animated.View 
            style={[
              styles.progressBar, 
              { width: progressWidth, backgroundColor: progressColor }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color="#666" />
        <Text style={styles.infoText}>
          Use this code to log in to the EBO Admin Dashboard when prompted. Codes change every 30 seconds.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  codeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginLeft: 10,
  },
  codeText: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#0056D2',
    textAlign: 'center',
    marginBottom: 24,
  },
  codeTextUrgent: {
    color: '#d32f2f',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginLeft: 12,
  }
});
