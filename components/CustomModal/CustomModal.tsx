import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

type ModalRootProps = {
	children: React.ReactNode;
};

type ModalContextType = {
	toggleModal: () => void;
	isOpen: boolean;
};

const ModalContext = React.createContext<ModalContextType>({
	toggleModal: () => {},
	isOpen: false,
});

function ModalRoot({ children }: ModalRootProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ModalContext.Provider value={{ toggleModal, isOpen }}>
			<View>{children}</View>
		</ModalContext.Provider>
	);
}

type ModalButtonProps = {
	children: React.ReactElement<{ onPress?: () => void }>;
};

function ModalButton({ children }: ModalButtonProps) {
	const { toggleModal } = useContext(ModalContext);

	return React.cloneElement(children, {
		onPress: toggleModal,
	});
}

type ModalContentProps = {
	children: React.ReactNode;
	variant?: keyof ReturnType<typeof getVariantStyle>;
};

const getVariantStyle = (colors: ColorsType) => ({
	bottomSheet: {
		modalContainer: {
			justifyContent: 'center',
			alignItems: 'flex-end',
			marginBottom: 30,
			marginHorizontal: 15,
		},
		contentContainer: {},
		after: {},
	},
	fullPage: {
		modalContainer: {
			backgroundColor: colors.greyWhite,
			marginTop: '30%',
			paddingTop: 20,
			marginBottom: 0,
			marginHorizontal: 0,
			borderRadius: 10,
			position: 'relative',
		},
		contentContainer: {},
		after: {
			position: 'absolute',
			top: 5,
			backgroundColor: colors.primary,
			alignSelf: 'center',
			width: '33%',
			height: 4,
			borderRadius: 10,
		},
	},
});

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		modalContainer: {
			flexDirection: 'row',
		},
		contentContainer: {
			flex: 1,
		},
		after: {},
	});

function ModalContent({
	variant = 'bottomSheet',
	children,
}: ModalContentProps) {
	const { toggleModal, isOpen } = useContext(ModalContext);
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const variantStyles = getVariantStyle(colors);

	return (
		<Modal
			isVisible={isOpen}
			onBackdropPress={toggleModal}
			style={[
				variantStyles[variant].modalContainer,
				styles.modalContainer,
			]}
		>
			<View style={[variantStyles[variant].after]}></View>
			<View
				style={[
					variantStyles[variant].contentContainer,
					styles.contentContainer,
				]}
			>
				{children}
			</View>
		</Modal>
	);
}

export const ThemedModal = Object.assign(ModalRoot, {
	Button: ModalButton,
	Modal: ModalContent,
});
