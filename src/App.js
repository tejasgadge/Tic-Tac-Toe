import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Icon from "./components/icons";
import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// notiflix
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import { useState } from "react";

const itemArray = new Array(9).fill("empty");

function App() {
  const [isstart, setstart] = useState(false);
  const [iscross, setcross] = useState(false);
  const [winmsg, setWinMsg] = useState("");

  const reloadgame = () => {
    setcross(false);
    setWinMsg("");
    itemArray.fill("empty");
  };

  const changeitem = (itemnumber) => {
    if (winmsg) {
      // return toast(winmsg, { type: "success" });
    }
    if (itemArray[itemnumber] === "empty") {
      itemArray[itemnumber] = iscross ? "cross" : "circle";
      setcross(!iscross);
    } else {
      return toast("already filled", { type: "error" });
    }
    checkiswinner();
  };

  const checkiswinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMsg(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMsg(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[2]} won`);
    }
  };

  return !isstart ? (
    <>
      <Container className="p-4 ">
        <ToastContainer position="bottom-center" />
        <Row>
          <Col md={3} className="offset-md-4">
            <Button block onClick={()=>{reloadgame();setstart(true)}} className="mb-3">
              Start
            </Button>
            <div className="grid">
              {itemArray.map((item, index) => (
                <Card color="sucess">
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <Container className="p-4">
        <ToastContainer position="bottom-center" />
        <Row>
          <Col md={3} className="offset-md-4">
          {winmsg ? (
              <div className="mb-2 mt-2">
                <h1 className=" text-uppercase text-center">{winmsg}</h1>
                <Button block onClick={reloadgame}>
                  Restart
                </Button>
              </div>
            ) : 
            <>
                <h1  className="text-center color_">
                  {iscross ? "Cross" : "Circle"} Turns
                </h1>
              
              <div className="grid">
                {itemArray.map((item, index) => (
                  <Card color="sucess" onClick={() => changeitem(index)}>
                    <CardBody className="box">
                      <Icon name={item} />
                    </CardBody>
                  </Card>
                ))}
              </div>
            </>
          }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
