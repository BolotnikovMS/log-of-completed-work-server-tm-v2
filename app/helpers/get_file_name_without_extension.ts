export function getFileNameWithoutExtension(filename: string, extension: string): string {
  const escapedExt = extension.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`\\.${escapedExt}$`)

  return filename.replace(regex, '')
}
