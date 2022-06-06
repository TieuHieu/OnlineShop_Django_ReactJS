import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
      if (!userInfo){
        navigate('/login')
      }
      else {
          if (!user || !user.name || success) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch(getUserDetails('profile'))
          }
          else {
              setName(user.name)
              setEmail(user.email)
          }
      }
  }, [dispatch, userInfo, user, success])

  const submitHandler = (e) => {
      e.preventDefault()
      console.log('Submitted')
      if (password != confirmPassword) {
          setMessage('Passwords do not match')
      }
      else {
          dispatch(updateUserProfile({
              'id': user._id,
              'name': name,
              'email': email,
              'password': password
          }))
      }
      
  }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message vairant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Your Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen