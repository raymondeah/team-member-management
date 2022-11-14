import profilePicture from '../images/pfp.png'
import { Link } from 'react-router-dom';

const ListItem = ({member}) => {
    const formattedPhone = `${member.phone.slice(0, 3)}-${member.phone.slice(3, 6)}-${member.phone.slice(6, 10)}`
    return(
        <Link to={`/edit/${member._id}`}>
            <li className="flex-row border-bottom-black pv-1em line-height-smaller">
                <img alt="pfp" width={50} height={50} src={profilePicture} className='me-1em'/>
                <div>
                    <p>
                        {member.admin && `${member.firstname} ${member.lastname} (admin)`} 
                        {!member.admin && `${member.firstname} ${member.lastname}`} 
                    </p>
                    <p className="color-gray">{formattedPhone}</p>
                    <p className='color-gray'>{member.email}</p>
                </div>
            </li>
        </Link>
    )
}

export default ListItem;