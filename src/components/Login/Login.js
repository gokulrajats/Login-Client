import React, {useState} from 'react'
import { Formik } from 'formik';
import "./Login.css"
import User from '../Services/User';
import { withRouter} from 'react-router-dom';
import { store } from 'react-notifications-component';


const Login = (props) => {
    const { updateSignup } = props
    const [invalid, setInvalid] = useState("");
    return (
        <div className="login-container">
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = '*Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if(!values.password) {
                        errors.password = "*Password Required"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = values
                    setSubmitting(false)
                    User.SigninService(
                        payload,
                        (res) => {
                            if (res.data.status) {
                                localStorage.setItem("TOKEN",res.data.token)
                                store.addNotification({
                                    message: res.data.message,
                                    type: "success",
                                    insert: "top",
                                    container: "top-center",
                                    animationIn: ["animated", "fadeIn"],
                                    animationOut: ["animated", "fadeOut"],
                                    dismiss: {
                                      duration: 2000,
                                      onScreen: true
                                    }
                                  });
                                return props.history.push("/dashboard")
                            } else {
                                setInvalid(res.data.message)
                            }
                        })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                            <span className="error-message">{errors.email && touched.email && errors.email}</span>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="form_input"
                                placeholder="Email"
                            />
                        
                            </div>
                            <div>
                            <span className="error-message">{errors.password && touched.password && errors.password}</span>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="form_input"
                                placeholder= "Password"
                            />
                            <span className="error-message">{invalid}</span>

                            </div>
                            <button type="submit" className="login-button" disabled={isSubmitting}>
                                Login
           </button>
           <div>
        <p>
          Create an account <a onClick={updateSignup} className="clickable-text"><b>   Sign Up</b></a>
        </p>
      </div>
                        </form>
                    )}
            </Formik>
        </div>
    )
}

export default withRouter(Login);