import { useContext, useEffect, useState } from "react"
import Styles from "./analyse.module.css"
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar"
import { usercontext } from "../appcontext"
import { useNavigate } from "react-router-dom"
function Analyse() {
    const navigate = useNavigate()
    const [score, setscore] = useState(0)
    const [atsscore, setatsscore] = useState(0)
    const [pros, setpros] = useState([])
    const [cons, setcons] = useState([])
    const [sug, setsug] = useState([])
    const [jobs, setjobs] = useState([])
    const [jobPage, setJobPage] = useState(1)
    const [roles, setRoles] = useState("")
    const { serviceURL } = useContext(usercontext)
    const [isfetched, setisfetched] = useState(false)
    useEffect(
        () => {
            document.getElementById("animate").style.display = "flex";
            fetch(`${serviceURL}/lastReport`, { credentials: "include" }).then(
                response => {
                    if (response.ok) {
                        return response.json()
                        document.getElementById("animate").style.display = "none";
                    }
                    else {
                        console.log("failed")
                        document.getElementById("animate").style.display = "none";
                    }
                }
            ).then(data => {
                if (data != null) {
                    setscore(data.score)
                    setatsscore(data.atsoptimizationscore)
                    setpros(data.pros)
                    setcons(data.cons)
                    setsug(data.suggestions)
                    setjobs(data.jobs)
                    setRoles(data.roles)
                    console.log(data.jobs)
                    setisfetched(true)
                    document.getElementById("animate").style.display = "none";
                }
            })
                .catch(error => {
                    console.log(error)
                    document.getElementById("animate").style.display = "none";
                })
        }, []
    )

    const jobsPerPage = 5;

    return (
        <div className={Styles.container}>
            <div className={Styles.nav}>
                <h1>Resume Analyser</h1>
                <button onClick={() => navigate("/uploaddoc")}>Analyse</button>
            </div>

            <div className={Styles.loadani} id="animate">

                <div className={Styles.loadanimation}>
                    <div className={Styles.capstart}></div>
                    <div className={Styles.loadblock}></div>
                </div>
                <h1>Preparing Report</h1>

            </div>

            {isfetched ? <div className={Styles.doc}>
                <div className={Styles.report}>
                    <div className={Styles.sc1}>
                        <Heat
                            progress={score}
                            range={{ from: 0, to: 100 }}
                            sign={{ value: '', position: 'end' }}
                            showValue={true}
                            revertBackground={true}
                            text={'Overall Score'}
                            sx={{
                                barWidth: 7,
                                bgColor: ' #2c2c2cb1',
                                bgStrokeColor: '#ffffff',
                                valueSize: 13,
                                textSize: 10,
                                valueFamily: 'Poppins',
                                textFamily: 'Poppins',
                                valueWeight: 'normal',
                                textWeight: 'normal',
                                textColor: '#ffffff',
                                valueColor: '#ffffff',
                                loadingTime: 1000,
                                strokeLinecap: 'round',
                                valueAnimation: true,

                            }}
                        />
                    </div>
                    <div className={Styles.sc2}>
                        <Heat
                            progress={atsscore}
                            range={{ from: 0, to: 100 }}
                            sign={{ value: '', position: 'end' }}
                            showValue={true}
                            revertBackground={true}
                            text={'ATS optimization score'}
                            sx={{
                                barWidth: 7,
                                bgColor: ' #2c2c2cb1',
                                bgStrokeColor: '#ffffff',
                                valueSize: 13,
                                textSize: 7,
                                valueFamily: 'Poppins',
                                textFamily: 'Poppins',
                                valueWeight: 'normal',
                                textWeight: 'normal',
                                textColor: '#ffffff',
                                valueColor: '#ffffff',
                                loadingTime: 1000,
                                strokeLinecap: 'round',
                                valueAnimation: true,

                            }}
                        />
                    </div>

                </div>

                <div className={Styles.resumeActions}>
                    <a className={Styles.viewResumeBtn} href={`${serviceURL}/viewResume`} target="_blank" rel="noreferrer">
                        View Scanned Resume
                    </a>
                </div>

                <div className={Styles.rev}>
                    <div className={Styles.pros}>
                        <h2>Strengths </h2>
                        <ul>
                            {pros.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className={Styles.cons}>
                        <h2>Improvements</h2>
                        <ul>
                            {cons.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    <div className={Styles.sug}>
                        <h2>Tips to enhance</h2>
                        <ul>
                            {sug.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                    {jobs.length > 0 ?
                        <div className={Styles.jobs}>
                            <h2>Suggested Jobs</h2>
                            {jobs.slice((jobPage - 1) * jobsPerPage, jobPage * jobsPerPage).map((item, index) =>
                                <div className={Styles.jobidiv} key={index}>
                                    <h3 className={Styles.jobtitle}>Role : {item.title}</h3>
                                    <h4 className={Styles.com}>Company : {item.company?.display_name?.trim() || "Not specified"}</h4>
                                    <h4 className={Styles.loc}>Location : {item.location?.display_name?.trim() || "Not specified"}</h4>
                                    <h4 className={Styles.cat}>Category : {item.category?.label?.trim() || "Not specified"}</h4>
                                    <p className={Styles.jobdes}>{item.description}</p>
                                    <a className={Styles.joblink} href={item.redirect_url} target="_blank" rel="noreferrer">Apply now</a>
                                </div>
                            )}
                            <div className={Styles.pagination}>
                                <button
                                    onClick={() => {
                                        setJobPage(Math.max(1, jobPage - 1));
                                    }}
                                    disabled={jobPage === 1}
                                    className={Styles.pageBtn}
                                >
                                    Previous
                                </button>
                                <span>Page {jobPage}</span>
                                <button
                                    onClick={() => {
                                        setJobPage(Math.min(Math.ceil(jobs.length / jobsPerPage), jobPage + 1));
                                    }}
                                    disabled={jobPage >= Math.ceil(jobs.length / jobsPerPage)}
                                    className={Styles.pageBtn}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                        : null}
                </div>

            </div> : <h1 className={Styles.errinfo}>Something went wrong , Please try again after some time !!!</h1>}

        </div>
    )
}

export default Analyse