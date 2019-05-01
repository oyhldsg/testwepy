import ajax from '@/common/ajax'

export default {
    auth: {
        getToken: ajax.create('/auth/access_token'),
        checkToken: ajax.query('/auth/access_token'),
        postUser: ajax.create('/auth/user')
    },
    quote: {
        getQuoteList: ajax.query('/enquiries')
    },
    my: {
        myInfo: ajax.query('/my/profile')
    }
}