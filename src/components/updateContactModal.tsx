import { useEffect, useState } from "react";
import { fetchContactById, updateContact } from "../services/contactService";
import { ContactType } from "../types/contactTypes";
import { Form, Field } from "react-final-form";
import {
  composeValidators,
  minValue,
  required,
} from "../validations/contactFormValidation";

const UpdateContactModal = ({
  userId,
  isOpen,
  onClose,
}: string | boolean | any) => {
  const [data, setData] = useState<[]>([]);
  const onSubmit = (data: ContactType) => {
    data.id = userId;
    updateContact(data);
    onClose();
  };

  useEffect(() => {
    const getContactById = async () => {
      const q: any = await fetchContactById(userId);
      setData(q);
      return q;
    };

    getContactById();
  }, []);

  if (!isOpen) return null;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={data}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="overlay">
              <div className="modalContainer">
                <div className="d-flex align-items-center justify-content-between flex-row">
                  <h3>Update Contact</h3>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => onClose()}
                  ></button>
                </div>

                <Field
                  name="name"
                  validate={composeValidators(required, minValue(4))}
                  render={({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={input.onChange}
                        value={input.value}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="company"
                  render={({ input }) => (
                    <input
                      {...input}
                      type="text"
                      className="form-control mt-3"
                      placeholder="Company"
                      onChange={input.onChange}
                      value={input.value}
                    />
                  )}
                />
                <Field
                  name="type"
                  validate={required}
                  render={({ input, meta }) => (
                    <div>
                      <select
                        {...input}
                        className="form-control mt-3"
                        onChange={input.onChange}
                        value={input.value}
                      >
                        <option value="friend">Friend</option>
                        <option value="family">Family</option>
                        <option value="colleagues">Colleagues</option>
                        <option value="other">Other</option>
                      </select>
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="email"
                  validate={composeValidators(required, minValue(4))}
                  render={({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="email"
                        className="form-control mt-3"
                        placeholder="Email"
                        onChange={input.onChange}
                        value={input.value}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />
                <Field
                  name="phone"
                  validate={required}
                  render={({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        className="form-control mt-3"
                        placeholder="Phone"
                        onChange={input.onChange}
                        value={input.value}
                      />
                      {meta.error && meta.touched && (
                        <span className="text-danger">{meta.error}</span>
                      )}
                    </div>
                  )}
                />

                <button type="submit" className="btn btn-primary mt-3">
                  Save changes
                </button>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
};

export default UpdateContactModal;
