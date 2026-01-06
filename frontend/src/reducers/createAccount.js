import * as ActionTypes from "../actions/constants";

const createAccount = (
  state = {
    nameValidationMessage: null,
    openingBalanceValidationMessage: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE:
      return Object.assign({}, state, {
        nameValidationMessage: action.validationResult.nameValidationMessage,
        openingBalanceValidationMessage:
          action.validationResult.openingBalanceValidationMessage,
      });
    case ActionTypes.CREATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        nameValidationMessage: null,
        openingBalanceValidationMessage: null,
      });
    case ActionTypes.CREATE_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        nameValidationMessage: null,
        openingBalanceValidationMessage: null,
      });
    default:
      return state;
  }
};

export default createAccount;
