import { createContext, ReactNode, useContext } from 'react';

interface BottomSheetContextType {
	openMenu: (content: ReactNode, snapPoints?: string[]) => void;
	closeMenu: () => void;
}

export const BottomSheetContext = createContext<
	BottomSheetContextType | undefined
>(undefined);

export const useBottomSheet = () => {
	const context = useContext(BottomSheetContext);
	if (!context) {
		throw new Error(
			'useBottomSheet must be used within a BottomSheetProvider'
		);
	}
	return context;
};
