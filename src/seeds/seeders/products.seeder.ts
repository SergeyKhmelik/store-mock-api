import { faker } from '@faker-js/faker';
import { Product, ProductColors, ProductMaterials, ProductSizes } from '../../products/product.entity';

export const generateProducts = (amount = 20): Product[] => {
  return Array.from(
    { length: amount },
    () =>
      ({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price(20, 700)),
        colors: faker.helpers.arrayElements(Object.values(ProductColors)),
        sizes: faker.helpers.arrayElements(Object.values(ProductSizes), 4),
        material: faker.helpers.arrayElement(Object.values(ProductMaterials)),
        images: [faker.image.fashion(300, 300)],
      } as Product),
  );
};
