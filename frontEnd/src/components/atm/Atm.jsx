import React, { useEffect, useState } from 'react'
import './atm.css'
import { FaDeleteLeft } from "react-icons/fa6";
import axios from 'axios';
import { Link } from 'react-router-dom';


axios.defaults.baseURL="http://localhost:8000/";

export const Atm = () => {

 


const id = "27293a47-d187-41cf-b607-719e2f4e0967";

const handleuser = async () => {
  const user = await axios.get('api/user/' + id)
  const { data } = user;
  setParticularUser(data)

}
const [particularUser, setParticularUser] = useState(1);


useEffect(() => {
  handleuser()
}, [])

const name=particularUser.name;

const[debitedAmount, setDebitedAmount] = useState()

const handleAmount =(e)=>{
const amount = e.target.value;
const debitedAmount = -(amount);

const foo = {
  lastTransaction: debitedAmount

};
setDebitedAmount(foo)

}

const [loader, setLoader] = useState(false)
const transaction =async()=>{
 const data =await axios.put('api/user/' + id, debitedAmount)
 console.log(data)
  
 setLoader(true)
  setTimeout(()=>{
    setLoader(false)
    location.reload()

}, 2000)
}




  return (
    <div className="atm-container">
        <div className="atm-header">Bank Atm</div>
        <div className="atm-main">
            <div className="display">
                <p>Enter the ammount you wish<br/> to withdraw, INR</p>
                <input className='input' type='number'name ='amount' onChange={handleAmount}></input>
                <div>Username:{name}</div>
                <div className="remainingBal">Available Withdraw: {particularUser.currentBalance}</div>
                {loader && (
                  <div className="loader-p"></div>
                )}
            </div>
            <div className="num-pad">
              <div className="key-container">
                <div className="btn">1</div>
                <div className="btn">2</div>
                <div className="btn">3</div>
                <div className="btn">4</div>
                <div className="btn">5</div>
                <div className="btn">6</div>
                <div className="btn">7</div>
                <div className="btn">8</div>
                <div className="btn">9</div>
                <div className="btn">0</div>
                <div className="btn">.</div>
                <div className="btn"><FaDeleteLeft/></div>
              </div>
            </div>
        </div>
        <div className="atm-footer">
            
            <div className="button" onClick={transaction}>Withdraw</div>
            <Link className="button" to="/user">Exit</Link>
            
            
        </div>
    </div>
  )
}
