import ListItem from "./list-item";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const ListScreen = () => {
    const membersArray = useSelector(state => state.members)
    const numMembers = membersArray.length
    return(
        <>
            <Link to="/add" className="top-right icon">
                <FontAwesomeIcon icon={faPlus}/>
            </Link>
            <div className="mb-2em">
                <h1>Team Members</h1>   
                <p className="primary color-gray">
                    {numMembers === 1 && `You have ${numMembers} team member.`}
                    {numMembers !== 1 && `You have ${numMembers} team members.`}
                </p>
            </div>
            <hr></hr>
            <ul>
                {
                    membersArray.map(member => <ListItem key={member._id} member={member}/>)
                }
            </ul>
        </>
    )
}

export default ListScreen;