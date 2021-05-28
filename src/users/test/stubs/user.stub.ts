import { User } from "../../schemas/user.schema";

export const userStub = (): User => {
 return {
    userId: '123',
    email: 'test@example.com',
    age: 23,
    favoriteFoods:  ['apples', 'pizza']
  }
}