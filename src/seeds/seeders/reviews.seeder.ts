import { faker } from '@faker-js/faker';
import { Product } from '../../products/product.entity';
import { User } from '../../users/user.entity';
import { Review } from '../../reviews/review.entity';

export const generateReviews = (product: Product, authors: User[], amount = 5): Review[] => {
  return Array.from(
    { length: amount },
    () =>
      ({
        reviewMessage: faker.commerce.productAdjective(),
        rate: faker.datatype.number({ min: 0, max: 5 }),
        images: [faker.image.fashion(300, 300)],
        author: faker.helpers.arrayElement(authors),
        product: product,
      } as Review),
  );
};
