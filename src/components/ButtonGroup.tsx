import React, { MutableRefObject } from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { Button } from "@material-tailwind/react";
import { FormikProps } from "formik";

export default function ButtonGroup({
  step,
  props,
  isClicked,
}: {
  step: number;
  props: FormikProps<any>;
  isClicked: MutableRefObject<boolean>
}) {
  const handler = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    props: FormikProps<any>
  ) => {
    //e.preventDefault();
    let submitter = (e.target as HTMLButtonElement).value;
    //console.log(submitter);
    if(submitter === 'Previous') isClicked.current = true;
    else isClicked.current = false;
    props.setFieldValue('submitBtn', submitter);
  };
  return (
    <>
      <Flex>
        <Box mx={5} display={step > 1 ? "block" : "none"}>
          <Button
            variant="outlined"
            value={"Previous"}
            type={"submit"}
            onClick={(e) => 
              handler(e, props)
            }
          >
            Previous
          </Button>
        </Box>
        <Spacer />
        <Box mx={5}>
          {step < 4 ? (
            <Button
              variant="outlined"
              value={"Next"}
              type={"submit"}
              onClick={(e) => handler(e, props)}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="outlined"
              value={"Submit"}
              type={"submit"}
              onClick={(e) => handler(e, props)}
            >
              Submit
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
}
