
export function classes(...args: string[]) {
  return args.join(' ')
}

export const noop: (...arg: any[]) => any = () => {}


export const ROLE_BUTTON = 'button'