
import {Animated
} from "react-native";
import {UPDATE_STACKNAV, UPDATE_TABNAV} from "../constants/ActionTypes"

const initialState =
    {
        dashboardStackNavigation: {routeName: "Dashboard"},
        dashboardTabNavigation: null
    }

export default function navigation (state = initialState, action)  {
    switch (action.type) {
        case UPDATE_STACKNAV:
            return (
                {
                    dashboardTabNavigation: state.dashboardTabNavigation,
                    dashboardStackNavigation: action.navigation,
                }
            )
        case UPDATE_TABNAV:
            return (
                {
                    dashboardStackNavigation: state.dashboardStackNavigation,
                    dashboardTabNavigation: action.navigation,
                }
            )

        default:
            return state
    }
}