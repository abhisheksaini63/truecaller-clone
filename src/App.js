import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const[ validString, setValidString] = useState('');

  const [num, setNum] = useState('+916396356988');
  const [acNum, setAcNum] = useState('+916396356988');
  const [data, setData] = useState({
    phone: '',
    format: {
      international: '',
    },
    country: {
      code: '',
      prefix: '',
    },
    location: '',
    type: '',
    carrier: '',
    valid:''
  });
  const numEvent = (elm) => {
    setNum(elm.target.value);
  }

  const getData = async () => {
    const res = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=26b7b592c6aa484594d31c9341f20440&phone=${num}`);
    const acctualData = await res.json();
    if(acctualData.valid === true){
      setData(acctualData);
      setValidString('');
    }
    else {
      setValidString( "Invalid Number");
      data.valid = false;
    }
    
    console.log(acctualData);
  }
  useEffect(() => {
    getData();

  }, []);

  const searchNum = () => {
    // setAcNum(num);
    getData();
    setNum('');   
  }
  return (
    <>
      <div className="mycontainer">
        <div className="input-group">
          <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)"
            placeholder="Type A Number"
            value={num}
            onChange={numEvent}
          />
          <button className="btn btn-primary" type="submit" onClick={searchNum}>Search</button>
        </div>
        <br />
        <p>{validString}</p>
        <br/>
        <div className="card-body" style={{ Width: "500px" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span> phone:</span>  {data.phone}</li>
            <li className="list-group-item"><span>Formate: </span>  {data.format.international}</li>
            <li className="list-group-item"><span>Country Code: </span> {data.country.code}</li>
            <li className="list-group-item"><span>Country Name: </span> {data.location}</li>
            <li className="list-group-item"><span>Prefix: </span> {data.country.prefix}</li>
            <li className="list-group-item"><span>Type: </span> {data.type}</li>
            <li className="list-group-item"><span>Carrier: </span> {data.carrier}</li>
          </ul>
        </div>

      </div>

    </>
  );
}

export default App;