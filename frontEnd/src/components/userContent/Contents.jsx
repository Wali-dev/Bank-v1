import React, { useEffect, useState } from 'react'
import "./Contents.css"
import axios from "axios";
import { Link } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:8000/"


export const Contents = () => {


    //fetching quote for the dash
    const [dailyquote, setDailyquote] = useState([1]);
    useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(res => res.json())
            .then(data => setDailyquote(data))
    }, [])
    const firstQuotes = dailyquote[0]

    //load the user
    const id = "f30f67be-9c0c-4f14-a9b6-22a7e832e367";
    const handleuser = async () => {
        const user = await axios.get('api/user/' + id)
        const { data } = user;
        setParticularUser(data)
    }
    const [particularUser, setParticularUser] = useState([1]);
    
    useEffect(() => {
        handleuser()
    }, [])


    const name = particularUser.name;

    const[loading, setLoading] = useState(false)

    const demo = () => {


    }

    //handeling send money functionality
    const [formData, setFormData] = useState();
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const[getallUser, setGetallUser] = useState([]);

    const handelingTrans=async(id)=>{

        const amount = {
            lastTransaction: formData.amount
        }

        const creditID = particularUser.id;

        const deducedAmount = {
            lastTransaction: -(formData.amount)
        }

        const data0 = await axios.put('api/user/'+ id, amount)
        const data1 = await axios.put('api/user/'+ creditID, deducedAmount)


        console.log(data0, data1)
        
    }

    const filteringUser=async()=>{
        const user =await axios.get("api/user")
        setGetallUser(user.data)
        const target = getallUser.filter(user=>user.email===formData.email)
        const id = target[0].id;
        handelingTrans(id)


        

    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        filteringUser()


        setTimeout(()=>{
            setLoading(false)
            location.reload()

        }, 4000)

    }
    return (
        <div className="container">
            <div className="heading">Welcome {name}</div>
            <div className="container-body">
                <div className="card-container-top">
                    <div className="cardSection addUser-btn"><Link className="link" to="/atm">Go to ATM</Link></div>

                    <div className="cardSection water">Drink Water</div>
                    <div className="cardSection">Time and date</div>
                </div>
                <div className="card-container-bottom">
                    <div className="cardSection bottom-one sub">
                        <div className="up">
                            <div className="mainBal">Bal:{particularUser.currentBalance}</div>
                            <div className="trans">Trans:{particularUser.lastTransaction}</div>
                        </div>
                        <div className="down"><div className="down-deep">
                            Quotes for you:
                            <p>{firstQuotes.text}</p>
                            <p>-{firstQuotes.author}</p>
                        </div></div>
                    </div>
                    <div className="cardSection bottom-two">
                        <div className='account-details'>
                            <div className="large-text">Account Details</div>
                            <div className="userid">UserID:{particularUser.userID}</div>
                            <div className="name">Name:{particularUser.name}</div>
                            <div className="Email">Email:{particularUser.email}</div>
                        </div>
                        <div className="sendMoney">
                            <form className='sendform' onSubmit={handleSubmit}>
                                Send money to
                                <label htmlFor='name'>Name:</label>
                                <input type='text' name='name' id='name' onChange={handleChange} />
                                <label htmlFor='email'>Email:</label>
                                <input type='email' name='email' id='email' onChange={handleChange} />
                                <label htmlFor='amount'>Amount:</label>
                                <input type='number' name='amount' id='amount' onChange={handleChange} />
                                <button className='btn'>Submit</button>
                            </form>
                            {
                                loading && (
                                    <div className="loading">
                                LOADING
                                <div className="loader"></div>
                            </div>
                                )
                            }
                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}


// 