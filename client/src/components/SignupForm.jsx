import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import LoginForm from "./LoginForm";
import { Paper, FormControl, TextField, Box, Button, Typography, InputLabel } from '@mui/material';
//should be adventurer form


function SignupForm({updateAdventurer}){
    const [signup, setSignup] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const toggleSignup = () => setSignup(prev => !prev);
     
    const schema = yup.object().shape({
        name: yup.string().required("Name is required."),
        username: yup.string().required("Username is required"),
        email: yup.string().required("Email is required."),
        password: yup.string().required("Password is required."),
        bio: yup.string(),
        image: yup.string()
    })

  //create formik instance
    const formik = useFormik({
      //initial values form
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            bio: "",
            image: ""
        },
      //yup schema for validation
        validationSchema: schema,
      //submit callback
        onSubmit: (values, actions) => {
            fetch(signup ? "/api/login" : "/api/signup", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(values)
            }).then (res => {
                if(res.ok){
                    res.json().then(adventurer => {
                    actions.resetForm() 
                    updateAdventurer(adventurer) 
                        navigate("/home")
                    })
                } else{
                    res.json().then((error) => setError(error.message));
                }
            })
        }

    })


    return (
//         <section>
//             {signup ? (
//             <form onSubmit={formik.handleSubmit}>
//             <label> Name:
//             <input 
//             type="text" 
//             name="name" 
//             onChange={formik.handleChange}
//             value={formik.values.name}
//             onBlur={formik.handleBlur}/>
//             {/*this is the onBlur*/}
//             {formik.touched.name && formik.errors.name ? (
//             <h3>{formik.errors.name}</h3>
//             ) : ("")}
//             </label>
//             <label> Username:
//             <input
//             type="text"
//             name="username" 
//             onChange={formik.handleChange}
//             value={formik.values.username}
//             onBlur={formik.handleBlur}/>
//             {formik.touched.username && formik.errors.username ? (
//             <h3>{formik.errors.username}</h3>
//             ) : ("")}
//             </label>
//             <label> Email:
//             <input 
//             type="text"
//             name="email" 
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             onBlur={formik.handleBlur}/>
//             {formik.touched.email && formik.errors.email ? (
//             <h3>{formik.errors.email}</h3>
//             ) : ("")}
//             </label>
//             <label> Password
//             <input 
//             type="password" 
//             name="password" 
//             onChange={formik.handleChange}
//             value={formik.values.password}
//             onBlur={formik.handleBlur}/>
//             {formik.touched.password && formik.errors.password ? (
//             <h3>{formik.errors.password}</h3>
//             ) : ("")}
//             </label>
//             <label> Bio:
//             <input 
//             type="text" 
//             name="bio" 
//             onChange={formik.handleChange}
//             value={formik.values.bio}
//             onBlur={formik.handleBlur}/>
//             {formik.touched.bio && formik.errors.bio ? (
//             <h3>{formik.errors.bio}</h3>
//             ) : ("")}
//             </label>
//             <label> Image:
//             <input 
//             type="text" 
//             name="image" 
//             onChange={formik.handleChange}
//             value={formik.values.image}
//             onBlur={formik.handleBlur} />
//             {formik.touched.image && formik.errors.image ? (
//             <h3>{formik.errors.image}</h3>
//             ) : ("")}
//             </label>
//             <input type="submit" value="Take A Hike!" />
//             </form>
//             ) : ( <LoginForm updateAdventurer={updateAdventurer}/>)}
//                 <section>
// 				<p>{signup ? "Already have an account?" : "Not a member?"}</p>
// 				<button className="button" onClick={toggleSignup}>
// 					{signup ? "Login" : "Sign Up"}
// 				</button>
// 			  </section>
//         </section>
//     )
// }
// <Box
// component="form"
// sx={{
// '& .MuiTextField-root': { m: 1, width: '25ch' },
// }}>

<section className="forms">
    <Box marginBottom={2}>
    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
        {signup ? "Already have an Account?" : "Not a member?"}
    </Typography>
    </Box>
    <Box marginBottom={2}>
    <Button onClick={toggleSignup} textColor="secondary" variant="outlined">
        {signup ? "Login" : "Sign Up"}
 	</Button>
    </Box>
    <Box>
    {signup ? (
        <form onSubmit={formik.handleSubmit} >
           <div>
            <TextField
            required
            id="outlined-required"
            placeholder="Name"
            defaultValue="Hello World"
            type="text" 
            name="name"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
        />
        </div>
        <div>
        {formik.touched.name && formik.errors.name ? (
                <h3>{formik.errors.name}</h3>
                ) : ("")}
           
            <TextField
            type="text"
            name="username"
            placeholder="Username*"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
        />
        </div>
        <div>
        {formik.touched.username && formik.errors.username ? (
                <h3>{formik.errors.username}</h3>
                ) : ("")}
            
            <TextField
            type="text"
            name="email"
            placeholder="Email"
            variant="filled" 
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
        />
        </div>
        <div>
        {formik.touched.email && formik.errors.email ? (
                <h3>{formik.errors.email}</h3>
                ) : ("")}
            <TextField
            type="password" 
            name="password"
            placeholder="Password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
        />
        </div>
        {/* {formik.touched.password && formik.errors.password ? (
                <h3>{formik.errors.password}</h3>
                ) : ("")}
            <TextField
                type="text" 
                name="bio"
                label="Bio"
                multiline
                rows={4}
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.bio}
                onBlur={formik.handleBlur}
            /> */}
            {/* {formik.touched.password && formik.errors.password ? (
                <h3>{formik.errors.password}</h3>
                ) : ("")}
            <TextField
                type="text" 
                name="image"
                label="Profile Picture"
                variant="filled" 
                onChange={formik.handleChange}
                value={formik.values.image}
                onBlur={formik.handleBlur} 
            />
            {formik.touched.image && formik.errors.image ? (
                <h3>{formik.errors.image}</h3>
                ) : ("")}     */}
            <Button color="secondary" variant="outlined" sx={{margin: 3}} placeholder="Join!" type="submit">Join!</Button>
           
        </form>
     ) : ( <LoginForm updateAdventurer={updateAdventurer}/>)}
					
    
    </Box>
    </section>
   
   )
}


export default SignupForm;
