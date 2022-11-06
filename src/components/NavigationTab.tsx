import React, { useEffect, useState, useContext, createContext } from "react";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import * as s from "./steps";
import OrderProvider from "../hooks/OrderProvider";

export default function NavigationTab() {
  const [step, setStep] = useState<number>(1);

  const tabs = [
    { label: "Step1", value: 1 },
    { label: "Step2", value: 2 },
    { label: "Step3", value: 3 },
    { label: "Review", value: 4 },
  ];

  return (
    <>
      <OrderProvider>
        <Tabs isFitted variant={"enclosed"} index={step - 1}>
          <TabList mb={10}>
            {tabs.map(({ label, value }, index) => (
              <Tab key={index} value={value}>
                {label}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map(({ value }, index) => (
              <TabPanel key={index}>
                {value == 1 && <s.Step1 setStep={setStep} />}
                {value == 2 && <s.Step2 setStep={setStep} />}
                {value == 3 && <s.Step3 setStep={setStep} />}
                {value == 4 && <s.Review setStep={setStep} />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </OrderProvider>
    </>
  );
}
