// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Define custom icons that aren't part of SF Symbols
type CustomIcons = 'group';

// Define type for MaterialIcons names that correspond to SF Symbols
type MaterialIconMapping = Record<
  CustomIcons | SymbolViewProps['name'],
  (typeof MaterialIcons)['name']
>;

// Map icons to MaterialIcons names
const MAPPING: Partial<MaterialIconMapping> = {
  group: 'group',
  star: 'star',
  // Add other mappings as needed
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
};

// Create a union type for both SF Symbols and custom icons
export type IconSymbolName = SymbolViewProps['name'] | CustomIcons;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  // weight, // Removed as it is unused
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const materialIconName = MAPPING[name];
  if (!materialIconName) {
    console.warn(`No MaterialIcon mapping found for icon: ${name}`);
    // Fallback to a default icon if no mapping is found
    return (
      <MaterialIcons
        name="help-outline"
        color={color}
        size={size}
        style={style}
      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={materialIconName as keyof typeof MaterialIcons.glyphMap}
      style={style}
    />
  );
}
