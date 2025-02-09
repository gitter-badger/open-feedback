import { combineReducers } from 'redux'
import sessionsReducer from './feedback/sessions/core/sessionsReducer'
import sessionReducer from './feedback/session/core/sessionReducer'
import speakerReducer from './feedback/speaker/core/speakerReducer'
import projectReducer from './feedback/project/projectReducer'
import authReducer from './feedback/auth/authReducer'
import voteReducer from './feedback/vote/voteReducer'
import adminAuthReducer from './admin/auth/authReducer'
import adminProjectReducer from './admin/project/core/projectReducer'
import adminNotificationReducer from './admin/notification/notificationReducer'

const rootReducer = combineReducers({
    sessions: sessionsReducer,
    session: sessionReducer,
    speakers: speakerReducer,
    project: projectReducer,
    auth: authReducer,
    votes: voteReducer,
    adminAuth: adminAuthReducer,
    adminProject: adminProjectReducer,
    adminNotifications: adminNotificationReducer
})

export default rootReducer
