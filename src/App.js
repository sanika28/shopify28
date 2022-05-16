import React,{ useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "../src/new.css";
import config from '../src/config';
import {Row,Col,Form,Button} from "react-bootstrap";

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [temp, setTemp] = useState(0.0);
  const [token, setToken] = useState(1);
  const [showResults, setShowResults] = React.useState(false)
  const MAX1 = 2; 
  const MAX2 = 2040;  

const fetchData = async() => {
    const data = {
      prompt: prompt,
      temperature: parseInt(temp),
      max_tokens: parseInt(token),
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
     };

    let res = await fetch(`https://api.openai.com/v1/engines/text-curie-001/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+process.env.REACT_APP_KEY
      },
      body: JSON.stringify(data),
    })
    let responseJson = await res.json();
    let s = responseJson.choices[0];
    setResult(s);
    setShowResults(true);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    fetchData();
  }

  return (
    <div className = "mydiv">  
      <img src="newimg1.png"/> 
      <Row className="ml-5 my-5 row1">
        <Col lg="12">
          <p className="d-flex justify-content-center text-white heading1">Fun with AI</p>
          <Form className="mx-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="heading5">Prompt</Form.Label>
              <Form.Control as="textarea" rows="3" value={prompt} onChange={(event) => setPrompt(event.target.value)} type="text"/>
            </Form.Group>
            <Row>
              <Col lg="6">
                <Form.Group>
                  <Form.Label className="heading5">Temperature</Form.Label>
                  <Form.Control className="range1" type="range" min={0} max={MAX1}  onChange={(event) => setTemp(event.target.value)} step={0.1} value={temp}/>
                  <div>{temp}</div>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group>
                  <Form.Label className="heading5">Tokens</Form.Label>
                  <Form.Control	type="range" className="range1" min={1} max={MAX2}  onChange={(event) => setToken(event.target.value)} step={1} value={token}/>
                  <div className='value'>{token}</div>
                </Form.Group>
              </Col>
            </Row>
            <Button className='btn1' type="submit">Submit</Button>
          </Form>
        </Col> 
      </Row>
      { showResults ?   <Row className="row2">
      <p className="mx-5 heading2">Responses</p>
  
      <Form className="mx-5">
        <Row>
          <Col lg="2">
            <Form.Label className="heading5">Prompt</Form.Label>
          </Col>
          <Col lg="9" className="mr-5">
            <p className="heading3 mb-2">{prompt}</p>
          </Col>
        </Row>
        <Row>
          <Col lg="2">
            <Form.Label className="heading5">Response</Form.Label>
          </Col>
          <Col lg="10">
            <p className="heading3  mb-2">{result.text}</p>
          </Col>
        </Row>
      </Form>
      </Row> : null }      
   </div>
  )
  }

export default App