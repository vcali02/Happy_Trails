import React from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"

//should be adventurer form
function Auth(){

    const navigate = useNavigate()
    //create schema:
    //name required
    //username
    //email required
    //password
    //bio
    //image
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
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(values)
            }).then (res => {
                if(res.ok){
                    res.json().then(adventurer => {
                        console.log(adventurer)
                        navigate("/adventurers/${adventurer.id}")
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
            <label> Name:
            <input 
            type="text" 
            name="name" 
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}/>
            {/*this is the onBlur*/}
            {formik.touched.name && formik.errors.name ? (
            <h3>{formik.errors.name}</h3>
            ) : ("")}
            </label>
            <label> Username:
            <input
            type="text"
            name="username" 
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}/>
            {formik.touched.username && formik.errors.username ? (
            <h3>{formik.errors.username}</h3>
            ) : ("")}
            </label>
            <label> Email:
            <input 
            type="text"
            name="email" 
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (
            <h3>{formik.errors.email}</h3>
            ) : ("")}
            </label>
            <label> Password
            <input 
            type="password" 
            name="password" 
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? (
            <h3>{formik.errors.password}</h3>
            ) : ("")}
            </label>
            <label> Bio:
            <input 
            type="text" 
            name="bio" 
            onChange={formik.handleChange}
            value={formik.values.bio}
            onBlur={formik.handleBlur}/>
            {formik.touched.bio && formik.errors.bio ? (
            <h3>{formik.errors.bio}</h3>
            ) : ("")}
            </label>
            <label> Image:
            <input 
            type="text" 
            name="image" 
            onChange={formik.handleChange}
            value={formik.values.image}
            onBlur={formik.handleBlur} />
            {formik.touched.image && formik.errors.image ? (
            <h3>{formik.errors.image}</h3>
            ) : ("")}
            </label>
            <input type="submit" value="Submit" />
            </form>
        </section>
    )
}

export default Auth;


  // const [signup, setSignup] = useState(true);
	// const [error, setError] = useState(null);

	// const navigate = useNavigate();
	// const toggleSignup = () => setSignup((prev) => !prev)


  // const formSchema = yup.object().shape({
	// 	name: yup.string(),
	// 	username: yup.string().required("Please enter a username"),
	// 	password: yup.string().required("Please enter a password"),
	// });


  // const formik = useFormik({
	// 	initialValues: {
	// 		username: "",
	// 		name: "",
	// 		password: "",
	// 	},
  //   validationSchema: formSchema,
	// 	onSubmit: (values, actions) => {
  //     //only want to make a post to users if signup is true
  //     fetch(signup ? "/signup" : "/login", {
	// 			method: "POST",
	// 			headers: {
	// 				"content-type": "application/json",
	// 			},
	// 			body: JSON.stringify(values),
	// 		}).then((res) => {
	// 			if (res.ok) {
	// 				res.json().then((data) => {
	// 					actions.resetForm()
	// 					updateUser(data)
	// 					navigate("/")
	// 				});
	// 			} else {
  //         res.json().then((err) => setError(err.message))
  //         }
  //       })
  //   }
  // })