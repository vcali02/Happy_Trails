import React from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"

//this is review form
function AddReview() {

  const navigate = useNavigate()
  //create schema:
  //review required
  //adventurer_id required
  //trail_id required
  
  const schema = yup.object().shape({
      adventurer_username: yup.string().required("Your name is required."),
      trail_name: yup.string().required("The trail you're reviewing is required"),
      review: yup.string().required("A review of a minimum of 5 characters is required.")
  })



    //can search through adventurer and filter for the username
    //can get a row, can get the id, etc

  //create formik instance
  const formik = useFormik({
      //initial values form
      initialValues: {
        adventurer_username: "",
        trail_name: "",
        review: ""
      },
      //yup schema for validation
      validationSchema: schema,
      //submit callback
      onSubmit: (values) => {
          fetch("/api/trail_reviews", {
              method: "POST",
              headers: {
                  "content-type" : "application/json"
              },
              body: JSON.stringify(values)
          }).then (res => {
              if(res.ok){
                  res.json().then(adventurer => {
                      console.log(adventurer)
                      navigate("/trail_reviews/${adventurer.id}")
                  })
              } else{
                  console.log("oops")
              }
          })
      }

  })


  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <label> Username:
          <input
          type="text"
          name="adventurer_username" 
          onChange={formik.handleChange}
          value={formik.values.adventurer_username}
          onBlur={formik.handleBlur}/>
          {formik.touched.adventurer_username && formik.errors.adventurer_username ? (
          <h3>{formik.errors.adventurer_username}</h3>
          ) : ("")}
        </label>
        <label> Trail Name:
          <input 
          type="text"
          name="trail_name" 
          onChange={formik.handleChange}
          value={formik.values.trail_name}
          onBlur={formik.handleBlur}/>
          {formik.touched.trail_name && formik.errors.trail_name ? (
          <h3>{formik.errors.trail_name}</h3>
          ) : ("")}
        </label>
        <label> Review:
          <input 
          type="text" 
          name="review" 
          onChange={formik.handleChange}
          value={formik.values.review}
          onBlur={formik.handleBlur}/>
          {formik.touched.review && formik.errors.review ? (
          <h3>{formik.errors.review}</h3>
          ) : ("")}
        </label>
          <input type="submit" value="Submit" />
        </form>
      </section> 
  )
}

export default AddReview