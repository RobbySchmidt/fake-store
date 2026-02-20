export default defineEventHandler(async () => {
  const users = await $fetch("https://api.escuelajs.co/api/v1/users")
  return users
})
