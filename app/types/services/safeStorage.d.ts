type optSave = { key: string; value: string };

interface ISafeStoreService {
  save(opt: optSave): void;
  load(key: string): string | null | undefined;
}
