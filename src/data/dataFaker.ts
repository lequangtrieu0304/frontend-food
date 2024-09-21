import { faker } from '@faker-js/faker';
import {CartItem} from "@/types/cartType.ts";
import {MenuItem, Restaurant} from "@/types/restaurantType.ts";

export function createFakeMenuItem(): MenuItem {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({min: 10, max: 100})),
    image: faker.image.avatar(),
  };
}

export function createFakeCartItem(): CartItem {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({min: 10, max: 100})),
    image: faker.image.avatar(),
    quantity: faker.number.int({ max: 10 }),
  };
}

function createRestaurant(): Restaurant {
  return {
    _id: faker.database.mongodbObjectId(),
    user: faker.person.fullName(),
    restaurantName: faker.commerce.productDescription(),
    city: faker.commerce.productDescription(),
    country: faker.commerce.productDescription(),
    deliveryTime: faker.number.int(),
    cuisines: Array.from({ length: 10 }, () => faker.string.uuid()),
    menus: fakeMenuItems,
    imageUrl: faker.image.avatar(),
  };
}

export const fakeMenuItems = Array.from({ length: 10 }, () => createFakeMenuItem());

export const fakeCartItems = Array.from({ length: 10 }, () => createFakeCartItem());

export const fakeRestaurants = Array.from({ length: 10 }, () => createRestaurant());


