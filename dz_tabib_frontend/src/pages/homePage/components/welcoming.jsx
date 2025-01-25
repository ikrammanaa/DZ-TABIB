import { Link } from "react-router-dom";
const Welcoming = () => {
    return (
        <div className='flex justify-around'>
            <div>
                <h1 className='text-3xl m-10'  style={{ color: "#013559" }}>We’re welcoming new <br /> patients and can’t wait <br /> to meet you.</h1>
                <p className='m-10'>We use only the best quality materials on the market in order to <br /> provide the best products to our patients, So don’t worry about <br /> anything and book yourself.</p>
               <Link to="/login">
                <button className='h-10 px-2 rounded ml-10' style={{ color: "#FFFFFF", backgroundColor: "#0090CF" }}> 
                    <a href="">Make an Appointment</a>
                </button>
               </Link>
            </div>
            <div>
                <img src="/src/assets/Group.png" alt="" />
            </div>
         
        </div>
    );
}

export default Welcoming;