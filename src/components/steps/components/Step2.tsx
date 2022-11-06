import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import { Box, Grid, GridItem, Select, Text } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";

import ButtonGroup from "../../ButtonGroup";
import { OrderContext } from "../../../hooks/OrderProvider";
import { OrderContextType } from "../../../hooks/types";
import data from "./../../../data/dishes.json";

export default function Step2({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  type iValues = {
    restaurant: string;
    submitBtn?: string;
  };

  const initialValues: iValues = { restaurant: "" };
  const { contextValue, setRestaurant } = useContext(
    OrderContext
  ) as OrderContextType;
  const { mealType } = contextValue;

  const isClicked = useRef<boolean>(false);

  const curData = data.dishes.filter((dish) => {
    return dish.availableMeals.includes(mealType.toLowerCase());
  });
  const restaurantList: string[] = [];
  curData.forEach((item) => {
    if (!restaurantList.includes(item.restaurant)) {
      restaurantList.push(item.restaurant);
    }
  });
  //console.log(restaurantList, mealType);

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, action) => {
            //console.log(values);
            //console.log(contextValue);
            if (values.submitBtn !== undefined) {
              if (values.submitBtn === "Next") {
                if (values.restaurant !== "") {
                  setRestaurant(values.restaurant);
                  setStep(3);
                }
              }
              if (values.submitBtn === "Previous") {
                setStep(1);
              }
            }
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Grid templateRows="repeat(3,1fr)" gap={9}>
                <GridItem rowSpan={2} ml={4}>
                  <Field name="restaurant">
                    {({ field, form }: FieldProps) => (
                      <>
                        <Text>Please Select a Restaurant</Text>
                        <Select
                          size="lg"
                          placeholder="------"
                          variant="flushed"
                          {...field}
                          isRequired={!isClicked.current}
                        >
                          {restaurantList.map((restaurant, index) => {
                            return (
                              <option value={restaurant} key={index}>
                                {restaurant}
                              </option>
                            );
                          })}
                        </Select>
                      </>
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <ButtonGroup step={2} props={props} isClicked={isClicked}/>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
