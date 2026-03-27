export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}