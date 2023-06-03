import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiDataStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

// Write your code here
export default class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    githubReposeList: [],
    apiStatus: apiDataStatus.initial,
  }

  componentDidMount = () => {
    this.getReposData()
  }

  getReposData = async () => {
    this.setState({apiStatus: apiDataStatus.inProgress})

    const {activeTabId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    const jsonDataArray = await response.json()

    if (response.ok === true) {
      const updatedDataArray = jsonDataArray.popular_repos.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        avatarUrl: eachObj.avatar_url,
        forksCount: eachObj.forks_count,
        issuesCount: eachObj.issues_count,
        starsCount: eachObj.stars_count,
      }))
      console.log(jsonDataArray)

      this.setState({
        githubReposeList: updatedDataArray,
        apiStatus: apiDataStatus.success,
      })
    } else this.setState({apiStatus: apiDataStatus.failed})
  }

  onTabClicked = id => {
    this.setState({activeTabId: id}, this.getReposData)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {githubReposeList} = this.state

    return (
      <ul className="repose-list-container">
        {githubReposeList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryObj={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailedReposView = () => <h1>Failed</h1>

  renderReposData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiDataStatus.inProgress:
        return this.renderLoader()
      case apiDataStatus.success:
        return this.renderRepos()
      // return <h1>Request Success</h1>
      case apiDataStatus.failed:
        return this.renderFailedReposView()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="container">
        <h1>Popular</h1>
        <ul className="tabs-list-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              languagesTabObject={eachLang}
              isActive={activeTabId === eachLang.id}
              onTabClicked={this.onTabClicked}
            />
          ))}
        </ul>
        {this.renderReposData()}
      </div>
    )
  }
}
