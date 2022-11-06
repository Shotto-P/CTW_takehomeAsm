import React, {
    Suspense,
} from 'react';
import Header from './Header';
import NavigationTab from './NavigationTab';

export default function Form(){
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <NavigationTab />

            </Suspense>
        </>
    );
}