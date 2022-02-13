// import { Action } from '@ngrx/store';

// import { FoodModel } from '../../cart/food.model';
// import * as CartActions from './cart.actions';

// const initialState = {
//   foodItems: [],
// };

// export function cartReducer(
//   state = initialState,
//   action: CartActions.CartActions
// ) {
//   switch (action.type) {
//     case CartActions.ADD_ITEM:
//       return {
//         ...state,
//         foodItems: state.foodItems.find(item => {
//           if(item.id === action.payload.id){
//             return [item, action.payload.qty++]
//           }
//         })
//       };
//     case CartActions.DELETE_ITEM:
//       return {
//         ...state,
//         foodItems: state.foodItems.filter((item, itemIndex) => {
//           return itemIndex !== action.payload;
//         }),
//       };
//     default:
//       return state;
//   }
// }
//   // state.map(newsItem => {
//   //               if (newsItem.id === action.payload.id) {
//   //                   return [newsItem, action.payload];
//   //               }
//   //           });