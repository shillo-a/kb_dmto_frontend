import { configureStore } from '@reduxjs/toolkit'

import authSlice from '../src/modules/Authorization/authorizationSlice'
import projectsSlice from '../src/modules/Project/projectSlice'
import roleProjectSlice from '../src/modules/RoleProject/roleProjectSlice'

export default configureStore({
    reducer: {
        auth: authSlice,
        projects: projectsSlice,
        roleProject: roleProjectSlice
    }
})