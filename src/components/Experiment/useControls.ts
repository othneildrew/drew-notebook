import { useContext, useEffect, useRef, useState } from 'react';
import GUI from 'lil-gui';

import { ControlsContainerContext } from './ControlsContainer';

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

interface RangeControl {
  value: number;
  min: number;
  max: number;
  step?: number;
}

type OptionsControl = string[];
type Control = number | boolean | string | OptionsControl | RangeControl;
type ControlSchema = Record<string, Control>;

type ControlValue<C extends Control> = C extends RangeControl | number
  ? number
  : C extends boolean
    ? boolean
    : string;

type ControlValues<S extends ControlSchema> = { [K in keyof S]: ControlValue<S[K]> };

type TextController = { $input: HTMLInputElement };

function getInitialValue(control: Control) {
  if (Array.isArray(control)) {
    return control[0];
  }
  return typeof control === 'object' ? control.value : control;
}

function getInitialValues<S extends ControlSchema>(schema: S) {
  const entries = Object.entries(schema).map(([name, control]) => [name, getInitialValue(control)]);
  return Object.fromEntries(entries) as ControlValues<S>;
}

function addController(gui: GUI, values: Record<string, unknown>, name: string, control: Control) {
  if (Array.isArray(control)) {
    gui.add(values, name, control);
  } else if (typeof control === 'object') {
    gui.add(values, name, control.min, control.max, control.step);
  } else if (typeof control === 'string' && HEX_COLOR_PATTERN.test(control)) {
    gui.addColor(values, name);
  } else if (typeof control === 'string' && ISO_DATE_PATTERN.test(control)) {
    const dateController = gui.add(values, name) as unknown as TextController;
    dateController.$input.type = 'date';
  } else {
    gui.add(values, name);
  }
}

/**
 * Builds a lil-gui panel in the page's controls column from the schema's
 * initial values and returns the live values. Only the first schema is used.
 */
export function useControls<S extends ControlSchema>(schema: S): ControlValues<S> {
  const controlsContainer = useContext(ControlsContainerContext);
  const initialSchema = useRef(schema);
  const [values, setValues] = useState(() => getInitialValues(schema));

  useEffect(() => {
    if (!controlsContainer) {
      return;
    }

    const gui = new GUI({ container: controlsContainer, title: 'Controls' });
    const guiValues: Record<string, unknown> = { ...getInitialValues(initialSchema.current) };

    for (const [name, control] of Object.entries(initialSchema.current)) {
      addController(gui, guiValues, name, control);
    }
    gui.onChange(() => setValues({ ...guiValues } as ControlValues<S>));

    return () => gui.destroy();
  }, [controlsContainer]);

  return values;
}
