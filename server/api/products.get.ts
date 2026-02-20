export default defineEventHandler(async () => {
  const products = await $fetch("https://api.escuelajs.co/api/v1/products")
  return products
})
