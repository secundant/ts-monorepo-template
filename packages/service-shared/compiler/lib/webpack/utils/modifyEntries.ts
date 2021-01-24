import { isPlainObject, isString } from 'lodash';
// @ts-expect-error wrong webpack types package
import { EntryFunc } from 'webpack';

export type Entry = string | string[];
export type EntriesRecord = Record<string, Entry>;
export type UnknownEntries = Entry | EntriesRecord | EntryFunc;

export type ParsedEntry = string[];
export type EntryModifier = (entry: ParsedEntry) => ParsedEntry;

export function modifyEntries(entries: UnknownEntries, modifier: EntryModifier): UnknownEntries {
  if (isString(entries) || Array.isArray(entries)) return patchEntry(entries, modifier);
  if (isPlainObject(entries)) {
    return patchEntriesRecord(entries as EntriesRecord, modifier);
  }
  console.log(entries);
  return entries;
}

const patchEntriesRecord = (entries: EntriesRecord, modifier: EntryModifier) =>
  Object.entries(entries).reduce<EntriesRecord>((newEntries, [entryName, entry]) => {
    newEntries[entryName] = patchEntry(entry, modifier);
    return newEntries;
  }, {});

const patchEntry = (entry: Entry, modifier: EntryModifier) =>
  modifier(Array.isArray(entry) ? entry : [entry]);
