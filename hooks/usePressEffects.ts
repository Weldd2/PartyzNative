import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

type UsePressEffectsOptions = {
	enableAnimation?: boolean;
	enableHaptic?: boolean;
	scaleValue?: number;
	hapticStyle?: Haptics.ImpactFeedbackStyle;
};

export default function usePressEffects({
	enableAnimation = true,
	enableHaptic = true,
	scaleValue = 0.97,
	hapticStyle = Haptics.ImpactFeedbackStyle.Light,
}: UsePressEffectsOptions = {}) {
	const getAnimationStyle = useCallback(
		(pressed: boolean) => ({
			transform: enableAnimation ? [{ scale: pressed ? scaleValue : 1 }] : undefined,
		}),
		[enableAnimation, scaleValue]
	);

	const handlePressIn = useCallback(() => {
		if (enableHaptic) {
			Haptics.impactAsync(hapticStyle);
		}
	}, [enableHaptic, hapticStyle]);

	return {
		getAnimationStyle,
		handlePressIn: enableHaptic ? handlePressIn : undefined,
	};
}
