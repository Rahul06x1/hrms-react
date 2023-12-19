import { Col, Row, Container, Image } from '@themesberg/react-bootstrap';

import Brand from '../../assets/img/brand/brand.png'

export default function Home() {
  return (
    <section className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-link text-white vh-100" id="home">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <Image src={Brand} alt="Map image" />
            <p className="text-primary fw-light mb-5 h5">We love working with big thinkers, dreamers and doers.</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}