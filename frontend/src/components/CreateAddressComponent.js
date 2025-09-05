import React, { useState } from 'react'
import { Form, Button, Card, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createUserAddress, getAllAddress } from '../actions/userActions'
import { CREATE_USER_ADDRESS_RESET } from '../constants'
import Message from './Message'
import '../styles/address.css' // 🔥 Custom styling

const CreateAddressComponent = ({ toggleCreateAddress }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const { success: addressCreationSuccess, error: errorCreatingAddress } = useSelector(
        (state) => state.createUserAddressReducer
    )

    const addressSubmitHandler = (e) => {
        e.preventDefault()
        const addressData = {
            name,
            phone_number: phoneNumber,
            pin_code: pinCode,
            house_no: houseNumber,
            landmark,
            city,
            state,
        }
        dispatch(createUserAddress(addressData))
    }

    if (addressCreationSuccess) {
        alert("Address successfully created.")
        toggleCreateAddress()
        dispatch({ type: CREATE_USER_ADDRESS_RESET })
        dispatch(getAllAddress())
    }

    return (
        <div className="address-form-container">
            <h4 className="text-center text-primary mb-4">Add a New Address</h4>
            {errorCreatingAddress && <Message variant="danger">{errorCreatingAddress}</Message>}

            <Card className="address-card">
                <Card.Body>
                    <Form onSubmit={addressSubmitHandler}>

                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="phoneNumber" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+91</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone number"
                                    pattern="[0-9]+"
                                    maxLength="10"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="pinCode" className="mb-3">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter pin code"
                                value={pinCode}
                                pattern="[0-9]+"
                                maxLength="6"
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="houseNumber" className="mb-3">
                            <Form.Label>House No. / Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="House number or flat"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="landmark" className="mb-3">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nearby landmark"
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="city" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="state" className="mb-4">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" className="btn-success w-100 mb-2">
                            Save Address
                        </Button>
                        <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => toggleCreateAddress()}
                        >
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateAddressComponent
