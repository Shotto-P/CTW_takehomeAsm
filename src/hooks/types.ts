export type order = {
    dish: string;
    number: number;
}

export interface orderType {
    mealType: string;
    noOfPeople: number;
    restaurant: string;
    orders: order[];
}

export type OrderContextType = {
    contextValue: orderType;
    setMealType: (value: string) => void;
    setPeople: (value: number) => void;
    setRestaurant: (value: string) => void;
    setOrders: (value: order[]) => void;
};