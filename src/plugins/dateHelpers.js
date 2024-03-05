import { formatDate } from '@vueuse/core'

export const parseDateString = (dateString) => {
  const date = new Date(dateString)
  return formatDate(date, 'MM/DD/YYYY hh:mm A')
}