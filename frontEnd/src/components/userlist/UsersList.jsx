import React from 'react'
import './userlist.css'

export const UsersList = (props) => {

    // console.log(props)
    const handleUser = props.handleUser;
    const {name, ocupation, age} = props.props;

  return (
    <div className='user-container'>
        <div className='name' onClick={()=>handleUser(props.props)}>{name}-<span className='ocupation'>{ocupation}</span> <span className="age">- {age}</span></div>
    </div>
  )
}
