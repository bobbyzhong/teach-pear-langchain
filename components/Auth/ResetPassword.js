"use client";

import { useState } from "react";
import cn from "classnames";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Navbar from "../Navbar";
import { useAuth, VIEWS } from "../AuthProvider";
import supabase from "../../app/supabase-browser";

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
});

const ResetPassword = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function resetPassword(formData) {
        const { error } = await supabase.auth.resetPasswordForEmail(
            formData?.email,
            {
                redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`,
            }
        );

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg("Password reset instructions sent.");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="auth-container font-outfit">
                <div className="auth-card">
                    <h2 className="auth-title">Forgot Password</h2>
                    <div className="w-full text-center text-[16px] text-zinc-500 font-medium mb-4">
                        We'll send you an email to help you reset your password
                    </div>
                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        validationSchema={ResetPasswordSchema}
                        onSubmit={resetPassword}
                    >
                        {({ errors, touched }) => (
                            <Form className="auth-form">
                                <label htmlFor="email">Email</label>
                                <Field
                                    className={cn(
                                        "auth-input",
                                        errors.email && "bg-red-50"
                                    )}
                                    id="email"
                                    name="email"
                                    placeholder="jane@acme.com"
                                    type="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-red-600">
                                        {errors.email}
                                    </div>
                                ) : null}
                                <button className="auth-button" type="submit">
                                    Send Instructions
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {errorMsg && (
                        <div className="text-center text-red-600">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="text-center text-black">
                            {successMsg}
                        </div>
                    )}
                    <button
                        className=" w-full"
                        type="button"
                        onClick={() => setView(VIEWS.SIGN_IN)}
                    >
                        Remember your password?{" "}
                        <span className="underline text-green">Sign In.</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
