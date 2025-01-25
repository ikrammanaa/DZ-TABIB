import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
const Doctors = () => {
    return (
        <div style={{ fontFamily:"montserrat"  }}>
            <div>
              <h1 className="ml-40 text-3xl p-5 font-bold"  style={{ color: "#013559"}}>Meet Our Top Doctors</h1>
              <p className="ml-40 p-5">Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics </p>
             </div>
             <div className="flex justify-center gap-10 mt-20">
             <div className=" p-8 shadow-2xl"style={{ backgroundColor: "#FAFAFA" }}>
               <div className="flex justify-center gap-7"><FaStar  /><FaStar /><FaStar /><FaStar /><CiStar /></div>
                <p className="p-5 " style={{ color: "#737373" }}>Slate helps you see
                        how many <br /> more days 
                        you need to  work to 
                        reach your financial 
                        goal for the month 
                        and year. </p>
                        <div className="flex gap-5 m-5">
                            <img src="/src/assets/circle.png" alt="" />
                            <div>
                            <h3 className=' font-bold'style={{ color: "#0090CF" }}>Regina Miles</h3>
                            <p className=' font-bold'>Designer</p>
                            </div>
                        </div>
              </div>

              <div className=" p-8 shadow-2xl"style={{ backgroundColor: "#FAFAFA" }}>
               <div className="flex justify-center gap-7"><FaStar  /><FaStar /><FaStar /><FaStar /><CiStar /></div>
                <p className="p-5 " style={{ color: "#737373" }}>Slate helps you see
                        how many <br /> more days 
                        you need to  work to 
                        reach your financial 
                        goal for the month 
                        and year. </p>
                        <div className="flex gap-5 m-5">
                            <img src="/src/assets/circle.png" alt="" />
                            <div>
                            <h3 className=' font-bold'style={{ color: "#0090CF" }}>Regina Miles</h3>
                            <p className=' font-bold'>Designer</p>
                            </div>
                        </div>
              </div>

              <div className=" p-8 shadow-2xl"style={{ backgroundColor: "#FAFAFA" }}>
               <div className="flex justify-center gap-7"><FaStar  /><FaStar /><FaStar /><FaStar /><CiStar /></div>
                <p className="p-5 " style={{ color: "#737373" }}>Slate helps you see
                        how many <br /> more days 
                        you need to  work to 
                        reach your financial 
                        goal for the month 
                        and year. </p>
                        <div className="flex gap-5 m-5">
                            <img src="/src/assets/circle.png" alt="" />
                            <div>
                            <h3 className=' font-bold'style={{ color: "#0090CF" }}>Regina Miles</h3>
                            <p className=' font-bold'>Designer</p>
                            </div>
                        </div>
              </div>


             </div>
        </div>
    );
}

export default Doctors;