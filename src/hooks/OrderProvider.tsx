import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  PropsWithChildren,
} from "react";
import orderReducer from "./orderReducer";
import { order, orderType, OrderContextType } from "./types";
export const OrderContext = createContext<OrderContextType | null>(null);

const OrderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialState: orderType = {
    mealType: "",
    noOfPeople: 0,
    restaurant: "",
    orders: [{ dish: "", number: 0 }],
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { mealType, noOfPeople, restaurant, orders } = state;

  const setMealType = useCallback(
    (value: string) => {
      dispatch({
        type: "SET_MEAL",
        payload: { value },
      });
    },
    [dispatch]
  );

  const setPeople = useCallback(
    (value: number) => {
      dispatch({
        type: "SET_PEOPLE",
        payload: { value },
      });
    },
    [dispatch]
  );

  const setRestaurant = useCallback(
    (value: string) => {
      dispatch({
        type: "SET_RESTAURANT",
        payload: { value },
      });
    },
    [dispatch]
  );

  const setOrders = useCallback(
    (value: order[]) => {
      dispatch({
        type: "SET_ORDERS",
        payload: { value },
      });
    },
    [dispatch]
  );

  const contextValue = useMemo(() => {
    const newVal = {
      mealType: mealType,
      noOfPeople: noOfPeople,
      restaurant: restaurant,
      orders: orders,
    };
    return newVal;
  }, [state]);

  return (
    <OrderContext.Provider
      value={{
        contextValue,
        setMealType,
        setPeople,
        setRestaurant,
        setOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
