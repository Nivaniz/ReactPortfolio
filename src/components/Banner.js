import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Backend", "Cloud Practitioner", "UI/UX Designer"];
  const period = 2000;

  useEffect(() => {
      let ticker = setInterval(() => {
          tick();
      }, delta);

      return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
          setDelta(prevDelta => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
          setIsDeleting(true);
          setIndex(prevIndex => prevIndex - 1);
          setDelta(period);
      } else if (isDeleting && updatedText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setIndex(1);
          setDelta(500);
      } else {
          setIndex(prevIndex => prevIndex + 1);
      }
  }

  return (
    <section className="banner" id="home">
        <Container>
            <Row className="align-items-center">
                <Col xs={12} md={6} xl={7}>
                    <span className="tagline">Bienvenido a mi portafolio</span>
                    <h1>{'Hola, mi nombre es Nirvana y soy '}<span className="wrap">{text}</span></h1>
                    <p>Soy con orgullo una apasionada ingeniera de software mexicana comprometida por crear y diseñar experiencias digitales significativas. Actualmente, soy estudiante de Ingeniería de Software en la Universidad Autónoma de Querétaro, México. Me considero una persona autodidacta y entusiasta, siempre emocionada por aprender e investigar nuevas tecnologías.</p>
                    <p>Mi objetivo es utilizar mis habilidades y conocimientos para dar vida a experiencias digitales que no solo cumplan con las expectativas de los usuarios, sino que también dejen una huella positiva en sus vidas.</p>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                <img src={headerImg} alt="Header" />
                            </div>}
                    </TrackVisibility>
                </Col>
            </Row>
        </Container>
    </section>
)
}