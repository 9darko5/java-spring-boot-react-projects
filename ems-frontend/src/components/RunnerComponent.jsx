import React, {useEffect, useState} from 'react'
import { createRunner, getRunner, updateRunner } from '../services/RunnerService'
import { useNavigate, useParams } from 'react-router-dom'

const RunnerComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
 
    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
           getRunner(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
           }).catch(error => {
            if (error.response && error.response.status === 401) {
                navigate('/error');
              }
           })
        }
    }, []);

    const saveOrUpdateRunner = (e) => {
        e.preventDefault();

        const runner = {firstName, lastName, email};

        if(validateForm()){

            if(id){
                updateRunner(id, runner).then((response) => {
                    console.log(response.data);
                    navigator('/runners')
                }).catch((error) => {
                    if (error.response && error.response.status === 401) {
                        navigate('/error');
                      }
                });
            } else {
                createRunner(runner).then((response)=>{
                    navigator('/runners');
                }).catch((error) => {
                    if (error.response && error.response.status === 401) {
                        const navigate = useNavigate();
                        navigate('/error');
                      }
                });
            }
        }
    }

    const validateForm = () => {
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else{
            errorsCopy.firstName = 'First name is required!';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else{
            errorsCopy.lastName = 'Last name is required!';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else{
            errorsCopy.email = 'Email is required!';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    const pageTitle = () => {
        if(id){
            return <h2 className='text-center'>Update Runner</h2>
        } else{
            return <h2 className='text-center'>Add Runner</h2>
        }
    }

  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First name:</label>
                            <input
                            type='text'
                            placeholder='Enter Runner First Name'
                            name='firstName'
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                            onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last name:</label>
                            <input
                            type='text'
                            placeholder='Enter Runner Last Name'
                            name='lastName'
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                            onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                            type='text'
                            placeholder='Enter Runner Email'
                            name='email'
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid': ''}`}
                            onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateRunner}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RunnerComponent