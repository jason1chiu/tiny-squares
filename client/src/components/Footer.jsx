import React from 'react';
import styled from 'styled-components';


const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <Row>
                    <Col>
                        <h2>About</h2>
                        <TextJustify>
                            tinysquares.com <i>subtitle </i> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </TextJustify>
                    </Col>
                </Row>
                <HR />
            </Container>
            <Container>
                <Row>
                    <Col>
                        <CopyrightText>Copyright &copy; 2023 All Rights Reserved by
                            <a href="#">TinySquares</a>.
                        </CopyrightText>
                    </Col>

                    <Col>
                        <SocialIcons>
                            <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                            <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                        </SocialIcons>
                    </Col>
                </Row>
            </Container>
        </StyledFooter>
    );
}

export default Footer;

const StyledFooter = styled.footer`
background-color: var(--babyblue);
padding: 45px 0 20px;
font-size: 15px;
line-height: 24px;
color: var(--white);
margin-top: 3rem;`;

const Container = styled.div``;

const Row = styled.div``;

const Col = styled.div`
h2 {
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 1rem;
}`;

const TextJustify = styled.p`
  text-justify: inter-word;
    text-align: center;
    padding-bottom: 1rem;
`;

const HR = styled.hr`
  border-top-color: #bbb;
  opacity: 0.5;
`;

const CopyrightText = styled.p`
  color: #fff;
  margin: 1rem;
    font-size: 1rem;
    text-align: center;
`;

const SocialIcons = styled.ul`
  display: flex;
  list-style-type: none;
`;