import { seedMember } from './seeders/seed-member';
import { seedOperation } from './seeders/seed-operations';

const main = async () => {
  for (let i = 0; i < 20; i++) {
    await seedMember({});
  }

  for (let i = 0; i < 20; i++) {
    await seedOperation({ number: i });
  }
};

main();
