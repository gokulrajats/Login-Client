import React, {useState} from 'react'
import { Formik } from 'formik';
import User from '../Services/User';
import { withRouter} from 'react-router-dom';
import { store } from 'react-notifications-component';


const SignUp = (props) => {
    const { updateLogin } = props
    const [exists, setExists] = useState("");
    return (
        <div className="login-container">
            <h1>SignUp</h1>
            <Formik
                initialValues={{ first_name: '', last_name: '', full_name: '', email: '',password: '', confirm_password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.first_name) errors.first_name = "*Required"
                    if (!values.last_name) errors.last_name = "*Required"

                    if (!values.email) {
                        errors.email = '*Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = "*Password Required"
                    } else if (values.password.length < 8) {
                        errors.password = "Password length should be atleast 8 characters"
                    } else if (values.password !== values.confirm_password) {
                        errors.confirm_password = "Password and Confirm Password Mismatch"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const payload = values
                    setSubmitting(false)
                    User.SignupService(
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
                                setExists(res.data.message)                       
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
                                <span className="error-message">{errors.first_name && touched.first_name && errors.first_name}</span>
                                <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    className="form_input"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <span className="error-message">{errors.last_name && touched.last_name && errors.last_name}</span>
                                <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    className="form_input"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="full_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name + values.last_name}
                                    className="form_input"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                            <span className="error-message">{exists}</span>
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
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <span className="error-message">{errors.confirm_password && touched.confirm_password && errors.confirm_password}</span>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                    className="form_input"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <button type="submit" className="login-button" disabled={isSubmitting}>
                                Sign Up
                            </button>
                            <div>
        <p>
          Already have an account? <a onClick={updateLogin} href={null} className="clickable-text"><b>   Log In</b></a>
        </p>
      </div>
                        </form>
                    )}
            </Formik>
        </div>
    )
}

export default withRouter(SignUp);