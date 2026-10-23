import type { TileLayerProps } from '@deck.gl/geo-layers';
import { BitmapLayer, type BitmapLayerProps } from '@deck.gl/layers';

type RenderTileProps = Parameters<NonNullable<TileLayerProps<ImageBitmap>['renderSubLayers']>>[0];
type TileBounds = Record<'west' | 'south' | 'east' | 'north', number>;

export function renderTileBitmap(
  tileProps: RenderTileProps,
  bitmapProps: Partial<BitmapLayerProps> = {}
) {
  const { west, south, east, north } = tileProps.tile.bbox as TileBounds;

  return new BitmapLayer(tileProps as unknown as Partial<BitmapLayerProps>, {
    data: undefined,
    image: tileProps.data,
    bounds: [west, south, east, north],
    ...bitmapProps,
  });
}
