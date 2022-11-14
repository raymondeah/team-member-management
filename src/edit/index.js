import InputForm from "../input-form";
import { useParams, useNavigate } from "react-router-dom";
import { deleteMember } from "../reducers/members-reducer";
import { useSelector, useDispatch } from "react-redux";


const EditScreen = () => {
    const { id } = useParams();
    const id_as_int = parseInt(id);
    const membersArray = useSelector(state => state.members);
    const thisMember = membersArray.find(m => m._id === id_as_int);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteClickHandler = () => {
        dispatch(deleteMember(id_as_int));
        navigate('/')
    }

    return(
        <>
            <div className="mb-2em">
                <h1>Edit team member</h1>
                <p className="color-gray primary">Set contact info and role.</p>
            </div>
            <hr></hr>
            <InputForm member={thisMember}/>
            <button className="bottom-left border-black color-red" onClick={deleteClickHandler}>Delete</button>
        </>
    )
}

export default EditScreen;