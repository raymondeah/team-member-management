import InputForm from "../input-form";

const AddScreen = () => {
    const blankMember = {
        'firstname': '',
        'lastname': '',
        'phone': '',
        'email': '',
        'admin': false,
    }
    return(
        <>
            <div className="mb-2em">
                <h1>Add a team member</h1>
                <p className="color-gray primary">Set contact info and role.</p>
            </div>
            <hr></hr>
            <InputForm member={blankMember}/>
        </>
    )
}

export default AddScreen;