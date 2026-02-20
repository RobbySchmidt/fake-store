<template>
  <Card>
    <CardHeader>
      <CardTitle v-if="data?.title">
        {{ data?.title }}
      </CardTitle>
      <CardDescription v-if="data?.category">
        Category: {{ data?.category.name }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <img
        v-if="data?.images" 
        :src="data?.images[0]" 
        :alt="data?.title"
        class="block w-full rounded-xl overflow-hidden">
    </CardContent>
    <CardFooter>
      <span 
        v-if="data?.price">
        Price: {{ data?.price }}€
      </span>
      <Button as-child>
        <NuxtLink
          v-if="data?.slug" 
          :to="data?.slug">
          Product details
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup>
  defineProps({
    data: Object
  })
</script>

<style scoped>

</style>