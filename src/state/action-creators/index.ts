import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions/index';

export const depositMoney = (amount: number) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.DEPOSIT,
    payload: amount,
  });
};

export const withdrawMoney = (amount: number) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.WITHDRAW,
    payload: amount,
  });
};

export const bankrupt = () => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.BANKRUPT,
  });
};
