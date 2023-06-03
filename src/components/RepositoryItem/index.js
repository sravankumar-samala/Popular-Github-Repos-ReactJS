// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryObj} = props
  const {avatarUrl, starsCount, forksCount, issuesCount, name} = repositoryObj

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} />
      <h2>{name}</h2>
      <div className="repo-details">
        <div className="repo-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
          />
          <p>{starsCount} stars</p>
        </div>
        <div className="repo-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
          />
          <p>{forksCount} forks</p>
        </div>
        <div className="repo-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
          />
          <p>{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
