<template>
  <div class="container mx-auto py-12">
    <div class="xl:w-10/12 mx-auto px-4 space-y-4">
      <Select v-model="filterValue">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem :value="null">
              All products
            </SelectItem>
            <SelectItem
              v-if="categories"
              v-for="cat in filteredCategories" 
              :value="cat.name">
              {{ cat.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span class="block">
        {{ filteredProducts.length }} Products found
      </span>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card
          v-if="loading" 
          v-for="i in filteredProducts">
          <CardHeader>
            <CardTitle>
              <Skeleton class="h-4 w-[250px]" />
            </CardTitle>
            <CardDescription>
              <Skeleton class="h-4 w-[100px]" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton class="aspect-square rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton class="h-4 w-[80px]" />
            <Skeleton class="h-9 w-[130px]" />
          </CardFooter>
        </Card>
        <ProductCard
          v-else
          v-if="filteredProducts" 
          v-for="product in filteredProducts" 
          :data="product"/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const { products, categories } = storeToRefs(store)

  const filterValue = ref(null)

  const loading = ref(false)

  const filteredProducts = computed(() => {
    loading.value = true

    setTimeout(() =>loading.value = false, 300)

    if(!filterValue.value) return products.value
    return products.value.filter(p => p.category?.name === filterValue.value)
  })

  const filteredCategories = computed(() => {
    return categories.value.filter(cat =>
      products.value.some(
        product => product.category?.name === cat.name
      )
    )
  })
</script>