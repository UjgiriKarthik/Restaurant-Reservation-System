//frontend/src/components/About.jsx
import React from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const About = () => {
  return (
    <section className='about' id="about">
        <div className="container">
            <div className="banner">
                <div className="top">
                    <h1 className="heading">ABOUT US</h1>
                    <p>The only thing we're serious about is food. </p>
                </div>
                <p className='"mid'>
                    We're a team of passionate foodies who believe that good food should be accessible to everyone. <br/>
                    Our mission is to bring you the best culinary experiences, whether you're dining in or ordering out.<br/>
                    oijgd jipdfokbnb iuuhjlk iuhj iygj iygukhjn ijkuyhgk iugkjbn yuhjn iygkhj 9iuhj iugkjbn  iygukhjn 8yigh<br/>
                    uygh ighj uykhjnyuhjb uyhbn uyjhb ugyhuyhkj ugy h tgfg g fgjhbkj ughkj klhgjhuhgbmnj ugvjh jghbmn<br/>
                      ug kjkujhgkjk ujkgjhkhujhkjkujhbjn 
                      hjbkjfkdh 
                </p>
                <Link to={"/"}>
                    Explore Menu{" "}
                    <span>
                        <HiOutlineArrowNarrowRight />
                    </span>
                </Link>
            </div>
            <div className="banner">
                <img src="/about.png" alt="about" />
            </div>
        </div>
    </section>
  )
}

export default About