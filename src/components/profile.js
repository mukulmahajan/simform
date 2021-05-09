import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import '../index.css';

const Profile = (params) => {
    const [loginState, setLoginState] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        age: '',
        gender: '',
        skills: ["","","","",""]
    })
    const [userValue, setUserValue] = useState()

    useEffect(() => {
        let userLogedIn = JSON.parse(localStorage.getItem('userDetails'));
        setUserValue(userLogedIn);
        if (userLogedIn == null) {
            history.push("/");
        }
        let userDetailList = ""
        if (userLogedIn) {
            userDetailList = JSON.parse(localStorage.getItem('userDetails' + userLogedIn.name))
            if (userDetailList != null) {
                setUser(userDetailList);
            }
        }
    }, [loginState])
    const handleLogout = () => {
        console.log("logout")
        localStorage.removeItem('userDetails');
        setLoginState(!loginState)
    }
    const handleChange = (e) => {
        setUser(prev => ({
            ...user,
            [e.target.name]: e.target.value
        }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('userDetails' + userValue.name, JSON.stringify(user))

    }
    const dropOver = (e) => {
        e.preventDefault();
    }
    const dragstart = (e) => {
        const target = e.target
        e.dataTransfer.setData("card_id", target.id)
    }
    const drop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card_id = e.dataTransfer.getData('card_id');
        var secondnode = e.target.id
        var firstnode = card_id;
        let firstnodeValue = user.skills[firstnode];
        if (firstnode > secondnode) {
            let list = [];
            list.push(user.skills)
            list[0].splice(firstnode, 1)
            list[0].splice(secondnode, 0, firstnodeValue);
            setUser(prev => ({
                ...user,
                skills: list[0]
            }))
        }
        else {
            let list = [];
            list.push(user.skills)
            list[0].splice(firstnode, 1);
            list[0].splice(secondnode, 0, firstnodeValue);
            setUser(prev => ({
                ...user,
                skills: list[0]
            }))
        }
    }
    const AddSkills = (e) => {
        var skillName = prompt("Enter skill name", "");
        if (skillName === "" || skillName === null) {

        } else {
            let list = user.skills;
            
            list[e]=skillName
            setUser(prev => ({
                ...user,
                skills: list
            }))
        }

    }
    const doNothing=(e)=>{
        e.preventDefault();
    }
    const deleteSkills =(e)=>{
        let list = [];
            list.push(user.skills)
            list[0].splice(e, 1,"");
            setUser(prev => ({
                ...user,
                skills: list[0]
            }))
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={handleLogout} style={{ float: 'left' }}>Logout</button><br>
            </br>
            <form onSubmit={handleSubmit} className="formgroup">
                <label >Enter Name:</label><br></br>
                <input name='name' value={user.name} onChange={(e) => { handleChange(e) }} /><br></br>
                <label >Enter Age:</label><br></br>
                <input name='age' value={user.age} onChange={(e) => { handleChange(e) }} /><br></br>
                <label >Enter Gender:</label><br></br>
                <select name='gender' value={user.gender} onChange={(e) => { handleChange(e) }} >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br></br>
                <label>Skills:</label>
                <div className='listgroup'>

                    {user.skills.map((value, index) => {
                        return <div                        
                            id={index}
                            key={index}
                            draggable={value.length>0?"true":"false"}
                            onDragStart={value.length>0?dragstart:doNothing}
                            onDrop={value.length>0?drop:doNothing}
                            onDragOver={value.length>0?dropOver:doNothing}                            
                        >
                            {value.length>0?<span 
                            id={index}
                            draggable={value.length>0?"true":"false"}
                            onDragStart={value.length>0?dragstart:doNothing}
                            onDrop={value.length>0?drop:doNothing}
                            onDragOver={value.length>0?dropOver:doNothing}
                            >{value}</span>:<span onClick={(e)=>AddSkills(index)}>"Addskill"</span>}
                            <span onClick={(e)=>deleteSkills(index)} className="deleteButton">X</span></div>
                    })}


                </div>

                <br></br>
                <button type='submit'>save</button>

            </form>
        </div>
    )
}
export default Profile;