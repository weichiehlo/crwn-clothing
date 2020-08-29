import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';

import { clearCart,loadCart } from './cart.actions';
import {
  getCurrentUser,
  loadCartFromFireStore,
} from '../../firebase/firebase.utils';






export function* clearCartOnSignOut() {
  yield put(clearCart());
  //what action to take when signout
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
  //what ACTION are we listening to
}

export function* loadingCart(){
  const userAuth = yield getCurrentUser();
  const cartItems = yield call(loadCartFromFireStore,userAuth)
  if(cartItems.length >0 ){
    yield put(loadCart(cartItems[0]))
  }
}



export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, loadingCart);
  //what ACTION are we listening to
}



export function* cartSagas() {
  yield all([call(onSignOutSuccess),
            call(onSignInSuccess)]);
}

