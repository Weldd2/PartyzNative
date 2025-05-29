import ThemedBottomSheet from '@/components/ThemedBottomSheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

interface BottomSheetContextType {
	open: (content: React.ReactNode) => void;
	close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType>({} as any);

export const useBottomSheetContext = () => {
	const ctx = useContext(BottomSheetContext);
	if (!ctx) {
		throw new Error(
			'useBottomSheetContext must be used within BottomSheetProvider'
		);
	}
	return ctx;
};

export default function BottomSheetProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const bottomSheetRef = useRef<BottomSheetMethods>(null);
	const [content, setContent] = useState<React.ReactNode>(null);
	const [shouldOpen, setShouldOpen] = useState(false);

	// Ouvre la sheet *après* que le nouveau contenu soit rendu & mesuré
	useEffect(() => {
		if (shouldOpen) {
			bottomSheetRef.current?.expand();
			setShouldOpen(false);
		}
	}, [content, shouldOpen]);

	// Clé pour forcer un remount si jamais nécessaire
	const sheetKey = useMemo(() => JSON.stringify(content), [content]);

	const open = (node: React.ReactNode) => {
		setContent(node);
		setShouldOpen(true);
	};
	const close = () => bottomSheetRef.current?.close();

	return (
		<BottomSheetContext.Provider value={{ open, close }}>
			{children}
			<ThemedBottomSheet
				sheetKey={sheetKey}
				bottomSheetRef={bottomSheetRef}
				shouldOpen={shouldOpen}
				content={content}
			/>
		</BottomSheetContext.Provider>
	);
}
