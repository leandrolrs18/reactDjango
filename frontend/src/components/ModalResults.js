import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { resetVideo } from '../actions/videoActions';
import { resetExerciseDone } from '../actions/exerciseDoneActions'
import { resetExercise, resetNewExercise } from '../actions/exerciseActions'

function ModalResults({show, onHide, results, restTime, exercise, final, serie}) {

    const [segPassados, setSegPassados] = useState(restTime);
    const [stop, setStop] = useState(false);
    let history = useHistory();

    const dispatch = useDispatch()

    useEffect(() => {

        if (stop == true) {
            if (segPassados > 0) {
                setTimeout(() => setSegPassados(segPassados - 1), 1000);    
            } 
            else{
              serie == exercise.series ? stopVideo(null, "menu"): stopVideo(null, "again")
            }
        }
    }, [segPassados]);

    if(stop == false) {
        setSegPassados(restTime)
        setStop(true)
    }

  const stopVideo = (e, type) => {
    
      if (e) {
          e.preventDefault()
      }

      dispatch(resetVideo())
      dispatch(resetExerciseDone())
      dispatch(resetExercise())
      dispatch(resetNewExercise())
      onHide()

      type == "again" ? history.push(`/exercise/${exercise._id}`) : history.push(`/home`)
  }


  return (
    <Modal
      {...{show, onHide}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Resultados 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br/>
        <h6> <strong>Série:</strong> {serie}/{exercise.series}   |   <strong>Repetições:</strong> {results.repetition}/{exercise.repetitions} </h6>
        <br/>
        <h4>Você precisa melhorar em: </h4>
        {results.alertMessagens ? results.alertMessagens.map(item => {
                return item == "ok" ?
                <></>
                :
                <h6>
                {item}
                </h6>
            })
            :
            <></>
        }
      </Modal.Body>
      <Modal.Footer>
        <h6>...Em {segPassados} segundos você será direcionado para página do próximo exercício</h6>
        <br/>
        <br/>
        {serie == exercise.series ? 
            <LinkContainer to='/home'>
            <Button onClick={(e) => stopVideo(e, "menu")} style={{ backgroundColor: "#20295F"}}>Ir para o inicio </Button>
            </LinkContainer>
        :
            <LinkContainer to={`/record/exercise`}>
            <Button onClick={(e) => stopVideo(e, "again")} style={{ backgroundColor: "#20295F"}}>Ir para a próxima série </Button>
            </LinkContainer>
        }
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResults