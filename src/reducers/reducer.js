import  { combineReducers } from 'redux'
import { user } from './userReducer.js'
import { education } from './educationReducer.js'
import { specialty } from './specialtyReducer.js'
import { company } from './companyReducer.js'
import { industry } from './industryReducer.js'

export default combineReducers({user,education,specialty,company,industry});

