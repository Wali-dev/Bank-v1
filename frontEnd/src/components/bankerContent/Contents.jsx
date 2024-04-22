import React, { useEffect, useState } from 'react'
import "./Contents.css"
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

import { UsersList } from '../userlist/UsersList';
const name = 'Kashem'


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





    //fetching userlist for the dash
    const getuserlist = async () => {
        const users = await axios.get('api/user')
        const { data } = users;
        setUsers(data)
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getuserlist();
    }, [])

    

    // setting total user for the dash
    const totalUser = users.length;


    //select User to display on the dash
    const [selectedUser, SetseletedUser] = useState([null])
    const handleUser = async (props) => {

        // const id = props.id;

        // const thatUser = await axios.get('api/user/' + id)
        // const data = thatUser.data;
        SetseletedUser(props)
        // console.log(data)

        setLastTrans(props.lastTransaction)
        setCurrentBal(props.currentBalance)
        setUserEmail(props.email)

    }

    //setting users current balance and last Transaction for showing in the dash
    const [currentBal, setCurrentBal] = useState(0);
    const [lastTrans, setLastTrans] = useState(0);
    const [userEmail, setUserEmail] = useState();


    //handle amount submit
    const [transaction, setTransaction] = useState()


    const handleAmount = async (e) => {
        e.preventDefault();

        const amount = e.target.amount.value;



        //you have to set the value in object or else back end will give "cast ot number faield for value NAN"
        const foo = await {
            lastTransaction: amount

        };

        await setTransaction(foo)
        console.log(transaction)
        const id = selectedUser.id;
        const data = await axios.put('api/user/' + id, transaction)



    }

    //delete one user
    const handleDelete = async () => {
        const id = selectedUser.id;
        const message = await axios.delete("/api/user/" + id)
        alert(message)
        getuserlist();
    }

    //add new users logic
    const [addUserbutton, setAddUserbutton] = useState(false)
    const [addUserDisplay, setAddUserDisplay] = useState(true)

    const addNeUserButton = () => {
        setAddUserbutton(true)
        setAddUserDisplay(false)

    }
    const handleClose = () => {
        setAddUserDisplay(true)
        setAddUserbutton(false)
    }

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        userID: "",
        ocu: "",
        currentBalance: "",

    })

    const handleSubmit = async (e) => {
        e.preventDefault(e)
        console.log(formData)
        const data = await axios.post("api/user", formData)
        console.log(data)
        setAddUserbutton(false)
        setAddUserDisplay(true)
        getuserlist();


    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    return (
        <div className="container">
            <div className="heading">Welcome {name}</div>
            <div className="container-body">
                <div className="card-container-top">
                    <div className="cardSection addUser-btn" onClick={addNeUserButton}>Add New User</div>
                    <div className="cardSection total-user">{totalUser} are active now.</div>
                    <div className="cardSection water">Drink Water</div>
                    <div className="cardSection email">Email this user: <a href={'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=' + userEmail} target="_blank">{userEmail}</a>
                    </div>
                </div>
                <div className="card-container-bottom">
                    <div className="cardSection bottom-one sub">
                        <div className="up">
                            <div className="mainBal">Bal:{currentBal}</div>
                            <div className="trans">Trans:{lastTrans}</div>
                        </div>

                        <div className="down">

                            <div className="down-deep">
                                Quotes for you:
                                <p>{firstQuotes.text}</p>
                                <p>-{firstQuotes.author}</p>
                            </div>
                        </div>
                    </div>
                    {
                        addUserbutton && (
                            <div className="cardSection bottom-two">
                                <div className="closeButton" onClick={handleClose}><IoMdClose /></div>
                                <form className='adduserForm' onSubmit={handleSubmit}>


                                    <label htmlFor='name'>Name:</label>
                                    <input type='text' name='name' id='name' onChange={handleChange} />

                                    <label htmlFor='userID'>UserID:</label>
                                    <input type='text' name='userID' id='userID' onChange={handleChange} />

                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' name='email' id='email' onChange={handleChange} />

                                    <label htmlFor='age'>Age:</label>
                                    <input type='number' name='age' id='age' onChange={handleChange} />

                                    <label htmlFor='ocu'>Ocupation:</label>
                                    <input type='text' name='ocu' id='ocu' onChange={handleChange} />

                                    <label htmlFor='currentBalance'>Deposite:</label>
                                    <input type='number' name='currentBalance' id='currentBalance' onChange={handleChange} />

                                    <button className='btn'>Submit</button>


                                </form>


                            </div>
                        )
                    }

                    {
                        addUserDisplay && (
                            <div className="cardSection bottom-two">
                                <div className="searchbox">
                                    <label>Search</label><input />
                                </div>

                                <div className="usersList">

                                    {
                                        users.map((item) => <UsersList props={item} key={item.id}
                                            handleUser={handleUser} />)
                                    }

                                </div>
                            </div>
                        )
                    }

                    <div className="cardSection bottom-three">
                        <div className="displayData">
                            <p className='id'>User ID: {selectedUser.userID} <button className='uni-btn' onClick={handleDelete}>Delete Account</button></p>
                            <p className='name'>User Name: {selectedUser.name}</p>
                            <p className='age'>Age: {selectedUser.age}</p>
                            <p className='job'>Profession: {selectedUser.ocupation}</p>
                            <p className='balance'>Balance: {selectedUser.currentBalance}</p>
                        </div>
                        <form onSubmit={handleAmount}>
                            <p>Enter the credited/debited amount</p>
                            <input className='ip-btn' name='amount' />
                            <button type='submit' className='submit-btn'>ADD/DEDUCT</button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}
