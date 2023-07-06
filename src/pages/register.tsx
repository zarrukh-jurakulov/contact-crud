import { createUserWithEmailAndPassword } from "firebase/auth";
import { Field, Form } from "react-final-form";
import { auth } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { required } from "../validations/contactFormValidation";
import { AuthFormType } from "../types/authTypes";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: AuthFormType) => {
    const q = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        localStorage.setItem("@token", user.accessToken);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
      });

    return q;
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="container w-50 vh-100 d-flex align-items-center justify-content-center">
              <div className="col">
                <h3>Register</h3>
                <Field
                  name="email"
                  validate={required}
                  render={({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="email"
                        placeholder="Email"
                        onChange={input.onChange}
                        value={input.value}
                        className="form-control"
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  validate={required}
                  render={({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="password"
                        placeholder="Password"
                        onChange={input.onChange}
                        value={input.value}
                        className="form-control mt-3"
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <button type="submit" className="btn btn-primary mt-3 w-100">
                  Submit
                </button>
                <p>
                  Already have an account? <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

export default Register;
