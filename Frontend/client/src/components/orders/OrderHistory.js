import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

    const OrderHistory = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

   return (
        <div>

          <button onClick={handlePrint}>Print this out!</button>

       <button style={{  marginLeft: 1250 ,backgroundColor:"teal",width:200,height:40,color:"white",marginTop:50}}  onClick={handlePrint} >Download Report</button>
     <ComponentToPrint ref={componentRef} />
        </div>
    );
};
export default OrderHistory
