export default function checkValidName(name: string) {
  return /^[A-Za-z][-a-zA-Z0-9]*[a-zA-Z0-9](\.(jsx|tsx|vue|svelte))?$/.test(name);
}
