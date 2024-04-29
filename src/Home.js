import Navbar from "./Navbar"
import './App.css'
export default function Home() {
    return (
        <div>
            <Navbar />
            <div class="card" id="QuizCard">
            <div class="card-body">
            <div className="d-flex mt-4 ml-6">
                <div className="container">
                   
                    {/* <div className="">
                        <input type="checkbox" /> Shuffle
                    </div> */}
                    <div className="d-flex mt-3">
                        <h6>Quiz Title : </h6>
                        <input type="text" style={{ width:150 , marginLeft:10 , borderRadius:20}}/>
                    </div>
                    <div className="d-flex mt-3">
                        <h6>No.Of Questions : </h6>
                        <input type="text" style={{ width:110 , marginLeft:10, borderRadius:20}}/>
                    </div>
                    <div className="d-flex mt-3">
                        <h6>Time Limit : </h6>
                        <input type="number" style={{ width:110 , marginLeft:10 , borderRadius:20 }} />
                        <h6 style={{marginLeft:10}}>Minutes</h6>
                    </div>
                    <div className="d-flex mt-3">
                        <h6>Attempts Allowed : </h6>
                        <input type="number" style={{ width: 100 , marginLeft:10, borderRadius:20 }} />
                    </div>
                </div>
                <div className="container text-end">
                    <div className="d-flex">
                        <h6>Maximum Grade to be secured : </h6>
                        <input type="number" style={{ width: 100 , marginLeft:10 ,borderRadius:20}} />
                        {/* <button className="btn btn-primary ms-5">Save</button> */}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}