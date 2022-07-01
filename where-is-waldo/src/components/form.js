import '../styles/form.css';

const Form = ({getUserName, gameOver}) => {
    return(
        <div className={`popup-form ${gameOver}`}>
            <div className='win'>You win!</div>
            <form className='form' onSubmit={getUserName}>
                <div className='form-title'>Enter a name to save your time</div>
                <div className='input-section'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' required></input>
                </div>
                <div className='button-section'>
                    <button className='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;