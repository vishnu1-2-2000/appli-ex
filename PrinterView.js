import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
// import Select from "react-select";
import * as  AiIcons from "react-icons/ai";
import Navebar from "../../Navigation/Navebar";
import Loading from "../../Loading";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { VscDebugStart } from "react-icons/vsc";
import { FaRegCirclePause } from "react-icons/fa6";
import { IoIosReturnLeft } from "react-icons/io";
import { FaCircleStop } from "react-icons/fa6";
import { TbLoader2 } from "react-icons/tb";
import { MdOutlineQrCodeScanner } from "react-icons/md";

    function PrinterView() {
        const[id,setId]=useState("");
        const[processordernumber,setProcessOrderNumber]=useState("");
        const[gtin,setGtin] =useState("");
        const[expiration_date,setExp] =useState("");
        const[lot,setLot]=useState("");
        const[numbers,setNumbers]=useState("");
        const[po,setpo]=useState("");
        const[type,setType]=useState("");
        const[hrf,setHrf]=useState("");
        const[hrfvalue,setHrfvalue]=useState("");
       
        const[hrfjson,setHrfjson]=useState("");           
        const[polabel,setPolabel]=useState("");
        const[povalue,setPovalue]=useState("");

        const[printstop,setStop]=useState();
        const[printbt,setPrintbt]=useState(<Loading/>);
        const[quantity,setQuantity]=useState("")
        const[testdata,setTestdata]=useState(0)
        const[printhead,setPrinthead] =useState("Process Start") 
        
        const[processbtnstate,setProcessbtnstate]=useState(false)
                
        const[processstopbtnstate,setProcessbtnstopstate]=useState(true)
        const[preparebtnstate,setPreparebtnstate]=useState(true)
        const[pausebtnstate,setPausebtnstate]=useState(true)
        const[printbtnstate,setPrintbtnstate]=useState(true) 
        const[closebtnstate,setClosebtnstate]=useState(true) 
        const[checkboxvalue,setCheckbox] =useState(false)                            
        const { operation } = useParams();
        const { uniqueID } = useParams();
        const[checkheading,setCheckheading]=useState("Do you Want to start Batch")
        const[checkstate,setCheckstate]=useState(false) 
        const [warningmessage,setWarningDIVstate]=useState(warningDIV);
        const[responsefielddata,setResponsefielddata]=useState("")
        const [open, setOpen] = React.useState(false);
        const [loadalert, setLoadalert] = React.useState(false);
        const [preparealert, setPreparealert] = React.useState(false);
        const [stopalert, setStopalert] = React.useState(false);
        const [insufficientalert, setInsufficientalert] = React.useState(false);
        const[numberfinishalert,setNumberfinishalert]=React.useState(false);


        const [showDelayedText, setShowDelayedText] = useState(false)
        const[countdata,setCountdata]=useState("")
        var loggedInUsername=window.localStorage.getItem('loggedInUsername')

        var loggedInUserrole=window.localStorage.getItem('loggedInUserrole')
        const navigate=useNavigate();
        let gtinoptions=[]
        let pooptions=[]
        var warningDIV= <div className="alert alert-success pt-4" role="alert">
        <h5>Input all the values</h5>
      </div>

        function getposelectedData(gtinparams){
            axios
            .get("http://127.0.0.1:8000/masterapp/productionorder/")
            .then((res)=>{
                res.data.map(data =>{
                    if(data.id==gtinparams){
                        setPolabel(data.process_order_number );
                        setPovalue(data.id);
                    }        
                })         
            })
        }

        function getPrinterData(){
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                var ser=JSON.parse(res.data[0].numbers) 
                let c=0;
                for (let i = 0; i < ser.length; i++) {
                    c=c+1
                }
                // alert(c)

                // alert(ser) // alert(res.data[0].numbers)
                setHrfjson(res.data[0].hrf)
                var tablejsonvalue = JSON.parse(res.data[0].hrf);
                setProcessOrderNumber(res.data[0].processordernumber)
                getposelectedData(res.data[0].processordernumber)
                setGtin(res.data[0].gtin);
                setExp(res.data[0]. expiration_date);
                setLot(res.data[0].lot);
                setType(res.data[0].type)
                setHrf(tablejsonvalue.hrf1);
                setHrfvalue(tablejsonvalue.hrf1value);
                setNumbers(ser)
              

                            
            })
        }
        const getpolabeloption=event =>{

        }

        function getResponseData(){
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
            //  alert(res.data[0].responsefield) 
            //  alert(res.data[0].preparebuttonresponse)
                if(res.data[0].responsefield==true)
                {
                    setProcessbtnstate(true)
                    setPreparebtnstate(false)
                    // setPrintbtnstate(false);
                    setProcessbtnstopstate(false);
                    // setClosebtnstate(false)

                }
                else{
                    setProcessbtnstate(false)
                    setPreparebtnstate(true)
                    // setPrintbtnstate(true);
                    setProcessbtnstopstate(true);
                    // setClosebtnstate(true)
                    // setPausebtnstate(true)
                }

                            
            })
        }

        function getPrepareResponseData(){
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                // alert(res.data[0].preparebuttonresponse)
                if(res.data[0].preparebuttonresponse==true)
                {
                    setPrintbtnstate(false)
                    setPreparebtnstate(true)
                    // setClosebtnstate(false)

                }
                else{
                    setPrintbtnstate(true)
                    // setPreparebtnstate(false)
                }

                            
            })
        }
        function getStopResponseData() {
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                // alert(res.data[0].pause_stop_btnresponse)
                if(res.data[0].stopbtnresponse==true )
                {
                    setClosebtnstate(false)
                    setProcessbtnstopstate(true)
                    setPrintbtnstate(true)
                    
                    // setClosebtnstate(false)

                }
                
                else{
                    setClosebtnstate(true)
                    // setProcessbtnstopstate(false)
                    // setPrintbtnstate(false)
                    // setPreparebtnstate(false)
                }
                if(res.data[0].pause_stop_btnresponse==true )
                {
                    setPausebtnstate(true)
                    
                    // setClosebtnstate(false)

                }
                            
            })
        }


        function getPrintResponseData() {
             axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                // alert(res.data[0].preparebuttonresponse)
                if(res.data[0].pause_stop_btnresponse==true)
                {
                    setPausebtnstate(false)
                    setPrintbtnstate(true)
                    // setClosebtnstate(false)

                }
                else{
                    setPausebtnstate(true)
                    // setPrintbtnstate(false)
                    // setProcessbtnstopstate(false)
                    // setPrintbtnstate(false)
                    // setPreparebtnstate(false)
                }

                            
            })
        }


        function getPauseResponseData() {
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                // alert(res.data[0].preparebuttonresponse)
                if(res.data[0].pause_stop_btnresponse==false)
                {
                    setPausebtnstate(true)
                    //setPrintbtnstate(false)
                    // setClosebtnstate(false)

                }
                else{
                    setPausebtnstate(false)
                    //setPrintbtnstate(false)
                    // setProcessbtnstopstate(false)
                    // setPrintbtnstate(false)
                    // setPreparebtnstate(false)
                }

                            
            })
        }


        function  getreturnslnoResponseData() {
            axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
            .then((res)=>{
                // alert(res.data[0].return_slno_btn_response)
                if(res.data[0].return_slno_btn_response==true)
                {
                    setClosebtnstate(true)
                    //setPrintbtnstate(false)
                    // setClosebtnstate(false)

                }
                // else{
                //    // setClosebtnstate(false)
                //     //setPrintbtnstate(false)
                //     // setProcessbtnstopstate(false)
                //     // setPrintbtnstate(false)
                //     // setPreparebtnstate(false)
                // }

                            
            })
        }
       
function Countdata(){
    axios.get("http://127.0.0.1:8000/masterapp/countdata/")
            .then((res)=>{
               setCountdata(res.data)
            })
}

function getSerialCount(){
   
    
    axios.get("http://127.0.0.1:8000/masterapp/printer/"+uniqueID+"/")
    .then((res)=>{
        var ser=JSON.parse(res.data[0].numbers) 
       
        // const interval = setInterval(() => {
            setCountdata(ser.length)
            if(ser.length<=100){
                // alert(" Insufficient Serialnumbers Download More Serialnumbers")
                setNumberfinishalert(true);
            }
            else if(ser.length<=998){
                // alert("Serialnumbers becomes low Please Pause The Printer and Download More Numbers")
                setInsufficientalert(true);
            }

            
        //     window.location.reload(false);  
        //   }, 8000);
      
        //   return () => {
        //     clearInterval(interval);
        //   };
    // window.location.reload(false);    
    // setCountdata(ser.length)
                    
    })
}
// const countingdata=(e)=>{
    
//             const interval = setInterval(() => {
//                 setCountdata(countdata + 1);
//            }, 3000);
//         //         return () => {
//         //           clearInterval(interval);
//         // };
//      }
   

 
    useEffect(() => {
        if(operation == 'edit') {
                getPrinterData();
                getResponseData()
             
                getPrepareResponseData() 
                getStopResponseData() 
                getPrintResponseData()
                getPauseResponseData()
                getreturnslnoResponseData()
                

            }
            const interval = setInterval(() => {
               
                window.location.reload(false);  
              }, 10000);
          
              return () => {
                clearInterval(interval);
              };
             
         //   getPrepareResponseData() 
        //  Countdata()
        
            
                 
        }, []); 
        
        // useInterval(() => {
        //     setStop(printstop + 1);
        //   }, 1000);
        // useEffect(() => {
        //     const interval = setInterval(() => {
        //      setCountdata(countdata + 1);
        //     }, 700);
        
        //     return () => {
        //       clearInterval(interval);
        //     };
        //   });         
        var powidget=<input
                        type="text"
                        className="form-control"
                        value={polabel}
                        readOnly={true}
                        onChange={(e) => setProcessOrderNumber(e.target.value)}
                    />
        var expwidget=  <input
                            type="text"
                            className="form-control"
                            value={expiration_date}
                            readOnly={true}
                            onChange={(e) => setExp(e.target.value)}
                        />
        var lotwidget=  <input
                            type="text"
                            className="form-control"
                            value={lot}
                            readOnly={true}
                            onChange={(e) => setLot(e.target.value)}
                        />
        var typewidget = <input 
                            type="text"
                            className="form-control"
                            value={type}
                            readOnly={true}
                            onChange={(e) => setType(e.target.value)}
                        />

//var gtinwidget=<Select className="s" options={gtin} onChange={gtindata}/>
        var gtinwidget=  <input
                            type="text"
                            className="form-control"
                            value={gtin}
                            readOnly={true}
                            onChange={(e) => setGtin(e.target.value)}
        
                        />
        var serialnowidget = <input 
                                type="text"
                                className="form-control"
                                value={numbers}
                                onChange={(e) => setNumbers(e.target.value)}
                            />        
        var hrfwidget = <input 
                            type="text"
                            className="form-control"
                            value={hrf}
                            readOnly={true}
                            onChange={(e) => setHrf(e.target.value)}
                        />  
                    
        var hrfvaluewidget = <input 
                                type="text"
                                className="form-control"
                                value={hrfvalue}
                                readOnly={true}
                                onChange={(e) => setHrfvalue(e.target.value)}
                            /> 

        var quantitywidget = <input 
                            type="text"
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        /> 

        var countwidget = <input 
                        type="text"
                        className="form-control"
                        value={countdata}
                        onChange={(e) => setCountdata(e.target.value)}
                    />                
                       
                                    
        //                 const handleOk=(e)=>{
        //                     setProcessbtnstate(false)
        //                     setCheckheading("Do You Want To Close The Batch")
        //                     setCheckstate(true)
        //                     // axios
        //                     // .put(`http://127.0.0.1:8000/masterapp/checkbox/update/${uniqueID}/`, 
                            
        //                     // {
                                
        //                     //     "responsefield":checkboxvalue,
        //                     //     "gtin":gtin,  
        //                     // })
                            
        //                     // .then((res2) => {
        //                     //     // alert("2255")
        //                     //     alert(res2.data.gtin)
        //                     //     axios
        //                     //     .get("http://127.0.0.1:8000/masterapp/checkboxindividual/"+res2.data.gtin+"/",
                               
        //                     //     )
        //                     //     .then((res5)=>{
        //                     //         // alert(res5.data[0].responsefield)
        //                     //         if(res5.data[0].responsefield==true)
        //                     //         {
        //                     //                     alert("haiii")
        //                     //                     setCheckheading("Do You Want To Close The Batch")
        //                     //                     // setProcessbtnstate(false)
        //                     //                  }
        //                     //         else{
        //                     //             setCheckheading("Do You Want To Start The Batch")
        //                     //             // setProcessbtnstate(true)
        //                     //         }
        //                     //     })

                            
        //                     // })  
                           
                        

        //                 }
        // const handleChange=(event)=>{
        // //                     alert(event.target.checked)
                           

        //                     setCheckbox(event.target.checked);
                           
        //                 //    if(event.target.checked==true)
        //                 //    {
        //                 //     setProcessbtnstate(false)
                           

        //                 //    }
        //                 //    else{
        //                 //     setProcessbtnstate(true)
        //                 //    }
                        
        //                     }                            
                            
                        
        const handlePrepare=(e)=>{
            setPreparealert(true);
            setPreparebtnstate(true)
            setPrintbtnstate(false)
          
            e.preventDefault(); 
            axios
            .post("http://127.0.0.1:8000/masterapp/printerprepare/",
            
            {
                "id":uniqueID,
                "gtin":gtin,
                "preparebuttonresponse":true, 
             
            })
            
            .then((res2) => {

             
            //  alert(res2.data.preparebuttonresponse)
            //     if(res2.data.preparebuttonresponse==true)
            //     {
            //        setPrintbtnstate(false)
                   
            //     }
            //     else{
                  
            //         setPrintbtnstate(true)
            //     }
                
            })

        }
                          
        const handleStop=(e)=>{
                                window.location.reload(false)
                                setPrintbtnstate(false)
                                setPausebtnstate(true)
                             
                                e.preventDefault(); 
                        
                                    axios
                                    .post("http://127.0.0.1:8000/masterapp/printerstop/",
                                    
                                    {   "id":uniqueID,
                                        "breakloop":0, 
                                        "type":type, 
                                        "start_pause_btnresponse":false,
                                        "pause_stop_btnresponse":false,
                                        "gtin":gtin,
                                    })
                                    
                                    .then((res2) => {
                                    //  alert(res2.data)
                                    //     if(res2.data===200)
                                    //     {
                                        // window.location.reload(false)
                                        
                                    //        setStop("stoped")
                                    //     }
                                    //     else{
                                    //         setStop("")
                                        
                                    //     }
                                        
                                    })
                            

                            }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
                    if (reason === 'clickaway') {
                                  return;
                        }
                        setLoadalert(false);
                        setOpen(false);
                        setPreparealert(false);
                        setStopalert(false);
                        setInsufficientalert(false);
                        setNumberfinishalert(false);
        };

        const handleStart=(e)=>{
    //         <Alert severity="error">
    //     <AlertTitle>Error</AlertTitle>
    //     This is an error alert — <strong>check it out!</strong>
    //   </Alert> 
                                setOpen(true);
                                e.preventDefault(); 
                                setPausebtnstate(false)
                                setPrintbtnstate(true)
                                
                                axios
                                .post("http://127.0.0.1:8000/masterapp/printerstart/",
                                
                                {
                                    "id":uniqueID,
                                    "lot":lot,
                                    "gtin":gtin,
                                    "expiration_date" :expiration_date,
                                    "numbers":numbers ,
                                    "tetdata":testdata,
                                    "printstop":5,
                                    "type":type,
                                    "hrf":hrfjson,
                                    "breakloop":6,
                                    "preparebuttonresponse":true,
                                    "start_pause_btnresponse":true,
                                    "pause_stop_btnresponse":true,
                                    "loggedInUsername":loggedInUsername,

                                    "loggedInUserrole":loggedInUserrole

                                  

                                })
                                
                                .then((res2) => {
                                //  alert(res2.data)

                                    if(res2.data===200)
                                    {
                                
                                        
                                       
                                    }
                                    else{
                                        setPrintbt(<Loading/>)
                                      
                                    }
                                    
                                })

                            }

        const handleEnd=(e)=>{
                              
           
                                setClosebtnstate(true)
                                // window.location.reload(true)
                                e.preventDefault(); 
                                axios
                                .post("http://127.0.0.1:8000/masterapp/loopstop/",
                                
                                {
                                    "id":uniqueID,
                                    
                                    "gtin":gtin,
                                   
                                    "numbers":numbers ,
                                    "return_slno_btn_response":true,
                                    "loggedInUsername":loggedInUsername,

                                    "loggedInUserrole":loggedInUserrole

                                })
                                
                                .then((res2) => {
                                //  alert(res2.data)
                                //     if(res2.data===200)
                                //     {
                                       
                                //        setStop("stoped")
                                //     }
                                //     else{
                                //         setStop("")
                                      
                                //     }
                                    
                                })

                              
                          

                            }                       

        const handleSubmit=(e)=>{
            setTimeout((disabled = false) => {
                setShowDelayedText(true);
            }, 5000);
            var testPassed = "false";
            console.log("clicked");
        setProcessbtnstate(true);
        setPreparebtnstate(false);
        setProcessbtnstopstate(false);
        e.preventDefault();
        
       
        setTestdata(testdata+1)
        if(testdata==0){
            setPrinthead("Process Stop")
        // setProcessbtnstate(true)

        }
        else{
            setPrinthead("Process Stop") 
    //    setClosebtnstate(false)
    //    setPrintbtnstate(true);
    //    setPausebtnstate(true)
        }

        axios
        .get("http://127.0.0.1:8000/masterapp/printer/")
     
        // setStop(printstop + 1);
        // if(printstop==0)
        // {
        //     //setStop(0)
        //     setPrinthead("Pause")
        // }
        // else if(printstop==1)
        // {
        //    // setStop(1)
        //     setPrinthead("Print")
        // }
        //alert(po)
        if(quantity != "") {
            testPassed = "true";
            setLoadalert(true);
          }
          else {
            warningDIV =  <div className="alert alert-danger pt-4" role="alert">
            <h5>Input Quantity</h5>
            </div>
                          
            setWarningDIVstate(warningDIV);
            testPassed = "false";
                              
            }

   if(testPassed == "true") {
        if(operation === 'edit') {
                // alert(printstop)
            axios
            .post("http://127.0.0.1:8000/masterapp/clientcommunication/",
            
            {
                //"processordernumber":po,
                "id":uniqueID,
                "lot":lot,
                "gtin":gtin,
                "expiration_date" :expiration_date,
                "numbers":numbers ,
                "tetdata":testdata,
                "printstop":quantity,
                "type":type,
                "hrf":hrfjson,
                "responsefield":true,
                "preparebuttonresponse":false,
                "stopbtnresponse":false,
                "start_pause_btnresponse":false,
                "pause_stop_btnresponse":false,
                "breakloop":6,
                "return_slno_btn_response":false
                //"type" :type 
            })
           

            
            .then((res2) => {
                alert(res2.data)


                if(res2.data ===200){   
                    // setProcessbtnstate(true); 
                    axios
                    .post(`http://127.0.0.1:8000/masterapp/printer/`,
                    {
                        "gtin":gtin,
                    })
                    .then((res)=>{
                //alert("haii")
                    })
           
            //   else{
            //     alert("not")
            //   }
                
            //         navigate("/productionorder");
                 
            //     });
                }
            })

           
        } 
    }
       
    }  


    const ProcessStopBtn=(e)=>{
            // window.location.reload(false)
            setPrintbtnstate(true);
           
            var testPassed = "false";
            console.log("clicked");
            // setPausebtnstate(true);
            e.preventDefault();
            setProcessbtnstopstate(true);
            setClosebtnstate(false)
            setPausebtnstate(true)
            setTestdata(testdata+1)
            if(testdata==0){
                setPrinthead("Process Stop")
            // setProcessbtnstate(true)

            }
            else{
                setPrinthead("Process Stop") 
            // setProcessbtnstopstate(false);
        
        //    setPausebtnstate(true)
            }
        
         

            if(quantity != "") {
                testPassed = "true";
                setStopalert(true)
                window.location.reload(false)
            }
            else {
                warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                <h5>Input Quantity</h5>
                </div>
                            
                setWarningDIVstate(warningDIV);
                testPassed = "false";
                                
            }
            if(testPassed == "true") {                
                    const confirmBox = window.confirm(
                    "Do you really want to stop this batch?"
                    )
                    if (confirmBox === true) {
                            // alert(printstop)
                        axios
                        .post("http://127.0.0.1:8000/masterapp/clientcommunication/",
                            
                        {
                                //"processordernumber":po,
                                "id":uniqueID,
                                "lot":lot,
                                "gtin":gtin,
                                "expiration_date" :expiration_date,
                                "numbers":numbers ,
                                "tetdata":testdata,
                                "printstop":quantity,
                                "type":type,
                                "hrf":hrfjson,
                                "preparebuttonresponse":false,
                                "responsefield":true,
                                "stopbtnresponse":true,
                                "start_pause_btnresponse":true,
                                "pause_stop_btnresponse":false,
                                "return_slno_btn_response":false,
                                "breakloop":6,
                                //"type" :type 
                        })
                        

                            
                        .then((res2) => {
                                // alert(res2.data)
                                window.location.reload(false)
                                if(res2.data ===200){   
                                    // setProcessbtnstate(true); 
                                    axios
                                    .post(`http://127.0.0.1:8000/masterapp/printer/`,
                                    {
                                        "gtin":gtin,
                                    })
                                    .then((res)=>{
                              
                                    })
                        
                       
                                }
                        })
                      

                    } 
                } 
    }  
        

    return (
        <div id="printerfullpage">
            <Navebar/>
            <br></br>
            <br></br>
            <h3 style={{marginLeft:"130px"}}>SerialNumber Count - {countdata}</h3>
            <div className="container" id="printerviewpage" >
            <br></br>
            <div className="row">
                <div className="col-2">

            </div>
                                            
            <div className="col-8">
                <button id="loadbtn"
                                                        // type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={processbtnstate} 
                   
                >
                    
                    <TbLoader2 size={23} /> Load Batch

                </button> 
                <Snackbar open={loadalert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' ,height:'60px',marginLeft:'460px',marginBottom:'610px'}}>
                       Successfully Loaded The Batch .Please Click on the Prepare Printer & Scanner Button For Preparing!
                   </Alert>
                 </Snackbar>
                 &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                                      
            <button id="preparebtn"
                                                    // type="submit"
                className="btn btn-info"
                onClick={handlePrepare} 
                disabled={preparebtnstate}>
                    <MdOutlineQrCodeScanner size={23}/>
                Prepare Printer&Scanner
            </button>                                 
            <Snackbar open={preparealert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                       Check The Status Of Printer.If It Is WAIT Please Click On The Start Printing Button 
                       For Further Processing
                       
                   </Alert>
                 </Snackbar>                   
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         
            <button id="stopbtn"  
                className="btn btn-danger"
                onClick={ProcessStopBtn}
                disabled={processstopbtnstate} 
            >
             <FaCircleStop  size={23}/>   Stop Batch

            </button> 
            <Snackbar open={stopalert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                       This Batch Succesfully Stoped.Now You Please Return The Balance Serialnumbers
                   </Alert>
                 </Snackbar> &nbsp;
                           
        </div>
            <div className="col-2">
                                                
                </div>
                                       
                    </div>
                      
                <div className="row">
                    <br></br>
                    <br></br>
                   
                    {warningmessage} 
                         
                    <br></br>
                    <br></br>  
                    <div className="col-2"></div>
                    <div className="col-8">
                            <table>
                                <br></br>
                                <tbody> 
                                    <tr>
                                        <td class="productionOrderReportSearchTD">Gtin</td>
                                        <td class="productionOrderReportSearchTD">
                                            {gtinwidget}
                                        </td>
                                        &nbsp;&nbsp;&nbsp;

                                        <td class="productionOrderReportSearchTD">Productionnumber</td>
                                        <td class="productionOrderReportSearchTD">
                                                                           
                                            {powidget}
                                        </td>
                                  
                                    </tr>
                                    <br></br>
                              
                                    <br></br>
                                    <tr>
                                        <td class="productionOrderReportSearchTD">Expiry Date</td>
                                        <td class="productionOrderReportSearchTD">
                                            {expwidget}
                                        </td>
                                        &nbsp;&nbsp;&nbsp;
                                        <td class="productionOrderReportSearchTD">Lot</td>
                                        <td class="productionOrderReportSearchTD">
                                            {lotwidget}
                                        </td>
                                    </tr>
                                    <br></br>
                                
                                    <br></br>
                                    <tr>
                                        <td class="productionOrderReportSearchTD">Printing Type</td>
                                        <td class="productionOrderReportSearchTD">
                                            {typewidget}
                                        </td>
                                        &nbsp;&nbsp;&nbsp;
                                        <td class="productionOrderReportSearchTD">SerialNumbers</td>
                                        <td class="productionOrderReportSearchTD">
                                            {serialnowidget}
                                        </td>
                                    </tr>
                                    <br></br>
                              
                                    <br></br>
                                    <tr>
                                        <td class="productionOrderReportSearchTD">HRF</td>
                                        <td class="productionOrderReportSearchTD">
                                                {hrfwidget}
                                        </td>
                                        &nbsp;&nbsp;&nbsp;
                                        <td class="productionOrderReportSearchTD">HRFValue</td>
                                        <td class="productionOrderReportSearchTD">
                                                {hrfvaluewidget}
                                        </td>
                                    </tr>
                                    <br></br>
                                    <br></br>
                           
                                    <tr>
                                        <td class="productionOrderReportSearchTD">Quantity you want to Stop</td>
                                        <td class="productionOrderReportSearchTD">
                                            {quantitywidget}
                                        </td>
                                        <td class="productionOrderReportSearchTD">
                                            {/* {countwidget} */}
                                            {/* <button onLoad= {  getSerialCount()}>count</button>  */}
                                            {/* <button onClick= {   getSerialCount()}>count</button>  */}
                                        </td>
                                    </tr>                        
                                    <br></br>                                   
                                </tbody>
                            </table> 
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">

                        </div>
                    <div className="col-8">
                        <button id="startprintbtn"
                                                // type="submit"
                            className="btn btn-success"
                            onClick={handleStart}
                            disabled={printbtnstate}
                            onLoad= {getSerialCount()}
                             >
                                <VscDebugStart size={23} /> Start Printing 
                                </button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                       Printing Started
                   </Alert>
                 </Snackbar>

                 <Snackbar open={insufficientalert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' ,height:'60px',marginLeft:'460px',marginBottom:'610px'}}>
                    Serialnumbers Becomes low Please Pause The Printer and Download More Numbers
                   </Alert>
                 </Snackbar>

                 <Snackbar open={numberfinishalert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' ,height:'60px',marginLeft:'460px',marginBottom:'610px'}}>
                    Insufficient Serialnumbers If You Are Continueing This Batch Please Download More Serialnumbers
                   </Alert>
                 </Snackbar>

                                             &nbsp;  
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button id="pausebtn"
                                                // type="submit"
                                            className="btn btn-info"
                                            onClick={handleStop} 
                                            disabled={pausebtnstate}>
                                             <FaRegCirclePause size={23}/>   Pause Printing
                                        </button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;
                                         
                                        <button id="returnbtn"
                                                // type="submit"
                                            className="btn btn-danger"
                                            
                                            onClick={handleEnd} 
                                            
                                            disabled={closebtnstate} >
                                          <IoIosReturnLeft size={23} />  Return Serial Numbers
                                        </button>  &nbsp;
                           
                                    
                                            </div>
                                            <br></br>
                                            <div className="col-2">
                                                
                                            </div>
                                       
                                        </div> 
                </div>   
        </div>
    )
}

export default PrinterView
