import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";


const Requests = () => {
    const request = useSelector((store) => store.request);
    const dispatch = useDispatch();
    const getRequest = async () => {
        const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
        dispatch(addRequest(res?.data?.data));
    }

    useEffect(() => {
        getRequest();

    }, [])

    if (!request || request.length === 0) return <div className="text-center font-bold">No request found</div>
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xl tracking-wide">Pending Requests</li>
                {request.map((request) => {
                    const { firstName, lastName, age, gender, about, photoUrl, _id } = request.fromUserId;
                    return (


                        <li className="list-row" key={_id}>
                            <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                            <div>
                                <div>{firstName + " " + lastName}</div>
                                <div className="text-sm ">{(age || gender) &&
                                    <p>{[age, gender].filter(Boolean).join(", ")}</p>}</div>
                            </div>
                            <p className="list-col-wrap text-xs">
                                {about}
                            </p>
                            <button className="btn btn-success">Accept</button>
                            <button className="btn btn-error">Reject</button>

                        </li>


                    )
                }
                )}
            </ul>
        </div>
    )
}

export default Requests
