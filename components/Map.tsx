import { ColorsType } from '@/constants/Colors';
import useThemeColors from '@/hooks/useThemeColors';
import { useAssets } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { LeafletView } from 'react-native-leaflet-view';
import ThemedText from './ThemedText';

interface Coordinates {
	lat: number;
	lng: number;
}
type Props = { address: string };

async function geocodeAddress(address: string): Promise<Coordinates> {
	const res = await fetch(
		`https://nominatim.openstreetmap.org/search?` +
			`q=${encodeURIComponent(address)}&format=json&limit=1`
	);
	if (!res.ok) throw new Error('Erreur réseau lors de la géolocalisation');
	const data = await res.json();
	if (!data.length) throw new Error('Adresse non trouvée');
	return { lat: +data[0].lat, lng: +data[0].lon };
}

export default function MapScreen({ address }: Props) {
	const [position, setPosition] = useState<Coordinates | null>(null);
	const [loadingGeo, setLoadingGeo] = useState(true);
	const [errorGeo, setErrorGeo] = useState<string | null>(null);
	const colors = useThemeColors();
	const styles = createStyles(colors);
	const [webViewContent, setWebViewContent] = useState<string | null>(null);
	const [assets] = useAssets([require('@/assets/leaflet.html')]);

	useEffect(() => {
		// Géocodage adresse
		geocodeAddress(address)
			.then((coords) => {
				setPosition(coords);
				setErrorGeo(null);
			})
			.catch(() => {
				setErrorGeo('Impossible de charger la carte');
				setPosition({ lat: 51.505, lng: -0.09 }); // fallback Londres
			})
			.finally(() => setLoadingGeo(false));

		// Lecture du fichier HTML
		if (assets?.[0]?.localUri) {
			FileSystem.readAsStringAsync(assets[0].localUri)
				.then((html) => setWebViewContent(html))
				.catch((err) => Alert.alert('Erreur HTML', err.message));
		}
	}, [address, assets]);

	if (loadingGeo || !webViewContent) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={colors.primary700} />
				<ThemedText>Chargement de la carte…</ThemedText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.mapContainer}>
				<LeafletView
					source={{ html: webViewContent }}
					mapCenterPosition={position!}
					mapMarkers={[
						{
							id: 'marker1',
							position: position!,
							icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
							size: [32, 32],
							iconAnchor: [16, 32],
						},
					]}
					zoom={13}
				/>
			</View>
		</View>
	);
}

const createStyles = (colors: ColorsType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			borderRadius: 10,
			overflow: 'hidden',
			borderWidth: 1,
			borderColor: colors.primary700,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: 300,
		},
		loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
		warningContainer: {
			backgroundColor: '#fff3cd',
			padding: 8,
			borderLeftWidth: 4,
			borderLeftColor: '#ffc107',
		},
		warningText: { color: '#856404', fontSize: 14 },
		mapContainer: {
			flex: 1,
		},
	});
