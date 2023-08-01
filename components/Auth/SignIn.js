"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Navbar from "../Navbar";
import { useAuth, VIEWS } from "../AuthProvider";
import supabase from "../../app/supabase-browser";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

const SignIn = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);

    async function signIn(formData) {
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setErrorMsg(error.message);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="auth-container font-outfit">
                <div className="auth-card">
                    <p className="auth-title ">Sign In</p>
                    <div className="w-full text-center text-[16px] text-zinc-500 font-medium mb-4">
                        Welcome back! Please enter your details
                    </div>

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={SignInSchema}
                        onSubmit={signIn}
                    >
                        {({ errors, touched }) => (
                            <Form className="auth-form">
                                <label htmlFor="email">Email</label>
                                <Field
                                    className={cn(
                                        "auth-input ",
                                        errors.email &&
                                            touched.email &&
                                            "bg-red-50"
                                    )}
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    type="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-red-600">
                                        {errors.email}
                                    </div>
                                ) : null}

                                <label htmlFor="email">Password</label>
                                <Field
                                    className={cn(
                                        "auth-input",
                                        errors.password &&
                                            touched.password &&
                                            "bg-red-50"
                                    )}
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div className="text-red-600">
                                        {errors.password}
                                    </div>
                                ) : null}

                                <button
                                    className=" w-full underline text-green"
                                    type="button"
                                    onClick={() =>
                                        setView(VIEWS.FORGOTTEN_PASSWORD)
                                    }
                                >
                                    Forgot your password?
                                </button>

                                <button className="auth-button" type="submit">
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {errorMsg && (
                        <div className="text-red-600 text-center">
                            {errorMsg}
                        </div>
                    )}
                    <button
                        className=" w-full"
                        type="button"
                        onClick={() => setView(VIEWS.SIGN_UP)}
                    >
                        Don&apos;t have an account yet?{" "}
                        <span className="underline text-green">Create one</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
