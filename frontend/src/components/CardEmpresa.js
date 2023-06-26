import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CardEmpresa({ elemento }) {
    return (
        <Card className="my-3 p-3 rounded"  style={{ height: '18rem', maxWidth: '20rem' }}>
            <Link to={`/exercise/${elemento._id}`}>
              {elemento.imagem && <Card.Img src={`http://localhost:8000${elemento.imagem}`} 
                                    style={{ paddingTop: "3%", maxHeight: '10rem', maxWidth: '16rem' }}/>}
            </Link>

            <Card.Body>
                <Link to={`/exercise/${elemento._id}`}>
                    <Card.Title as="div">
                        <strong>{elemento.categoria} </strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                    </div>
                </Card.Text>


                <Card.Text as="h4">
                    {elemento.nome}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardEmpresa
