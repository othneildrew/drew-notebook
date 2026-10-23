import DeckGL from '@deck.gl/react';
import { TileLayer } from '@deck.gl/geo-layers';

import { useControls } from '@site/src/components/Experiment/useControls';
import { renderTileBitmap } from './renderTileBitmap';

const GIBS_WMTS_URL = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best';

interface GibsLayer {
  maxZoom: number;
  extension: 'jpg' | 'png';
}

const GIBS_LAYERS: Record<string, GibsLayer> = {
  MODIS_Terra_CorrectedReflectance_TrueColor: { maxZoom: 9, extension: 'jpg' },
  MODIS_Terra_Land_Surface_Temp_Day: { maxZoom: 7, extension: 'png' },
  MODIS_Terra_Aerosol: { maxZoom: 6, extension: 'png' },
  GHRSST_L4_MUR_Sea_Surface_Temperature: { maxZoom: 7, extension: 'png' },
};

const INITIAL_VIEW_STATE = { longitude: 0, latitude: 20, zoom: 2 };

export default function NasaGibsLayer() {
  const { layerName, date, opacity, desaturate } = useControls({
    layerName: Object.keys(GIBS_LAYERS),
    date: '2020-06-01',
    opacity: { value: 1, min: 0, max: 1, step: 0.05 },
    desaturate: { value: 0, min: 0, max: 1, step: 0.05 },
  });

  const { maxZoom, extension } = GIBS_LAYERS[layerName];
  const tileMatrixSet = `GoogleMapsCompatible_Level${maxZoom}`;

  const tileUrl = `${GIBS_WMTS_URL}/${layerName}/default/${date}/${tileMatrixSet}/{z}/{y}/{x}.${extension}`;

  const gibsTiles = new TileLayer({
    id: 'gibs-tiles',
    data: tileUrl,
    minZoom: 0,
    maxZoom,
    tileSize: 256,
    opacity,
    // desaturate is only read inside renderSubLayers, so deck.gl must be told to rebuild tiles
    updateTriggers: { renderSubLayers: [desaturate] },
    renderSubLayers: (tileProps) => renderTileBitmap(tileProps, { desaturate }),
  });

  return <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={[gibsTiles]} />;
}
