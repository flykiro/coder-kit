
export function arrayToClassName(...arg: string[]) {
  return [...arg].join(' ')
}

export function noop(...arg: any[]): any {}