import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService } from './user-service';

class RegisterPage extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                <h2 className="text text-center">Register</h2>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        teamName:'',
                        salary:'',
                        password: '',
                        changepassword:''
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .required('Name is required')
                            .min(4, "name is tooshort")
                            .matches(/[a-zA-Z]/, 'name can only contain only letters.'),
                        email: Yup.string().email().required('Email is required'),
                        teamName:Yup.string().required('teamName is required'),
                        salary: Yup.string()
                            .matches(/^\d+$/, 'Salary must be in number format')
                            .required('Salary Required'),
                        password: Yup.string()
                            .required('No password provided.')
                            .min(5, 'Password is too short - should be 5 chars minimum.')
                            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                        changepassword: Yup.string().when("password", {
                                is: val => (val && val.length > 0 ? true : false),
                                then: Yup.string().oneOf(
                                  [Yup.ref("password")],
                                  "Both password need to be the same"
                                )
                              })    
                    })}
                    onSubmit={({ name,email,teamName,salary,password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        userService.register(name,email,teamName,salary,password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="teamName">Team Name</label>
                                <Field name="teamName" type="text" className={'form-control' + (errors.teamName && touched.teamName ? ' is-invalid' : '')} />
                                <ErrorMessage name="teamName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <Field name="salary" type="text" className={'form-control' + (errors.salary && touched.salary ? ' is-invalid' : '')} />
                                <ErrorMessage name="salary" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="changepassword">Confirm Password</label>
                                <Field name="changepassword" type="password" className={'form-control' + (errors.changepassword && touched.changepassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="changepassword" component="div" className="invalid-feedback" />
                            </div>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>SignUp</button>
                                {isSubmitting &&
                                    <img alt="gif" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
            </div>
            </div>
        )
    }
}

export default  RegisterPage;
