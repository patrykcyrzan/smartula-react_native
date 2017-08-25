import * as types from '../constants/ActionTypes'

export const updateScrollPos = event => ({ type: types.UPDATE_SCROLLPOS, event});
export const updateStackNav = navigation => ({type: types.UPDATE_STACKNAV, navigation});
export const updateTabNav = navigation => ({type: types.UPDATE_TABNAV, navigation});