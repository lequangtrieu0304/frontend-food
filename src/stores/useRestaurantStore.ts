import axios from "axios";
import {create} from "zustand";
import {RestaurantState} from "@/types/restaurantType.ts";
import {createJSONStorage, persist} from "zustand/middleware";

const API_END_POINT = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: [],
    appliedFilter: [],
    singleRestaurant: null,
    searchRestaurant: async (searchText: string) => {
      try {
        set({loading: true})
        // const params = new URLSearchParams();

        const res = await axios.get(`${API_END_POINT}/api/v1/restaurants/search/${searchText}`);
        if (res.data.success) {
          set({loading: false, searchedRestaurant: res.data.data});
        }
      } catch (error) {
        console.log(error)
        set({loading: false})
      }
    },
    setAppliedFilter: (value: string) => {
      set((state: RestaurantState) => {
        const isAlreadyApplied = state.appliedFilter.includes(value);
        const updatedFilter = isAlreadyApplied
          ? state.appliedFilter.filter(i => i !== value)
          : [...state.appliedFilter, value];
        return {...state, appliedFilter: updatedFilter}
      })
    },
    resetAppliedFilter: () => {
      set({appliedFilter: []})
    },
    getSingleRestaurant: async (restaurantId: string) => {
      try {
        const response = await axios.get(`${API_END_POINT}/api/v1/restaurants/${restaurantId}`);
        if (response.data.success) {
          set({singleRestaurant: response.data.data})
        }
      } catch (error) {
        console.log(error)
        set({loading: false})
      }
    },
  }),
  {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
  }
));