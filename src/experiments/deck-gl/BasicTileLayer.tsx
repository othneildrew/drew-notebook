import DeckGL from '@deck.gl/react';
import { TileLayer } from '@deck.gl/geo-layers';
import { ScatterplotLayer } from '@deck.gl/layers';

import { useControls } from '@site/src/components/Experiment/useControls';
import { renderTileBitmap } from './renderTileBitmap';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 12,
  pitch: 30,
  bearing: 0,
};

interface Landmark {
  position: [number, number];
  radius: number;
  color: [number, number, number];
}

const LANDMARKS: Landmark[] = [
  { position: [-122.4194, 37.7749], radius: 200, color: [255, 99, 71] },
  { position: [-122.41, 37.79], radius: 150, color: [30, 144, 255] },
  { position: [-122.43, 37.78], radius: 150, color: [50, 205, 50] },
];

export default function BasicTileLayer() {
  const { tileOpacity, showLandmarks, radiusScale, minRadiusPixels } = useControls({
    tileOpacity: { value: 1, min: 0, max: 1, step: 0.05 },
    showLandmarks: true,
    radiusScale: { value: 1, min: 0.25, max: 5, step: 0.25 },
    minRadiusPixels: { value: 4, min: 0, max: 30, step: 1 },
  });

  const osmTiles = new TileLayer({
    id: 'osm-tiles',
    data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    opacity: tileOpacity,
    renderSubLayers: (tileProps) => renderTileBitmap(tileProps),
  });

  const landmarks = new ScatterplotLayer<Landmark>({
    id: 'landmarks',
    data: LANDMARKS,
    visible: showLandmarks,
    pickable: true,
    getPosition: (landmark) => landmark.position,
    getRadius: (landmark) => landmark.radius,
    getFillColor: (landmark) => landmark.color,
    radiusScale,
    radiusMinPixels: minRadiusPixels,
  });

  return <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={[osmTiles, landmarks]} />;
}
