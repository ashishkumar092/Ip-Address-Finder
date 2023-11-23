import useEffect, { useState } from 'react';
import classes from './IpAddress.module.css';
import locationMap from './LocationMap';

const IpAddress = () => {
    const [IpAddressDict, setIpAddressDict] = useState({});
    const [httpError, setHttpError] = useState(null);
    useEffect(() => {
        fetch('http://ip-api.com/json')
        .then((res) => {
            if(res.ok){
                setHttpError(null)
                return res.json();
            }
            else{
                throw Error("Failed to fetch Ip Address");
            }
        })
        .then((data) =>{console.log(data);
            setIpAddressDict(data) ;
        })
        .catch((error) => 
        setHttpError("Failed to retrieve Ip Address, Please try again later "));
    },[])
    return (<div>
            {(!httpError) && (
                <>
                    <div className= {'classes.info'}>
                        <p>
                            <span className= {'classes.bold'}>Public Ip Adderss: </span>
                            {IpAddressDict.query}
                        </p>
                        <p>
                            <span className= {'classes.bold'}>Internet Service Provider: </span>
                            {IpAddressDict.isp}
                        </p>
                        <p>
                            <span className= {'classes.bold'}>Location: </span>
                            {IpAddressDict.country}
                        </p>
                    </div>
                    <locationMap lat = {IpAddressDict.lat} lon = {IpAddressDict.lon}/>
                </>
            )}
        <h1>IpAddressDict</h1>
        {httpError && <p>{httpError}</p>}
    </div>)
};

export default IpAddress;