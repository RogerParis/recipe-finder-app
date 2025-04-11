import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface HeaderButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  onPress,
  color = 'white',
  size = 22,
  style,
}) => (
  <Pressable onPress={onPress} hitSlop={10} style={[{ marginRight: 10 }, style]}>
    <Ionicons name={icon} size={size} color={color} />
  </Pressable>
);
