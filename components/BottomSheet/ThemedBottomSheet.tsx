import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
	toggleModal: () => void;
	isOpen: boolean;
	content: React.ReactNode;
};

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		modalContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'flex-end',
			marginBottom: 30,
			marginHorizontal: 15,
		},
		contentContainer: {
			flex: 1,
		},
	});

export default function ThemedBottomSheet({
	toggleModal,
	isOpen,
	content,
}: Props) {
	const colors = useThemeColors();
	const styles = createStyles(colors);

	return (
		<Modal
			isVisible={isOpen}
			onBackdropPress={toggleModal}
			style={styles.modalContainer}
		>
			<View style={styles.contentContainer}>{content}</View>
		</Modal>
	);
}
