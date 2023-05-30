import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Navbar
export const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 80%;
max-width: 1280px;
margin: 0 auto;
padding: 1.5rem 0;
position: relative;
animation: header 500ms ease-in-out;
@media(max-width: 840px){
    width: 90%;
}
.bars{
    display: none;
}
    @media (max-width: 640px) {
        .bars{
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 100;
            padding: 0.5rem;
            .bar {
                position: absolute;
                width: 100%;
                height: 2px;
                background-color: ${props => props.bar ? "transparent" : "var(--white)"};
                transition: background-color 400ms ease-in-out;
                :before, :after {
                    content: "";
                    height: 2px;
                    width: 100%;
                    background-color: var(--white);
                    position: absolute;

                }
            
                :before{
                    transform: ${props => props.bar ? "rotate(45deg)" : "translateY(10px)"};
                    transition: all 400ms ease-in-out;
                }

                :after{
                    transform: ${props => props.bar ? "rotate(-45deg)" : "translateY(-10px)"};
                    transition: all 400ms ease-in-out;
                }
            }
        }
    }
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    span {
        font-size: 2rem;
        opacity: .6;
        }
        a {
            font-size: 1.8rem;
            font-weight: 100;
            text-decoration: none;
            transition: all 400ms ease-in-out;
            opacity: .6;
            :hover {
                opacity: 1;

            }
        }`;

       export const Nav = styled.div`
        @media (max-width: 640px) {
            position: fixed;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(20px);
            background: rgba(255,255,255,0.3);
            inset: 0;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            font-weight: 700;
            height: ${props => props.bar ? "100vh" : 0};
            z-index: 100;
            overflow: hidden;
            transition: height 400ms ease-in-out;
        }
        span {
            margin-left: 1rem;
            a {
                text-decoration: none;
                font-size: 1.8rem;
                position: relative;
                font-weight: 300;
                :before {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -2px;
                    height: 2px;
                    background-color: var(--white);
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 400ms ease-in-out;
                    }
                    :hover:before {
                        transform: scaleX(1);
                        transform-origin: left;
                        }
                        :hover {
                            opacity: 0.8;
                            }
                            }
                            };`       