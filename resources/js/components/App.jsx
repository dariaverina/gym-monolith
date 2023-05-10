import React, { useState } from "react";
import Layout from "./common/Layout/Layout";
// import './app.css';
const App =() =>{
    const [status, setStatus] = useState("bebra");
    const [name, setName] = useState("bebra2");
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.patch(`/api/users/10`, { status: 'iiiii'});
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    return (
        <Layout>
            {/* <button onClick={handleSubmit}>test</button> */}
         <div className="bg-red-600">hello</div>
        </Layout>
       
    )
}

export default App; 