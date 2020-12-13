interface TplExpOptions {
  spaceCount: number
}

export default function tplExp(str: string, options?: TplExpOptions) {
  const spaceCount = options?.spaceCount ?? 4;

  const exp = new RegExp(`^${' '.repeat(spaceCount)}`, 'gm');
  return str.replace(/^\n/, '')
    .replace(exp, '')
    .replace(/(--rm--)\n/g, '');
}