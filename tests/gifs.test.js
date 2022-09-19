const mongoose = require('mongoose')
const supertest = require('supertest')

const {app, server} = require('../index')
const Gif = require('../Schema/Gif')
const User = require('../Schema/Users')

const api = supertest(app)



const initialGifs = [
    {
        url:'',
        title:'',
        gif_id:''
    }
]

const initialUser = {
    username:'SebastianAdmin',
    password:'12345'
}


describe('testing api', ()=>{

    beforeEach(async ()=>{
        await Gif.deleteMany({})
        await User.deleteMany({})


        // in case i prefer test other things I would use db directly and 
        // manually each user and gif 

    })

    test('Create new user',async  ()=>{

        const response = await api.post('/db/users', initialUser)
        expect(201)
        expect(response.body.username === initialUser.username )
    })

    /*
    test('user are returned by json', async () => {
        await api
            .get('/db/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })*/

    
    afterAll(()=>{
        mongoose.connection.close()
        server.close()
       
    })

})

