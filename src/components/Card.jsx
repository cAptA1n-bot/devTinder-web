

const Card = ({user}) => {
    const {firstName, lastName, age, gender, about, photoUrl, skills} = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm content-center">
  <figure className="m-4">
    <img
      src={photoUrl}
      alt="profile picture" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + ", " + gender}</p>}
    <p>{about || "No Bio available"}</p>
    <div className="card-actions justify-between mt-4">
      <button className="btn btn-error">Ignore</button>
      <button className="btn btn-success">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Card
