import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const SkeletonPlaceholder = () => {
  const animationValue = useSharedValue(0);

  animationValue.value = withRepeat(
    withTiming(1, {duration: 1000, easing: Easing.linear}),
    Infinity,
  );

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [0, 0.5, 1],
      ['#E0E0E0', '#F5F5F5', '#E0E0E0'],
    );
    const opacity = interpolate(animationValue.value, [0, 0.5, 1], [1, 0.6, 1]);

    return {
      backgroundColor,
      opacity,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, animatedStyle]} />
      <Animated.View
        style={[styles.skeleton, animatedStyle, styles.commonSpace]}
      />
      <Animated.View
        style={[styles.skeleton, animatedStyle, styles.commonSpace]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  skeleton: {
    height: 20,
    borderRadius: 4,
    width: '100%',
  },
  commonSpace: {
    marginTop: 10,
  },
});
