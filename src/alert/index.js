import './index.css'

const Alert = ({message}) => {
    // const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setVisible(false);
    //     }, 3000);
    // }, []);

    return(
        <div className="alert">
            <p>{message}</p>
        </div>
        
    )
}

export default Alert;