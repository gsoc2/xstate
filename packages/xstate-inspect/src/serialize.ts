import { AnyState, AnyStateMachine } from 'xstate';
import { Replacer } from './types.js';
import { stringify } from './utils.js';

export function selectivelyStringify<T extends object>(
  value: T,
  keys: Array<keyof T>,
  replacer?: Replacer
): string {
  const selected: any = {};

  for (const key of keys) {
    selected[key] = value[key];
  }

  const serialized = JSON.parse(stringify(selected, replacer));
  return stringify({
    ...value,
    ...serialized
  });
}

export function stringifyState(state: AnyState, replacer?: Replacer): string {
  const { machine, configuration, _internalQueue, ...stateToStringify } = state;
  return selectivelyStringify(
    stateToStringify,
    ['context', 'event', '_event', 'actions'],
    replacer
  );
}

export function stringifyMachine(
  machine: AnyStateMachine,
  replacer?: Replacer
): string {
  return selectivelyStringify(machine.definition, ['context'], replacer);
}
