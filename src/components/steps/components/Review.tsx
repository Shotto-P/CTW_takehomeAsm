import React, { Dispatch, SetStateAction, useContext, useRef } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import ButtonGroup from "../../ButtonGroup";
import { Formik, Form } from "formik";
import { OrderContext } from "../../../hooks/OrderProvider";
import { OrderContextType } from "../../../hooks/types";

export default function Review({setStep}: {setStep: Dispatch<SetStateAction<number>>}) {
    type order = {
        dish: string;
        number: number;
    };

  type iValues = {
    mealType: string;
    noOfPeople: number;
    restaurant: string;
    orders: Array<order>;
    submitBtn?: string;
  };

  const { contextValue } = useContext(OrderContext) as OrderContextType;
  const { mealType, noOfPeople, restaurant, orders } = contextValue;
  const isClicked = useRef(false);
  const toast = useToast();

  const initialVal: iValues = {
    mealType: mealType,
    noOfPeople: noOfPeople,
    restaurant: restaurant,
    orders: orders,
  };

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          initialValues={initialVal}
          onSubmit={(values, action) => {
            //console.log(values);
            if(values.submitBtn !== undefined){
                if(values.submitBtn === "Submit"){
                    console.log(values);
                    toast({
                        title: 'Order Submitted',
                        description: "We've successfully received your order.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      });
                }
                if(values.submitBtn === "Previous"){
                    setStep(3);
                }
            }
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td>Meal</Td>
                      <Td>{props.values.mealType}</Td>
                    </Tr>
                    <Tr>
                      <Td>No. of People</Td>
                      <Td>{props.values.noOfPeople}</Td>
                    </Tr>
                    <Tr>
                      <Td>Restaurant</Td>
                      <Td>{props.values.restaurant}</Td>
                    </Tr>
                    <Tr>
                      <Td>Dishes</Td>
                      <Td>
                        <Box>
                            {props.values.orders.map((order, index)=>(
                                <Text key={index}>{order.dish} - {order.number}</Text>
                            ))}
                        </Box>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Box mt={40}>
                <ButtonGroup step={4} props={props} isClicked={isClicked}/>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
