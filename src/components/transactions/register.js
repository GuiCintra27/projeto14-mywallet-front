export default function Register({type, value, description, date}){
    const transactionValue = parseFloat(value).toFixed(2);
    return(
        <div className="register">
            <div>
                <p className="date">{date}</p>
                <p>{description}</p>
            </div>

            <p className={type}>{transactionValue}</p>
        </div>
    );
}