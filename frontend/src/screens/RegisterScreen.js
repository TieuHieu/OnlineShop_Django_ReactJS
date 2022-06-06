import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer';

function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userRegister = useSelector(state => state.userRegister)
  const {error, loading, userInfo} = userRegister
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  useEffect(() => {
      if (userInfo){
        navigate(redirect)
      }
  }, [userInfo])

  const submitHandler = (e) => {
      e.preventDefault()
      console.log('Submitted')
      if (password != confirmPassword) {
          setMessage('Passwords do not match')
      }
      else {
          dispatch(register(name, email,password))
      }
      
  }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message vairant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Your Name</Form.Label>
                <Form.Control  required type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <br/>

            <Button type='submit' variant='primary'>
                Register
            </Button>
        </Form>
        
        <Row className='py-3'>
            <Col>
                Have an account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen