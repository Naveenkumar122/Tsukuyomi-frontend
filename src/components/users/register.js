import React from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class register extends React.Component{
    constructor(props) {
        super(props);
        // redirect to home if already logged in
        if (localStorage.getItem('user')) { 
            this.props.history.push('/');
        }
    }
    render(){
        return (
            <div className="container center">
                <h2>Register</h2>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        teamName:'',
                        password:''
                    }}
                    validationSchema={Yup.object().shape({
                        name:Yup.string().required('Name is required'),
                        email: Yup.string().email("Invalid email").required('Email is required'),
                        teamName:Yup.string().required('Team name is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ name, email, teamName, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        axios.post('http://localhost:4000/users/register', {
                            name: name,
                            email: email,
                            teamName:teamName,
                            password: password
                            })
                            .then(function (response) {
                                window.location.reload(false);
                                this.props.history.push('/');
                            })
                            .catch(function (error) {
                                setSubmitting(false);
                                setStatus(error);
                            });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>  
                            <div class="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="#ef9a9a red lighten-4" />
                            </div>                        
                            <div class="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="#ef9a9a red lighten-4" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="teamName">Team name</label>
                                <Field name="teamName" type="text" className={'form-control' + (errors.teamName && touched.teamName ? ' is-invalid' : '')} />
                                <ErrorMessage name="teamName" component="div" className="#ef9a9a red lighten-4" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="#ef9a9a red lighten-4" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="waves-effect waves-light btn" disabled={isSubmitting}>Register</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className="#ff5252 red accent-2">{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
                
        )
    }
}

export default register;