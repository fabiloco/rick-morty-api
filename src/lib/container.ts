const container = new Map();

export function Injectable(target: any) {
  container.set(target, new target());
}

export function Inject<T>(target: { new (): T }): T {
  return container.get(target);
}
