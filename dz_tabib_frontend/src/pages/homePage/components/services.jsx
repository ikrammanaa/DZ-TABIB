const Services = () => {
    return (
        <div style={{ fontFamily:"montserrat"  }}>
            <div className="statstics flex justify-around items-center px-10 py-10">
              <div className="1">
                <h1 className='text-4xl font-bold'style={{ color: "#0090CF" }}>15K</h1>
             <p className='text-2xl'>Happy Customers</p>
              </div>
              <div className="2">
                <h1 className='text-4xl font-bold'style={{ color: "#0090CF" }}>150K</h1>
             <p className='text-2xl'>Monthly Visitors</p>
              </div>
              <div className="3">
                <h1 className='text-4xl font-bold'style={{ color: "#0090CF" }}>15</h1>
             <p className='text-2xl'>Countries WorldWide</p>
              </div>
              <div className="4">
                <h1 className='text-4xl font-bold'style={{ color: "#0090CF" }}>100+</h1>
             <p className='text-2xl'>Top Partners</p>
              </div>
            </div>
            <div className="our-srv ">
             <div>
              <h1 className="ml-40 text-3xl p-5 font-bold"  style={{ color: "#013559"}}>Our Services</h1>
              <p className="ml-40 p-5">Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics </p>
             </div>
             <div className="flex justify-center gap-20 mt-20">
              <div className=" p-8 shadow-2xl"style={{ backgroundColor: "#CDF5FD" }}>
                <img src="/src/assets/circle sec-.png" alt="" />
                <h3 className="p-3 font-bold">Ouick examination</h3>
                <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%"}} />

                <p className="p-3">The gradual accumulation of <br />
                information about </p>
              </div>
              <div className=" p-8 shadow-2xl " style={{ backgroundColor: "#CDF5FD" }}>
                <img src="/src/assets/circle sec2-.png" alt="" />
                <h3 className="p-3 font-bold">Ouick examination</h3>
                <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%"}} />
                <p>The gradual accumulation of <br />
                information about </p>
              </div>
              <div className=" p-8 shadow-2xl " style={{ backgroundColor: "#CDF5FD" }}>
                <img src="/src/assets/circle sec3-.png" alt="" />
                <h3 className="p-3 font-bold">Painless procedures</h3>
                <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%"}}/>
                <p>The gradual accumulation of <br />
                information about </p>
              </div>
             </div>
            </div>
        </div>
    );
}

export default Services;