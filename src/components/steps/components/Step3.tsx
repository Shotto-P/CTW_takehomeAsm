import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import { Box, Grid, GridItem, Flex, Select, useToast } from "@chakra-ui/react";
import {
  Formik,
  Form,
  FieldArray,
  Field,
  FieldProps,
  FormikProps,
} from "formik";
import { Button, Input } from "@material-tailwind/react";
import ButtonGroup from "../../ButtonGroup";
import { OrderContext } from "../../../hooks/OrderProvider";
import { OrderContextType } from "../../../hooks/types";
import data from "./../../../data/dishes.json";

export default function Step3({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  type order = {
    dish: string;
    number: number;
  };

  type iValues = {
    orders: Array<order>;
    submitBtn?: string;
  };

  const initialVal: iValues = {
    orders: [{ dish: "", number: 1 }],
  };

  const { contextValue, setOrders } = useContext(
    OrderContext
  ) as OrderContextType;
  const { mealType, noOfPeople, restaurant } = contextValue;

  const isClicked = useRef<boolean>(false);
  const toast = useToast();

  const curData = data.dishes.filter((dish) => {
    return (
      dish.availableMeals.includes(mealType.toLowerCase()) &&
      dish.restaurant === restaurant
    );
  });

  const dishList: string[] = [];
  curData.map((item) => 
    dishList.push(item.name)
  );

  const addNumber = (id: string, props: FormikProps<any>) => {
    let res = document.getElementById(id) as HTMLInputElement;
    let val: number = parseInt(res.value);
    if (val < 10) {
      props.setFieldValue(id, val + 1);
    }
  };

  const minusNumber = (id: string, props: FormikProps<any>) => {
    let res = document.getElementById(id) as HTMLInputElement;
    let val: number = parseInt(res.value);
    if (val > 1) {
      props.setFieldValue(id, val - 1);
    }
  };

  const checkDish = (dish:string, props:FormikProps<any>) => {
    let usedDish: string[] = [];
    props.values.orders.map((order:order) =>
      usedDish.push(order.dish)
    );

    return usedDish.includes(dish);
  }

  const checkNumber = (values: iValues) => {
    let curNumber = 0;
    values.orders.forEach((dish: order)=>{
        curNumber = curNumber + dish.number;
    })

    return curNumber;
  }

  const checkdishList = (props:FormikProps<any>) => {
    return props.values.orders.length === dishList.length;
  }

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialVal}
          onSubmit={(values, action) => {
            //console.log(values);
            //console.log(contextValue);
            if (values.submitBtn !== undefined) {
              if (values.submitBtn === "Next") {
                const total = checkNumber(values);
                if(total > 10){
                    toast({
                        title: 'Error',
                        description: "Your maximum number of dishes can't exceed 10",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      });
                }
                else if(total < noOfPeople){
                    toast({
                        title: 'Error',
                        description: "Your number of dishes must be greater than the number of people",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      });
                }
                else{
                    setOrders(values.orders)
                    setStep(4);
                }
                
              }
              if (values.submitBtn === "Previous") {
                setStep(2);
              }
            }
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Grid templateColumns="2fr 1fr 2fr 1fr" gap={8}>
                <GridItem ml={4}>Please Select a Dish</GridItem>
                <GridItem colStart={3}>
                  Please Enter the Number of Serving
                </GridItem>
              </Grid>
              <FieldArray
                name="orders"
                render={(arrayHelpers) => (
                  <>
                    <Box overflow={"visible"}>
                      {props.values.orders.map((order, index) => (
                        <React.Fragment key={index}>
                          <Grid templateColumns="2fr 1fr 2fr 1fr" gap={8}>
                            <GridItem ml={4}>
                              <Field name={`orders.${index}.dish`}>
                                {({ field, form }: FieldProps) => (
                                  
                                    <Select
                                      size="lg"
                                      variant="flushed"
                                      placeholder="------"
                                      {...field}
                                      isRequired={!isClicked.current}
                                    >
                                      {dishList
                                        
                                        .map((dish, index) => (
                                          <option value={dish} key={index} disabled={checkDish(dish, props)}>
                                            {dish}
                                          </option>
                                        ))}
                                    </Select>
                                 
                                )}
                              </Field>
                            </GridItem>
                            <GridItem colStart={3} >
                              <Field name={`orders.${index}.number`}>
                                {({ field, form }: FieldProps) => (
                                  <>
                                    <Grid
                                      templateColumns="repeat(6,1fr)"
                                      gap={1}
                                      my={2}
                                    >
                                      <GridItem colSpan={5}>
                                        <Input
                                          variant="static"
                                          type={"number"}
                                          min={1}
                                          max={10}
                                          id={`orders.${index}.number`}
                                          {...field}
                                        />
                                      </GridItem>
                                      <GridItem>
                                        <Box>
                                          <Button
                                            variant="text"
                                            size="sm"
                                            onClick={() =>
                                              addNumber(
                                                `orders.${index}.number`,
                                                props
                                              )
                                            }
                                          >
                                            +
                                          </Button>

                                          <Button
                                            variant="text"
                                            size="sm"
                                            onClick={() =>
                                              minusNumber(
                                                `orders.${index}.number`,
                                                props
                                              )
                                            }
                                          >
                                            -
                                          </Button>
                                        </Box>
                                      </GridItem>
                                    </Grid>
                                  </>
                                )}
                              </Field>
                            </GridItem>
                            <GridItem>
                              <Button
                                variant="outlined"
                                color={"red"}
                                onClick={() => {
                                  if (props.values.orders.length > 1) {
                                    arrayHelpers.remove(index);
                                  }else{
                                    toast({
                                        title: 'Error',
                                        description: "You must at least have 1 dish.",
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                      });
                                  }
                                }}
                              >
                                X
                              </Button>
                            </GridItem>
                          </Grid>
                        </React.Fragment>
                      ))}
                      <Flex>
                        <Box mx={5} display={checkNumber(props.values)<10 && !checkdishList(props)?"block":"none"}>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              arrayHelpers.push({ dish: "", number: 1 })
                            }
                          >
                            +
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  </>
                )}
              />
              <Box mt={40}>
                <ButtonGroup step={3} props={props} isClicked={isClicked}/>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
