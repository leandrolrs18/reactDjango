import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Nav, Card,Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { listMyBodybuilders, listInvitations, listBodybuildersAvailable, sendInvitationPersonal } from '../actions/userActions'


function WorkoutCreate() {


  const dispatch = useDispatch()

  const days = [
    ,
    {
      id : 1,
      name : 'domingo'
    },
    {
      id : 2,
      name : 'segunda'
    },
    {
      id : 3,
      name : 'terça'
    },
    {
      id : 4,
      name : 'quarta'
    },
    {
      id : 5,
      name : 'quinta'
    },
    {
      id : 6,
      name : 'sexta'
    },
    {
      id : 7,
      name : 'sábado'
    }
  ]

    useEffect(() => {

    }, [dispatch])

   

  const navHandler = (e) => {

  }



  const submitHandler = (e) => {
    e.preventDefault()

  }

  const submitHandlerTwo = (e) => {
    e.preventDefault()
  }

  return (
    <Card>
      
    </Card>
    
  );
}

export default WorkoutCreate;