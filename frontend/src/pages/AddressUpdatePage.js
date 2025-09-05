import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import { checkTokenValidation, getAllAddress, getSingleAddress, logout, updateUserAddress } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { UPDATE_USER_ADDRESS_RESET } from '../constants'
import '../styles/address.css'   // 🔥 custom CSS

const AddressUpdatePage = ({ match }) => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
    const { address, error: errorFetchingAddress } = getSingleAddressReducer

    const updateUserAddressReducer = useSelector(state => state.updateUserAddressReducer)
    const { success: addressUpdateSuccess } = updateUserAddressReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getSingleAddress(match.params.id))
        }
    }, [dispatch, history, userInfo, match])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        const updatedAddress = {
            "name": name,
            "phone_number": phoneNumber,
            "pin_code": pinCode,
            "house_no": houseNumber,
            "landmark": landmark,
            "city": city,
            "state": state,
        }
        dispatch(updateUserAddress(match.params.id, updatedAddress))
    }

    if (addressUpdateSuccess) {
        alert("Address updated successfully.")
        dispatch({ type: UPDATE_USER_ADDRESS_RESET })
        history.push("/all-addresses/")
        dispatch(getAllAddress())
    }

    return (
        <div className="address-container">
            <Card className="address-card">
                <Card.Body>
                    <h3 className="text-center text-primary mb-4">Update Address</h3>

                    {errorFetchingAddress && <h5 className="text-danger text-center">Invalid Address Request</h5>}

                    <Form onSubmit={addressSubmitHandler}>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                defaultValue={address ? address.name : ""}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="10-digit phone number"
                                pattern="[0-9]{10}"
                                defaultValue={address ? address.phone_number : ""}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="6-digit pincode"
                                pattern="[0-9]{6}"
                                defaultValue={address ? address.pin_code : ""}
                                onChange={(e) => setPinCode(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>House No./Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter house number"
                                defaultValue={address ? address.house_no : ""}
                                onChange={(e) => setHouseNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nearby landmark"
                                defaultValue={address ? address.landmark : ""}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                defaultValue={address ? address.city : ""}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter state"
                                defaultValue={address ? address.state : ""}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="w-100 mb-2 btn-gradient" type="submit">
                            Save Changes
                        </Button>

                        <Button
                            className="w-100"
                            variant="outline-secondary"
                            onClick={() => history.push("/all-addresses/")}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AddressUpdatePage
