import { Middleware } from "@reduxjs/toolkit";
import { triggerAction } from "../slice/appbarSlice";
import { navigate } from "../../../services/navigationService";
import { logoutUser } from "../../../features/auth/slice/authSlice";
import { AppDispatch } from "../../../store/store";

export const appbarMiddleware: Middleware = store => next => action => {

    const dispatch = store.dispatch as AppDispatch;

    if (triggerAction.match(action)) {
        const actionKey = action.payload;
        console.log("Appbar action triggered: ", actionKey);
        //const navigation = store.getState().navigation;
        // Handle different action keys and navigate accordingly
        switch (actionKey) {
            case 'logout':
                console.log('Logging out...');
                // Dispatch logout action
                dispatch(logoutUser());
                //navigate('Login');
                break;

            // Add more cases for other actions
            default:
                console.warn("Unhandled appbar action: ", actionKey);
        }
    }

    return next(action);
};
