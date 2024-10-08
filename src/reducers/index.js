import { combineReducers } from 'redux';

import api from './api';
import auth from './auth';
import campaign from './campaign';
import brands from './brands'
import creators from './creators'
import kyc from './kyc';
import Payment from './Payment';

const rootReducer = combineReducers({
    api,
    auth,
    campaign,
    brands,
    creators,
    kyc,
    Payment
})

export default rootReducer;