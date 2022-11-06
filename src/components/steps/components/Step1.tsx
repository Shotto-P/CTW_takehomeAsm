import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import { Grid, GridItem, Box, Text, Select } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import { Button, Input, } from "@material-tailwind/react";
import "../../../index.css";
import ButtonGroup from "../../ButtonGroup";
import { OrderContext } from "./../../../hooks/OrderProvider";
import { OrderContextType } from "../../../hooks/types";

export default function Step1({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  type iValues = {
    mealType: string;
    noOfPeople: number;
    submitBtn?: string;
  };

  const initVal: iValues = {
    mealType: "",
    noOfPeople: 1,
  };

  const { setMealType, setPeople } = useContext(
    OrderContext
  ) as OrderContextType;

  const isClicked = useRef(false);

  const addPpl = (props: FormikProps<any>) => {
    let res = document.getElementById("noOfPeople") as HTMLInputElement;
    let number = parseInt(res.value);
    let error = document.getElementById("noOfPeople.error") as HTMLDivElement;
    if (number < 10) {
      props.setFieldValue("noOfPeople", number+1);
      error.style.display = "none";
    } else {
      error.style.display = "block";
      error.innerHTML = "The maximum is 10";
    }
  };

  const minusPpl = (props: FormikProps<any>) => {
    let res = document.getElementById("noOfPeople") as HTMLInputElement;
    let number = parseInt(res.value);
    let error = document.getElementById("noOfPeople.error") as HTMLDivElement;
    if (number > 1) {
      props.setFieldValue("noOfPeople", number-1);
      error.style.display = "none";
    } else {
      error.style.display = "block";
      error.innerHTML = "The minimum is 1";
    }
  };

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initVal}
          onSubmit={(values, action) => {
            //console.log(values);
            if (values.submitBtn !== undefined) {
              if (values.submitBtn === "Next") {
                if (values.mealType !== "") {
                  const { mealType, noOfPeople } = values;
                  setMealType(mealType);
                  setPeople(noOfPeople);
                  setStep(2);
                }
              }
            }
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Grid templateRows="repeat(5, 1fr)" gap={9}>
                <GridItem rowSpan={2} ml={4}>
                  <Field name="mealType">
                    {({ field, form }: FieldProps) => (
                      <>
                        <Text>Please select a meal</Text>
                        <Select
                          size="lg"
                          placeholder="------"
                          variant="flushed"
                          id="mealType"
                          {...field}
                          isRequired={!isClicked.current}
                        >
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                        </Select>
                      </>
                    )}
                  </Field>
                </GridItem>
                <GridItem rowSpan={2} ml={4}>
                  
                  <Grid templateColumns="repeat(6,1fr)" gap={1}>
                    <GridItem colSpan={5}>
                      <Field name="noOfPeople">
                        {({ field, form }: FieldProps) => (
                          <>          
                            <Input
                              variant="static"
                              label="Please Enter the Number of People"
                              type="number"
                              min={1}
                              max={10}
                              id={"noOfPeople"}
                              {...field}
                            />
                          </>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem>
                      <Box>
                        <Button variant="text" onClick={()=>addPpl(props)}>
                          +
                        </Button>
                        <Button variant="text" onClick={()=>minusPpl(props)}>
                          -
                        </Button>
                      </Box>
                    </GridItem>
                  </Grid>
                  <Box
                    display={"none"}
                    id="noOfPeople.error"
                    color={"red"}
                    my={0}
                  />
                </GridItem>
                <GridItem>
                  <ButtonGroup step={1} props={props} isClicked={isClicked}/>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
