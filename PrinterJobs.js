
import React, { useEffect, useState } from 'react';

import PrinterJobsAfterLoginCheck from './PrinterJobsAfterLoginCheck';
import Loading from '../../Loading';
import { useNavigate } from "react-router";

const PrinterJobs = () => {

    const [selectedDIV, setSelectedDIV] = useState(<Loading/>);
    const navigate = useNavigate();   
// alert(window.localStorage.getItem('loggedInUsername'))
    useEffect(() => {     
      if(window.localStorage.getItem('loggedInUsername') != null) {
        setSelectedDIV(<PrinterJobsAfterLoginCheck/>);
      }
      else {
          navigate("/");
      }
    }, []);
   
    return (
       <>
          {selectedDIV}
       </>
  )
}

export default PrinterJobs;