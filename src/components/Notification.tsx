const Notification = () => {
  return (
    <>
      <h2 className='font-bold text-xl mt-1 ml-2'>Thông báo</h2>
      <ul className="custom-list">
        <li>
          Your call has been confirmed.
          <span className="timestamp">1 hour ago</span>
        </li>
        <li>
          You have a new message!
          <span className="timestamp">1 hour ago</span>
        </li>
        <li>
          Your subscription is expiring soon!
          <span className="timestamp">2 hours ago</span>
        </li>
      </ul>
    </>
  )
}

export default Notification;