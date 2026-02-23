<template>
  <div>
    <HeroBanner />
    <div class="container mx-auto py-12">
      <div class="xl:w-10/12 mx-auto px-4 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <Input
              v-model="searchValue" 
              type="text"
              placeholder="Search for Product"
              />
            <X 
              v-if="searchValue"
              @click="searchValue = null"
              class="absolute top-2 right-2 xl:cursor-pointer size-5"/>
          </div>
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
        </div>
        <span class="block">
          {{ selectedProducts.length }} Products found
        </span>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card
            v-if="loading" 
            v-for="i in selectedProducts">
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
            v-for="product in selectedProducts" 
            :data="product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { X } from "lucide-vue-next"
  import { useStore } from '@/store/store'
  import { storeToRefs } from 'pinia'

  const store = useStore()
  const { products, categories } = storeToRefs(store)

  const filterValue = ref(null)
  const searchValue = ref(null)

  const loading = ref(false)

  const filteredProducts = computed(() => {
    loading.value = true

    setTimeout(() =>loading.value = false, 300)

    if(!filterValue.value) return products.value
    return products.value.filter(p => p.category?.name === filterValue.value)
  })

  const selectedProducts = computed(() => {
    loading.value = true

    setTimeout(() =>loading.value = false, 300)

    if(!searchValue.value) return filteredProducts.value
    return filteredProducts.value.filter(p => p.title.toLowerCase().includes(searchValue.value.toLowerCase()))
  })

  const filteredCategories = computed(() => {
    return categories.value.filter(cat =>
      products.value.some(
        product => product.category?.name === cat.name
      )
    )
  })
</script>