const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const { app, server } = require('../index')
const Gif = require('../Schema/Gif')
const User = require('../Schema/Users')

const api = supertest(app)


const initialUser = {
    username: 'Sebastiann',
    password: '123456'
}

// eslint-disable-next-line no-undef
describe('testing api', () => {
    // eslint-disable-next-line no-undef
    beforeEach(async () => {
        await Gif.deleteMany({})
        await User.deleteMany({})

    // in case i prefer test other things I would use db directly and
    // manually each user and gif
    })

    // eslint-disable-next-line no-undef
    test('checking', async () => {
        await api.post('/api/testing/reset').expect(204)
    })

    // eslint-disable-next-line no-undef
    test('user may be created', async () => {
        await api.post('/db/users').send(initialUser).expect(201)
    })
})

// eslint-disable-next-line no-undef
describe('logging', () => {
    // eslint-disable-next-line no-undef
    beforeEach(async () => {
        await Gif.deleteMany({})
        await User.deleteMany({})

        const password = '123456'

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: 'testing',
            passwordHash: passwordHashed

        })

        await newUser.save()
    })

    // eslint-disable-next-line no-undef
    test('login', async () => {
        const testUser = {
            username: 'testing',
            password: '123456'
        }

        const ans = await api.post('/db/login').send(testUser).expect(200)

        // eslint-disable-next-line no-undef
        expect(ans.body.username).toContain('testing')
    })
})

// eslint-disable-next-line no-undef
afterAll(async () => {
    await mongoose.disconnect()
    server.close()
})
