import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
	sheetKey: string;
	bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
	shouldOpen: boolean;
	content: React.ReactNode;
};

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		sheet: {
			backgroundColor: 'transparent',
			marginHorizontal: 15,
			borderTopRightRadius: 10,
			borderTopLeftRadius: 10,
		},
		view: {
			backgroundColor: 'transparent',
			flex: 1,
			padding: 36,
		},
		handleIndicator: {
			backgroundColor: 'transparent',
		},
		background: {
			backgroundColor: 'transparent',
		},
	});

export default function ThemedBottomSheet({
	sheetKey,
	bottomSheetRef,
	shouldOpen,
	content,
}: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);

	// Composant backdrop personnalisé avec fermeture au clic
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
				onPress={() => bottomSheetRef.current?.close()}
			/>
		),
		[]
	);

	return (
		<>
			<BottomSheet
				key={sheetKey}
				ref={bottomSheetRef}
				index={-1}
				enablePanDownToClose
				style={styles.sheet}
				handleIndicatorStyle={styles.handleIndicator}
				backgroundStyle={styles.background}
				backdropComponent={renderBackdrop}
			>
				<BottomSheetView
					style={styles.view}
					onLayout={() => {
						shouldOpen && bottomSheetRef.current?.expand();
					}}
				>
					{content}
				</BottomSheetView>
			</BottomSheet>
		</>
	);
}
