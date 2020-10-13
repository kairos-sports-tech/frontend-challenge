import faker from 'faker'

faker.seed(5)

export const makePerson = () => {
    return {
        id: faker.random.uuid,
        avatarUrl: faker.random.arrayElement([
            require('./avatar-1.png'),
            require('./avatar-2.png'),
            require('./avatar-3.png'),
            require('./avatar-4.png'),
            require('./avatar-5.png'),
            require('./avatar-6.png'),
            require('./avatar-7.png'),
            require('./avatar-8.png'),
        ]),
        status: faker.random.arrayElement(['active', 'inactive', 'watching_video', 'wifi']),
        firstName: faker.name.firstName,
        lastName: faker.name.lastName,
        percentageComplete: faker.random.number(0, 100),
        lastSeenMinutesAgo: faker.random.number(1, 50)
    }
}
