import React, { FC, useEffect } from "react";


const PayTransition: FC<{}> = () => {

    useEffect(() => {
        window.open("about:blank", "_self");
        window.close();
    }, [])
    return <div></div>

};

export default PayTransition;
