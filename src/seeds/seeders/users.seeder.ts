import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/user.entity';

export const generateUsers = async (amount = 10): Promise<User[]> => {
  const passwordHash = await bcrypt.hash(process.env.DEFAULT_CLIENT_PASSWORD, await bcrypt.genSalt());

  return Array.from({ length: amount }, () => {
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();

    return {
      firstName: fName,
      lastName: lName,
      username: faker.internet.userName(fName, lName),
      password: passwordHash,
    } as User;
  });
};
