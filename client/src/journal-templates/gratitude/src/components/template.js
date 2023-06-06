

export default function Template() {
    return (
        <div>
            <body>
            <section className="TOP">
                <h1> Gratitude Journal </h1>
            </section>

            <section className="box">

                <div className="boxTitle">
                    <h1> ONE THING I WANT TO REMEMBER ABOUT TODAY </h1>
                </div>

                <div className='hoe'>
                <textarea rows="4" maxLength="190"></textarea>
                </div>
                {/* <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div> */}
                
            </section>

            <br></br>

            <section className="box">

                <div className="boxTitle">
                    <h1> TODAY I FELT... </h1>
                </div>

                <div className='hoe'>
                <textarea rows="4" maxLength="190"></textarea>
                </div>

                {/* <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div> */}
                
            </section>

            <br></br>

            <section className="box">

                <div className="boxTitle">
                    <h1> TODAY I'M GRATEFUL FOR </h1>
                </div>

                <div className='hoe'>
                <textarea rows="4" maxLength="190"></textarea>
                </div>

               {/*  <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div>
                <div className="line" contentEditable="true"></div> */}
                
            </section>
            </body>
        </div>
    )
}
