import Alert from "../alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addMember, updateMember } from "../reducers/members-reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


const InputForm = ({member}) => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const [firstname, setFirstname] = useState(member.firstname);
    const [lastname, setLastname] = useState(member.lastname);
    const [email, setEmail] = useState(member.email);
    const [phone, setPhone] = useState(member.phone);
    const [admin, setAdmin] = useState(member.admin);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


   
    const { id } = useParams();
    const id_as_int = parseInt(id);
    const membersArray = useSelector(state => state.members);
    const thisMember = membersArray.find(m => m._id === id_as_int);
    // console.log(thisMember);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setShowAlert(false), 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [showAlert])

    const addClickHandler = () => {
        const sameEmail = membersArray.find(m => m.email === email);
        const samePhone = membersArray.find(m => m.phone === phone);
        const validEmail = emailRegex.exec(email);
        
        if (!firstname || !lastname || !phone || !email) {
            // alert('ALL FIELDS REQUIRED')
            setAlertMessage('All fields are required.')
            setShowAlert(true);
        } else if (sameEmail && id_as_int !== sameEmail._id) {
            setAlertMessage(`User with email "${email}" already exists.`)
            setShowAlert(true);
        } else if (samePhone && id_as_int !== samePhone._id) {
            setAlertMessage(`User with phone "${phone}" already exists.`)
            setShowAlert(true);
        } else if (!validEmail) {
            setAlertMessage(`Please enter a valid email.`)
            setShowAlert(true);
        } else if (isNaN(phone) || phone.length !== 10) {
            setAlertMessage(`Please enter a valid phone number (10 digits).`)
            setShowAlert(true);
        } else {
            const newMember = {
                'firstname': firstname,
                'lastname': lastname,
                'phone': phone,
                'email': email,
                'admin': admin,
            }

            if (id) {
                newMember._id = thisMember._id;
                dispatch(updateMember(newMember));
            } else {
                newMember._id = new Date().getTime();
                dispatch(addMember(newMember));
            }
            navigate('/')
        }
    }
    return(
        <form>
            {showAlert && <Alert message={alertMessage}></Alert>}
            <Link to="/" className="top-right icon">
                <FontAwesomeIcon icon={faX} />
            </Link>

            <p className="primary">Info</p>
            <input 
                placeholder="First Name"
                value={firstname}
                className="w-100"
                onChange={(event) => setFirstname(event.target.value)}></input>
            <br/>
            <input 
                placeholder="Last Name"
                value={lastname}
                className="w-100"
                onChange={(event) => setLastname(event.target.value)}></input>
            <br/>
            <input 
                placeholder="Email"
                value={email}
                className="w-100"
                onChange={(event) => setEmail(event.target.value)}></input>
            <br/>
            <input 
                placeholder="Phone"
                value={phone}
                className="w-100"
                onChange={(event) => setPhone(event.target.value)}></input>

            <p className="primary">Role</p>

            <div className="flex-row space-between">
                {admin && <p className="color-gray">Regular - can't delete members</p>}
                {!admin && <p>Regular - can't delete members</p>}

                {!admin && <input type="radio" name="role" className="radio" defaultChecked onClick={() => setAdmin(false)}/>}
                {admin && <input type="radio" name="role" className="radio" onClick={() => setAdmin(false)}/>}
            </div>
            
            <hr></hr>

            <div className="flex-row space-between mb-3em">
                {!admin && <p className="color-gray">Admin - can delete members</p>}
                {admin && <p>Admin - can delete members</p>}

                {admin && <input type="radio" name="role" className="radio" defaultChecked onClick={() => setAdmin(true)}/>}
                {!admin && <input type="radio" name="role" className="radio" onClick={() => setAdmin(true)}/>}

                {/* {!thisMember && <p className="color-gray">Admin - can delete members</p>}
                {thisMember && thisMember.admin && <p>Admin - can delete members</p>}
                {thisMember && !thisMember.admin && <p className="color-gray">Admin - can delete members</p>}

                {!thisMember &&  <input type="radio" name="role" value="false" className="radio" onClick={() => setAdmin(true)}/>}
                {thisMember && thisMember.admin && <input type="radio" name="role" value="false" defaultChecked className="radio" onClick={() => setAdmin(true)}/>}
                {thisMember && !thisMember.admin && <input type="radio" name="role" value="false" className="radio" onClick={() => setAdmin(true)}/>} */}
            </div>
            
            <br></br>
            <button className="bottom-right color-white bg-color-blue" onClick={addClickHandler}>Save</button>
        </form>
    )
}

export default InputForm;