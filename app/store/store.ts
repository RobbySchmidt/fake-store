import { defineStore } from 'pinia'
export const useStore = defineStore('store', {
  state: () => ({ 
    products: [],
    categories: []
  }),
  getters: {
    getProductBySlug: (state) => {
      return (slug) => state.products.find((p) => p.slug === slug)
    },
  },
  actions: {
    async getProducts() {
      try {
        this.products = await $fetch('/api/products')
      } catch (e) {}
    },

    async getCategories() {
      try {
        this.categories = await $fetch('/api/categories')
      } catch (e) {}
    },
  },
})