export default function Template() {
    return (
        <div>
           <body>

            <section className="TOP">
                <h1> Appointment Log </h1>
            </section>

            <section className="box">

                <div class="date">
                    <div class='name1'> Date </div>
                    <div class='hoe'>
                        <textarea rows="1" maxLength="190"></textarea>
                    </div>
                </div>

                <div class="date">
                    <div class='name'> Doctor's Name </div>
                    <div class='hoe'>
                        <textarea rows="1" maxLength="190"></textarea>
                    </div>
                </div>

                <div class="date">
                    <div class='name2'> Weight </div>
                    <div class='hoe'>
                        <textarea rows="1" maxLength="190"></textarea>
                    </div>
                </div>

                <div class="date">
                    <div class='name'> Blood Pressure </div>
                    <div class='hoe'>
                        <textarea rows="1" maxLength="190"></textarea>
                    </div>
                </div>

                

            </section>
            
            <section className='toDo'>
                <div className='to1'>
                    <div className='to1Title'>
                        <h1> To Do </h1>
                        <div class='hoe'>
                        <textarea rows="4" maxLength="190"></textarea>
                    </div>
                    </div>
                </div>

                <div className='to2'>
                    <div className='to1Title'>
                        <h1> Not To Do </h1>
                        <div class='hoe'>
                        <textarea rows="4" maxLength="190"></textarea>
                        </div>
                    </div>
                </div>
            </section>

            <section className='imp'>
                <div className='impT'>
                    <h1> Important Notes </h1>
                </div>

                <div class='hoe'>
                    <textarea rows="10" maxLength="190"></textarea>
                </div>
            </section>
           </body>
        </div>
    )
}