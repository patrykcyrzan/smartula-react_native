
import {Animated
} from "react-native";
import { UPDATE_SCROLLPOS} from "../constants/ActionTypes"

const initialState =
    {
        event: new Animated.Value(0)
    }

export default function events (state = initialState, action)  {
    switch (action.type) {
        case UPDATE_SCROLLPOS:
            return (
                {
                    event: action.event
                }
        )

        default:
            return state
    }
}