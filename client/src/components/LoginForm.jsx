import React, { useState } from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
import { Paper, FormControl, TextField, Box, Button, Typography, InputLabel } from '@mui/material';

           
    
    
    
    
    
    
function LoginForm({updateAdventurer}){
      
        const [error, setError] = useState(null)
        const navigate = useNavigate()
      
               
        const schema = yup.object().shape({
            username: yup.string().required("Username is required"),
            password: yup.string().required("Password is required."),
               
              })
          
          
            
              const formik = useFormik({
               
                  initialValues: {
                     username: "",
                     password: "",
                   
                  },
               
                  validationSchema: schema,
                
                  onSubmit: (values, actions) => {
                      fetch( "/api/login", {
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
              

return(

          <section>

          <form onSubmit={formik.handleSubmit}>
              <div>
              <TextField
              type="text"
              placeholder="username"
              name="username" 
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}/>
              {formik.touched.username && formik.errors.username ? (
              <h3>{formik.errors.username}</h3>
              ) : ("")}
              </div>
              <div> 
              <TextField
              placeholder="password" 
               type="password" 
               name="password" 
               onChange={formik.handleChange}
               value={formik.values.password}
               onBlur={formik.handleBlur}/>
              {formik.touched.password && formik.errors.password ? (
               <h3>{formik.errors.password}</h3>
               ) : ("")}
              </div>
              <Button color="secondary" variant="outlined" sx={{margin: 3}} placeholder="Hit the Trails!" type="submit"> Hit the Trails! </Button>
      {error ? <label style={{ color: "red" }}>{error}</label> : ""}
          </form>
          
          </section>

          )
              }  
export default LoginForm;