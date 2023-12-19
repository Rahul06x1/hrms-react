
import { Col, Row, Container, Image } from '@themesberg/react-bootstrap';

export default function About() {
  return (
    <section className="section section-md bg-soft pt-lg-3" id="features">
      <Container>
        <Row className="justify-content-between align-items-center">
          <Col lg={5} className="order-lg-2 mb-5 mb-lg-0">
            <h2>About</h2>
            <p className="mb-3 lead fw-bold">
              We work with clients from a wide variety of domains from all over the world. If you'd like to hire us to help you with your product, give us a shout.
            </p>
          </Col>
          <Col lg={6} className="col-lg-6 order-lg-1">
            <Image src={'https://hamon.in/wp-content/uploads/2023/01/Layer-2.png'} alt="About image" />
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center mb-5 mb-lg-7">
          <Col lg={5}>
            <h2 className="align-items-center">Address</h2>
            <p className="mb-3 lead fw-bold">
              Calicut
            </p>
            <p className="mb-4">
              Second floor, Bhavans building,
              Opp.Calicut books,
              Near Kuthiravattom hospital,
              Kozhikode, Kerala 673016
            </p>
            <p className="mb-3 lead fw-bold">
              Trivandrum
            </p>
            <p className="mb-4">
              First Floor, CRA-6,
              Opposite Cosmopolitan Hospital,
              Cosmo Lane, Murinjapalam,
              Thiruvananthapuram-695004, Kerala
            </p>
          </Col>
          <Col lg={6}>
            <Image src={'https://hamon.in/wp-content/uploads/2023/01/Layer-2.png'} alt="Map image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
