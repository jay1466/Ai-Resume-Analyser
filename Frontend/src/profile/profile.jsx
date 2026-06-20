import { useContext, useEffect, useState } from "react"
import Styles from "./profile.module.css"
import { usercontext } from "../appcontext"
import { useNavigate } from "react-router-dom"

function Profile() {
    const navigate = useNavigate()
    const { serviceURL } = useContext(usercontext)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${serviceURL}/history`, { credentials: "include" })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Failed to fetch history")
            })
            .then(data => {
                setHistory(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [serviceURL])

    return (
        <div className={Styles.container}>
            <div className={Styles.nav}>
                <h1>Resume Analyser</h1>
                <div>
                    <button onClick={() => navigate("/")} className={Styles.navBtn}>Home</button>
                    <button onClick={() => navigate("/uploaddoc")} className={Styles.navBtn}>Analyse New</button>
                </div>
            </div>

            <div className={Styles.content}>
                <h2>Your Resume History</h2>
                <p className={Styles.subtitle}>View your previously scanned resumes and their analysis reports.</p>

                {loading ? (
                    <div className={Styles.loading}>Loading history...</div>
                ) : history.length > 0 ? (
                    <div className={Styles.grid}>
                        {history.map((item) => (
                            <div className={Styles.card} key={item.id}>
                                <div className={Styles.cardHeader}>
                                    <h3>Target Roles: {item.roles}</h3>
                                    <span className={Styles.date}>
                                        {new Date(item.scannedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                
                                <div className={Styles.scores}>
                                    <div className={Styles.scoreItem}>
                                        <span className={Styles.scoreLabel}>Overall Score</span>
                                        <span className={Styles.scoreValue}>{item.score}/100</span>
                                    </div>
                                    <div className={Styles.scoreItem}>
                                        <span className={Styles.scoreLabel}>ATS Score</span>
                                        <span className={Styles.scoreValue}>{item.atsoptimizationscore}/100</span>
                                    </div>
                                </div>

                                <div className={Styles.actions}>
                                    <a className={Styles.btn} href={`${serviceURL}/viewResume?id=${item.id}`} target="_blank" rel="noreferrer">
                                        View Resume File
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={Styles.empty}>
                        <p>No resume history found. Start by analysing a new resume!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
