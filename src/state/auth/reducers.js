import { allRoles, INVENTORY, RECEPTION } from '../../utils/roles';
import { LOGIN, LOGOUT } from './actions';

export const INITIAL_STATE = {
  logged: false,
  username: "",
  roles: [RECEPTION]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        logged: true,
        username: action.payload,
        roles: [action.payload],
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
