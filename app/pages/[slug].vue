<template>
  <div class="container mx-auto py-12">
    <div class="xl:w-8/12 mx-auto px-4 space-y-4">
      <Button 
        as-child
        class="group">
        <NuxtLink 
          to="/"
          class="flex items-center">
          <MoveLeft class="size-5 group-hover:-translate-x-1 duration-300 ease-in-out"/>
          back to Products
        </NuxtLink>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle v-if="product?.title">
            {{ product?.title }}
          </CardTitle>
          <CardDescription v-if="product?.category">
            Category: {{ product?.category.name }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Carousel 
            class="relative w-full" 
            @init-api="setApi"
            :opts="{
              align: 'start',
              loop: true,
            }">
            <CarouselContent>
              <CarouselItem
                v-if="product?.images" 
                v-for="(image, index) in 
                product?.images" 
                :key="index"
                class="md:basis-1/2">
                <Card>
                  <CardContent>
                    <img 
                      :src="image" 
                      :alt="product?.title">
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div class="py-2 text-center text-sm text-muted-foreground">
            Image {{ current }} of {{ totalCount }}
          </div>

          <div
            v-if="product?.description" 
            v-html="product?.description"
            class="mt-4">
          </div>
        </CardContent>
        <CardFooter>
          <span 
            v-if="product?.price">
            Price: {{ product?.price }}€
          </span>
        </CardFooter>
      </Card>
      <h3 class="text-xl font-bold mt-18">
        more from this category
      </h3>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ProductCard
          v-if="featuredProducts" 
          v-for="product in featuredProducts" 
          :data="product"/>
      </div>
      <div class="mx-auto w-fit pt-4">
        <Button 
          @click="loadMoreItems()">
          load more
          <Plus />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MoveLeft, Plus } from "lucide-vue-next"
  import type { CarouselApi } from '@/components/ui/carousel'
  import { watchOnce } from '@vueuse/core'
  import { useStore } from '@/store/store'

  const { params } = useRoute()
  
  const store = useStore()
  
  const product = computed(() => {
    return store.getProductBySlug(params.slug)
  })

  const api = ref<CarouselApi>()
  const totalCount = ref(0)
  const current = ref(0)
  function setApi(val: CarouselApi) {
    api.value = val
  }

  const itemCount = ref(3)

  function loadMoreItems() {
    itemCount.value = itemCount.value + 3
  }

  const featuredProducts = computed(() => {
    if (!product.value?.category) return []

    return store.products.filter(p =>
      p.slug !== params.slug &&
      p.category?.name === product.value.category.name
    ).slice(0, itemCount.value)
  })

  watchOnce(api, (api) => {
    if (!api)
      return
    totalCount.value = api.scrollSnapList().length
    current.value = api.selectedScrollSnap() + 1
    api.on('select', () => {
      current.value = api.selectedScrollSnap() + 1
    })
  })
</script>

<style scoped>

</style>