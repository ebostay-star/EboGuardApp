import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function PromptScreen() {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
      
      <Animated.View style={[styles.promptCard, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="phone-portrait" size={40} color="#0056D2" />
        </View>
        
        <Text style={styles.title}>Is this you trying to sign in?</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="desktop-outline" size={20} color="#666" />
            <Text style={styles.detailText}>Windows • Chrome</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.detailText}>Near New Delhi, India</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.detailText}>Just now</Text>
          </View>
        </View>

        <Text style={styles.instruction}>Tap the number matching your screen:</Text>
        
        <View style={styles.numbersGrid}>
          {[12, 42, 87].map((num) => (
            <TouchableOpacity key={num} style={styles.numberButton}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.denyButton}>
          <Ionicons name="close-circle-outline" size={20} color="#d32f2f" />
          <Text style={styles.denyText}>No, it's not me</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  promptCard: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f4fb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 12,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 16,
  },
  numbersGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  numberButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#f0f4fb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0ddf5',
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0056D2',
  },
  denyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: '#fffcfc',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  denyText: {
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  }
});
