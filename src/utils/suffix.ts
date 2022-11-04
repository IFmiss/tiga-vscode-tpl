export default function suffix(name: string, ...args: string[]) {
  return args.includes(name.split('.').slice(-1).toString())
}