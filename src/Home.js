import Navbar from "./Navbar"
export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="d-flex mt-4">
                <div className="container">
                    <div>
                        <p>Questions: 20 | This quiz is open</p>
                    </div>
                    {/* <div className="">
                        <input type="checkbox" /> Shuffle
                    </div> */}
                    <div className="d-flex mt-3">
                        <h6>Quiz Title : </h6>
                        <input type="text" style={{ width:100 , marginLeft:10}}/>
                    </div>
                    <div className="d-flex mt-3">
                        <h6>Time Limit: </h6>
                        <input type="number" style={{ width: 50 }} />
                    </div>
                    <div className="d-flex mt-3">
                        <h6>Attempts Allowed: </h6>
                        <input type="number" style={{ width: 50 }} />
                    </div>
                </div>
                <div className="container text-end">
                    <div className="d-flex">
                        <h6>Maximum Grade: </h6>
                        <input type="number" style={{ width: 50 }} />
                        <button className="btn btn-primary ms-5">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}