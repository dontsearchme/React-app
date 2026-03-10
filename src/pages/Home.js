import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="page">
            <section className="hero">
                <div className="heroLeft">
                    <div className="pillRow">
                        <span className="pill">Ages 8–16</span>
                        <span className="pill">Mon–Sat • Morning</span>
                        <span className="pill">Skill-based Batches</span>
                    </div>

                    <h1 className="h1">
                        A winter camp that is Vaibhyuv <span className="muted">best skills</span> — not chaos.
                    </h1>

                    <p className="lead">
                        Daily structured coaching, match play, weekly progress updates. If you want random running, go to a park.
                        If you want real improvement, start here.
                    </p>

                    <div className="btnRow">
                        <Link className="btn primary" to="/contact">
                            Book a class
                        </Link>
                        <Link className="btn ghost" to="/sports">
                            View Sports
                        </Link>
                    </div>

                    <div className="stats">
                        <Stat title="Coach Ratio" value="1:12" desc="Personal feedback" />
                        <Stat title="Batches" value="3 Levels" desc="Beginner–Advanced" />
                        <Stat title="Reports" value="Weekly" desc="Skill + fitness" />
                    </div>
                </div>

                <div className="heroRight">
                    <div className="glassCard">
                        <div className="cardTitle">What you get</div>
                        <ul className="list">
                            <li>Technique + decision-making drills</li>
                            <li>Fitness warm-up + mobility + cooldown</li>
                            <li>Match scenarios (not boring lectures)</li>
                            <li>Safe supervision + hydration breaks</li>
                        </ul>
                        <div className="divider" />
                        <div className="small">
                            <b>Location:</b> Bengaluru • <b>Timing:</b> 7:00–10:00 AM • <b>Season:</b> May–July
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid3">
                <InfoCard
                    title="Beginners"
                    text="Start fundamentals properly. Confidence first. No shaming, only coaching."
                />
                <InfoCard
                    title="Intermediate"
                    text="Sharper technique, speed, and game sense. Training that translates to matches."
                />
                <InfoCard title="Advanced" text="Higher intensity, tactics, and tracking. Earn your edge." />
            </section>
        </div>
    );
}

function Stat({ title, value, desc }) {
    return (
        <div className="stat">
            <div className="statValue">{value}</div>
            <div className="statTitle">{title}</div>
            <div className="statDesc">{desc}</div>
        </div>
    );
}

function InfoCard({ title, text }) {
    return (
        <div className="card">
            <div className="cardTitle">{title}</div>
            <p className="cardText">{text}</p>
        </div>
    );
}
