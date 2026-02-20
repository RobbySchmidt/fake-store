export default defineEventHandler(async () => {
  const categories = await $fetch("https://api.escuelajs.co/api/v1/categories")
  return categories
})
