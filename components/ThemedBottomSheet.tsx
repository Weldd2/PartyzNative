import useThemeColors from '@/hooks/useThemeColors';
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

const createStyle = (colors: { primary: string; greyWhite: string }) =>
	StyleSheet.create({
		sheet: {
			borderRadius: 10,
		},
		background: {
			marginHorizontal: 20,
			backgroundColor: 'transparent',
		},
		indicator: {
			backgroundColor: 'transparent',
		},
		menuContainer: {
			flex: 1,
			padding: 20,
		},
	});

interface ThemedBottomSheetProps {
	bottomSheetRef: React.RefObject<BottomSheet>;
	bottomSheetContent: React.ReactNode;
	currentSnapPoints: string[];
}

export default function ThemedBottomSheet({
	bottomSheetRef,
	bottomSheetContent,
	currentSnapPoints,
}: ThemedBottomSheetProps) {
	const colors = useThemeColors();
	const style = createStyle(colors);
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				pressBehavior="close"
			/>
		),
		[]
	);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			snapPoints={currentSnapPoints}
			enablePanDownToClose
			index={-1}
			backdropComponent={renderBackdrop}
			style={style.sheet}
			backgroundStyle={style.background}
			handleIndicatorStyle={style.indicator}
		>
			<BottomSheetView style={style.menuContainer}>
				{bottomSheetContent}
			</BottomSheetView>
		</BottomSheet>
	);
}
