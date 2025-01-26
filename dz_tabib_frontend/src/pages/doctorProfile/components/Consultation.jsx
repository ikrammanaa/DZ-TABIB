import Sidebardoct from "./Sidebardoct";
import Navdoct from "./Navdoct";
const Consultation = () => {
    return (
        <div>
        <div> <Navdoct /></div> 
  <div className="flex flex-1 ">
   <div className='min-h-[calc(100vh-3.5rem)] '>
           <Sidebardoct className=" min-h-[calc(100vh-3.5rem)]" />
           </div>
           <div className="content">
            {/* content */}

</div>
           </div>
    </div>
    );
}

export default Consultation;